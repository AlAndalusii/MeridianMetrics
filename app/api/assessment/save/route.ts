import { NextResponse } from 'next/server';
import { saveAssessmentProgress } from '@/lib/db';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

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
      // Silently handle DB failures - quiz uses localStorage as primary storage
      // Return success to avoid blocking the frontend
      return NextResponse.json({
        success: true,
        message: 'Assessment saved (localStorage)',
        note: 'Database backup unavailable'
      });
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

