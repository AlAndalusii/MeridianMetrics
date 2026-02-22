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

function getLocalScore(answers: AnswerData[]): ScoreResult {
  const scoreMap: Record<string, number> = {
    // Q1 - Business size
    'under_10_2027': 3,
    '10_50': 6,
    '50_plus': 7,
    'not_sure_size': 1,
    // Q2 - Waste volume
    'minimal': 5,
    'moderate': 6,
    'large': 7,
    'very_large': 8,
    'unknown_volume': 1,
    // Q3 - Separation bins
    'one_bin': 0,
    'two_bins': 3,
    'three_bins': 7,
    'four_plus': 10,
    'not_sure_bins': 1,
    // Q4 - Food waste
    'dedicated_food': 10,
    'no_food_waste': 10,
    'general_waste': 0,
    'partial_food': 4,
    // Q5 - Dry recyclables
    'all_separated': 10,
    'some_separated': 5,
    'none_separated': 0,
    'unsure_dry': 2,
    // Q6 - Staff training
    'full_training': 10,
    'some_training': 5,
    'no_training': 0,
    'signage_only': 4,
    // Q7 - Waste transfer docs
    'full_docs': 10,
    'some_docs': 5,
    'no_docs': 0,
    'unsure_docs': 2,
    // Q8 - Collection frequency
    'correct_frequency': 10,
    'infrequent': 4,
    'no_schedule': 0,
    'unsure_frequency': 2,
    // Q9 - Deadline awareness
    'knows_march_2025': 10,
    'knows_2027': 6,
    'wrong_date': 2,
    'no_idea': 0,
    // Q10 - Contamination
    'strong_prevention': 10,
    'some_measures': 5,
    'no_measures': 0,
    'unsure_contamination': 2,
  };

  let totalScore = 0;
  let maxPossible = answers.length * 10;
  const gaps: string[] = [];
  const strengths: string[] = [];

  answers.forEach(a => {
    const score = scoreMap[a.answer] ?? 3;
    totalScore += score;
    if (score <= 3) {
      gaps.push(a.section);
    } else if (score >= 8) {
      strengths.push(a.section);
    }
  });

  const normalized = maxPossible > 0 ? Math.round((totalScore / maxPossible) * 10) : 0;

  const topGaps = [
    { title: 'Waste Separation Setup', description: 'You may not have the required separate bins for dry recyclables, food waste, and general waste.', risk: 'Regulatory fine up to £300/day' },
    { title: 'Staff Training & Signage', description: 'Without proper training, staff contamination rates can cause collection rejection.', risk: 'Collection refusal + additional costs' },
    { title: 'Waste Transfer Documentation', description: 'Missing documentation means you cannot prove compliance to the Environment Agency.', risk: 'Enforcement notice + penalty' },
  ];

  return {
    score: Math.min(10, Math.max(0, normalized)),
    topGaps: topGaps.slice(0, 3),
    strengths: strengths.slice(0, 3),
    recommendedSteps: [
      'Implement a 4-stream waste separation system immediately',
      'Book a compliance audit to document your current setup',
      'Obtain Waste Transfer Notes from your contractor',
    ],
    urgencyLevel: normalized <= 3 ? 'High' : normalized <= 6 ? 'Medium' : 'Low',
    aiAnalysis: 'Based on your responses, we have identified key compliance gaps. Our expert team can help you address these before an Environment Agency inspection.',
  };
}

interface ScoreResult {
  score: number;
  topGaps: Array<{ title: string; description: string; risk: string }>;
  strengths: string[];
  recommendedSteps: string[];
  urgencyLevel: 'High' | 'Medium' | 'Low';
  aiAnalysis: string;
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

    const prompt = `You are a Simpler Recycling compliance expert for UK businesses. Analyze these assessment responses and provide a compliance score.

CONTEXT: Simpler Recycling regulations require UK businesses with 10+ employees to separate waste streams (dry recyclables, food waste, general waste) from 31 March 2025. Micro-firms (<10 employees) have until March 2027.

ASSESSMENT RESPONSES:
${answersText}

SCORING CRITERIA:
- 0-3: Critical non-compliance (multiple major violations)
- 4-6: Partial compliance with significant gaps  
- 7-10: Good compliance with minor improvements needed

Respond ONLY with a valid JSON object in this exact format (no markdown, no code blocks, just JSON):
{
  "score": <number 0-10>,
  "topGaps": [
    {"title": "<gap title>", "description": "<specific gap description>", "risk": "<penalty/consequence>"},
    {"title": "<gap title>", "description": "<specific gap description>", "risk": "<penalty/consequence>"},
    {"title": "<gap title>", "description": "<specific gap description>", "risk": "<penalty/consequence>"}
  ],
  "strengths": ["<strength 1>", "<strength 2>"],
  "recommendedSteps": ["<step 1>", "<step 2>", "<step 3>"],
  "urgencyLevel": "<High|Medium|Low>",
  "aiAnalysis": "<2-3 sentence personalised analysis of their compliance position>"
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

      parsed.score = Math.min(10, Math.max(0, Number(parsed.score) || 0));
      return NextResponse.json({ success: true, ...parsed, source: 'gemini' });
    } catch (geminiError) {
      console.warn('Gemini API error, falling back to local scoring:', geminiError instanceof Error ? geminiError.message : geminiError);
      const localResult = getLocalScore(answers);
      return NextResponse.json({ success: true, ...localResult, source: 'local-fallback' });
    }
  } catch (error) {
    console.error('Error in gap analyzer scoring:', error);
    // Always return a result, never a hard failure
    return NextResponse.json({ success: true, ...getLocalScore([]), source: 'error-fallback' });
  }
}
