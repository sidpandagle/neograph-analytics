import { generateLLMTxt } from '@/lib/api/llmtxt';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const content = await generateLLMTxt();

    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating llms.txt:', error);
    return new NextResponse('Error generating llms.txt', { status: 500 });
  }
}
