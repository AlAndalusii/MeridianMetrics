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
    // Q1 - Tonnage threshold
    'under_10t': 8,
    '10_50t': 6,
    '50_100t': 5,
    'over_100t': 4,
    'unknown_tonnage': 0,
    // Q2 - Recycled content
    'above_30_all': 10,
    'above_30_most': 7,
    'below_30_most': 3,
    'zero_recycled': 0,
    'unknown_content': 0,
    // Q3 - Content type
    'post_consumer': 10,
    'mixed_recycled': 7,
    'pre_consumer': 5,
    'biomass': 4,
    'unsure_source': 0,
    // Q4 - Import registration
    'fully_registered': 10,
    'registered_unsure': 5,
    'no_imports': 8,
    'import_not_registered': 0,
    'unsure_registration': 1,
    // Q5 - Deadline awareness
    'knows_full_history': 10,
    'knows_start_unsure_rates': 6,
    'wrong_date': 2,
    'unaware': 0,
    // Q6 - Mass balance
    'full_certified': 10,
    'supplier_certs_only': 5,
    'mechanical_only': 7,
    'no_certs': 0,
    'no_chemical': 8,
    // Q7 - Supplier verification
    'full_verification': 10,
    'certs_no_audit': 6,
    'declarations_only': 3,
    'no_verification': 0,
    // Q8 - Record keeping
    'full_records': 10,
    'partial_records': 5,
    'disorganised_records': 3,
    'minimal_records': 2,
    'no_records': 0,
    // Q9 - Exemption claims
    'export_with_evidence': 10,
    'transport_exemption': 8,
    'exemptions_no_evidence': 1,
    'no_exemptions': 7,
    'unsure_exemptions': 2,
    // Q10 - Fraud prevention
    'full_due_diligence': 10,
    'cert_checks_only': 5,
    'supplier_assurance_only': 2,
    'no_measures': 0,
  };

  let totalScore = 0;
  const maxPossible = answers.length * 10;
  const gaps: string[] = [];
  const strengths: string[] = [];

  answers.forEach(a => {
    const score = scoreMap[a.answer] ?? 3;
    totalScore += score;
    if (score <= 2) {
      gaps.push(a.section);
    } else if (score >= 8) {
      strengths.push(a.section);
    }
  });

  const normalized = maxPossible > 0 ? Math.round((totalScore / maxPossible) * 100) : 0;
  const clamped = Math.min(100, Math.max(0, normalized));

  const topGaps = [
    {
      title: 'Recycled Content Verification',
      description: 'You may lack sufficient evidence to support your recycled content percentage claims to HMRC.',
      risk: 'Back-dated PPT liability + 100% penalties'
    },
    {
      title: 'Supplier Due Diligence',
      description: 'Without independent verification of supplier claims, fraudulent certificates could expose you to full tax liability.',
      risk: 'Criminal investigation + unlimited fines'
    },
    {
      title: 'PPT Record Keeping',
      description: 'HMRC requires 6 years of records including weight data, recycled content evidence, and return history.',
      risk: 'Penalties independent of tax owed'
    },
  ];

  return {
    score: clamped,
    topGaps: topGaps.slice(0, 3),
    strengths: strengths.slice(0, 3),
    recommendedSteps: [
      'Register for PPT with HMRC if you manufacture or import 10+ tonnes of plastic packaging annually',
      'Obtain and verify mass balance or recycled content certificates from all suppliers',
      'Implement a formal record-keeping system for all PPT-related documentation',
    ],
    urgencyLevel: clamped <= 49 ? 'High' : clamped <= 79 ? 'Medium' : 'Low',
    aiAnalysis: 'Based on your responses, we have identified key PPT compliance gaps. Our specialist team can help you address these before an HMRC enquiry or audit.',
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

    const prompt = `You are a UK Plastic Packaging Tax (PPT) compliance expert. Analyze these assessment responses and provide a compliance score on a 0-100 scale.

CONTEXT: UK Plastic Packaging Tax (PPT) applies at £217.85/tonne (2024/25) to plastic packaging manufactured or imported into the UK that contains less than 30% recycled plastic by weight. Businesses manufacturing or importing 10+ tonnes per year must register with HMRC. Key areas: tonnage thresholds, recycled content percentage, mass balance certification, supplier verification, record keeping, exemption claims, and fraud prevention.

SCORE BANDS:
- 0–49: High Risk (significant PPT exposure, likely unregistered or under-declared)
- 50–79: Compliance Gaps (registered but key areas need attention)
- 80–100: Compliant (minor improvements only)

ASSESSMENT RESPONSES:
${answersText}

Respond ONLY with a valid JSON object (no markdown, no code blocks, just JSON):
{
  "score": <number 0-100>,
  "topGaps": [
    {"title": "<gap title>", "description": "<specific PPT gap description>", "risk": "<HMRC penalty/consequence>"},
    {"title": "<gap title>", "description": "<specific PPT gap description>", "risk": "<HMRC penalty/consequence>"},
    {"title": "<gap title>", "description": "<specific PPT gap description>", "risk": "<HMRC penalty/consequence>"}
  ],
  "strengths": ["<strength 1>", "<strength 2>"],
  "recommendedSteps": ["<step 1>", "<step 2>", "<step 3>"],
  "urgencyLevel": "<High|Medium|Low>",
  "aiAnalysis": "<2-3 sentence personalised PPT compliance analysis>"
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
    console.error('Error in PPT gap analyzer scoring:', error);
    return NextResponse.json({ success: true, ...getLocalScore([]), source: 'error-fallback' });
  }
}
