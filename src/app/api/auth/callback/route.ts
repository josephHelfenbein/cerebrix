import { createServer } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createServer();
    await (await supabase).auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(requestUrl.origin);
}