import { NextResponse } from 'next/server';
import { saveAssessmentProgress } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sessionId, name, email, company, phone, answers, currentQuestion, isComplete, score } = body;

    // Validate required fields
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    if (!answers || typeof answers !== 'object') {
      return NextResponse.json(
        { error: 'Answers must be provided as an object' },
        { status: 400 }
      );
    }

    // Save to database
    const result = await saveAssessmentProgress(sessionId, {
      name,
      email,
      company,
      phone,
      answers,
      currentQuestion: currentQuestion || 0,
      isComplete: isComplete || false,
      score: score || null,
    });

    if (!result.success) {
      console.error('Database save failed:', result.error);
      return NextResponse.json(
        { error: 'Failed to save assessment progress' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Assessment progress saved',
      data: result.data,
    });
  } catch (error) {
    console.error('Error in save assessment API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

