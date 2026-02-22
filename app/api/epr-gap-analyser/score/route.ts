import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface AnswerData {
  questionId: number;
  question: string;
  answer: string;
  section: string;
}

interface ScoreResult {
  score: number;
  topGaps: Array<{ title: string; description: string; risk: string }>;
  strengths: string[];
  recommendedSteps: string[];
  urgencyLevel: 'High' | 'Medium' | 'Low';
  aiAnalysis: string;
}

function getLocalScore(answers: AnswerData[]): ScoreResult {
  const scoreMap: Record<string, number> = {
    // Q1 - Business role
    'manufacturer': 7,
    'importer': 7,
    'brand_owner': 7,
    'marketplace': 6,
    'no_packaging': 10,
    // Q2 - Annual tonnage
    'under_25t': 8,
    '25_50t': 6,
    '50_200t': 5,
    'over_200t': 4,
    'unknown_tonnage': 0,
    // Q3 - Registration status
    'fully_registered': 10,
    'registered_unsure': 5,
    'not_registered_yet': 2,
    'not_registered_believe': 3,
    'unsure_registration': 1,
    // Q4 - Compliance scheme
    'scheme_full': 10,
    'scheme_unsure': 5,
    'self_compliance': 7,
    'no_scheme': 1,
    // Q5 - HH/non-HH split
    'accurate_split': 10,
    'partial_split': 5,
    'all_household': 2,
    'unaware_split': 0,
    // Q6 - Fee understanding
    'full_understanding': 10,
    'partial_understanding': 5,
    'just_pay': 2,
    'never_reviewed': 0,
    // Q7 - Data reporting
    'structured_system': 10,
    'adhoc_annual': 5,
    'estimates_only': 2,
    'scheme_unverified': 3,
    'no_data': 0,
    // Q8 - Deadline awareness
    'knows_jan_2025_full': 10,
    'knows_jan_2025_partial': 6,
    'wrong_date_early': 2,
    'unaware_launched': 0,
    // Q9 - Record keeping
    'full_records': 10,
    'partial_records': 5,
    'invoices_only': 2,
    'no_records': 0,
    // Q10 - Fee review
    'reviewed_clean': 10,
    'reviewed_fixed': 9,
    'never_reviewed_scheme': 2,
    'never_unaware': 1,
  };

  let totalScore = 0;
  const maxPossible = answers.length * 10;
  const gaps: string[] = [];
  const strengths: string[] = [];

  answers.forEach(a => {
    const score = scoreMap[a.answer] ?? 3;
    totalScore += score;
    if (score <= 2) gaps.push(a.section);
    else if (score >= 8) strengths.push(a.section);
  });

  const normalized = maxPossible > 0 ? Math.round((totalScore / maxPossible) * 100) : 0;
  const clamped = Math.min(100, Math.max(0, normalized));

  return {
    score: clamped,
    topGaps: [
      {
        title: 'Household/Non-Household Classification',
        description: 'Incorrect classification of packaging as household vs non-household is the leading cause of EPR overpayment, typically costing businesses £5,000–£15,000+ annually.',
        risk: 'Overpayment of £5K–£15K+ per year',
      },
      {
        title: 'EPR Registration & Scheme Membership',
        description: 'Operating without EPR registration when above the 25-tonne threshold is a criminal offence with unlimited fines.',
        risk: 'Unlimited fines + criminal prosecution',
      },
      {
        title: 'Packaging Data Accuracy',
        description: 'Estimated or unverified packaging data leads to incorrect fee submissions and exposure to regulator scrutiny.',
        risk: 'Enforcement action + back-dated fees',
      },
    ],
    strengths: strengths.slice(0, 3),
    recommendedSteps: [
      'Confirm your EPR registration status and ensure all data is current with the Environment Agency',
      'Conduct a household/non-household packaging split review — most businesses overpay due to this alone',
      'Implement a structured packaging data tracking system to support accurate quarterly submissions',
    ],
    urgencyLevel: clamped <= 49 ? 'High' : clamped <= 79 ? 'Medium' : 'Low',
    aiAnalysis: 'Based on your responses, we have identified key EPR compliance gaps. Our specialist team can help you address these — and may identify significant fee overpayments you can recover.',
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { answers }: { answers: AnswerData[] } = body;

    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json({ error: 'Invalid answers data' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      const localResult = getLocalScore(answers);
      return NextResponse.json({ success: true, ...localResult, source: 'local' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const answersText = answers
      .map(a => `${a.section}: Q: "${a.question}" A: "${a.answer}"`)
      .join('\n');

    const prompt = `You are a UK Extended Producer Responsibility (EPR) packaging compliance expert. Analyse these assessment responses and provide a compliance score on a 0-100 scale.

CONTEXT: UK EPR for packaging requires businesses that handle 25+ tonnes of packaging annually (with £1M+ turnover) to register with the environmental regulator, submit packaging data, and pay modulated fees based on material type and household/non-household classification. The reformed scheme launched in January 2025. Key risks: non-registration, incorrect household/non-household split (leading to overpayment), poor data quality, and missing record-keeping requirements.

SCORE BANDS:
- 0–49: High Risk (non-registered, unaware of obligations, or significant fee exposure)
- 50–79: Compliance Gaps (registered but key areas need attention, possible overpayment)
- 80–100: Compliant (registered, data accurate, fees reviewed)

ASSESSMENT RESPONSES:
${answersText}

Respond ONLY with a valid JSON object (no markdown, no code blocks, just JSON):
{
  "score": <number 0-100>,
  "topGaps": [
    {"title": "<gap title>", "description": "<specific EPR gap description>", "risk": "<regulator penalty/fee consequence>"},
    {"title": "<gap title>", "description": "<specific EPR gap description>", "risk": "<regulator penalty/fee consequence>"},
    {"title": "<gap title>", "description": "<specific EPR gap description>", "risk": "<regulator penalty/fee consequence>"}
  ],
  "strengths": ["<strength 1>", "<strength 2>"],
  "recommendedSteps": ["<step 1>", "<step 2>", "<step 3>"],
  "urgencyLevel": "<High|Medium|Low>",
  "aiAnalysis": "<2-3 sentence personalised EPR compliance analysis>"
}`;

    try {
      const result = await model.generateContent(prompt);
      const responseText = result.response.text().trim();

      let parsed: ScoreResult;
      try {
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : getLocalScore(answers);
      } catch {
        parsed = getLocalScore(answers);
      }

      parsed.score = Math.min(100, Math.max(0, Number(parsed.score) || 0));
      return NextResponse.json({ success: true, ...parsed, source: 'gemini' });
    } catch (geminiError) {
      console.warn('Gemini API error, falling back to local scoring:', geminiError instanceof Error ? geminiError.message : geminiError);
      const localResult = getLocalScore(answers);
      return NextResponse.json({ success: true, ...localResult, source: 'local-fallback' });
    }
  } catch (error) {
    console.error('Error in EPR gap analyser scoring:', error);
    return NextResponse.json({ success: true, ...getLocalScore([]), source: 'error-fallback' });
  }
}
