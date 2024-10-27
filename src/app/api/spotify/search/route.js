import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const year = searchParams.get('year')

  if (!year) {
    return NextResponse.json({ error: 'Year parameter is required' }, { status: 400 })
  }

  const spotifyUrl = `https://api.spotify.com/v1/search?q=year:${year}&type=track&limit=1`

  try {
    const response = await fetch(spotifyUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Spotify API error:', errorData)
      throw new Error(`Failed to fetch from Spotify API: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching from Spotify API:', error)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
