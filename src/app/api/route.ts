import { NextResponse } from 'next/server';

export async function POST(_request: Request) {
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
    const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
  
    const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
  
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${basic}`,
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refresh_token
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return NextResponse.json({ error: data.error }), { status: response.status };
      }
  
      return NextResponse.json(data), { status: 200 };
    } catch (error) {
      console.error('Failed to refresh token:', error);
      return NextResponse.json({ error: 'Failed to refresh token' }), { status: 500 };
    }
  }