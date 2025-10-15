import { NextResponse } from 'next/server';
import { getAllSubmissions, getSubmissionStats } from '@/lib/db';

// Get all submissions (with optional filtering)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const isCompleteParam = searchParams.get('isComplete');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    const filters = {
      isComplete: isCompleteParam === 'true' ? true : isCompleteParam === 'false' ? false : undefined,
      limit,
      offset,
    };

    const result = await getAllSubmissions(filters);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to get submissions' },
        { status: 500 }
      );
    }

    // Also get statistics
    const statsResult = await getSubmissionStats();

    return NextResponse.json({
      success: true,
      submissions: result.data,
      stats: statsResult.success ? statsResult.data : null,
    });
  } catch (error) {
    console.error('Error getting submissions:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

