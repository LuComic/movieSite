import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_KEY = "be510a38a2a3e31f1a0cef3e845479ac"; 
const BASE_URL = 'https://api.themoviedb.org/3';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const query = searchParams.get('query');
  const type = searchParams.get('type');

  if (!API_KEY) {
    return NextResponse.json({ error: 'TMDB API key is missing' }, { status: 500 });
  }
  if (!query || !type) {
    return NextResponse.json({ error: 'Query and Type are required' }, { status: 400 });
  }

  try {
    const searchEndpoint = type === 'Movie' ? 'movie' : 'tv';
    const searchResponse = await axios.get(`${BASE_URL}/search/${searchEndpoint}`, {
      params: {
        api_key: API_KEY,
        query: query,
        include_adult: false,
        sort_by: 'popularity.desc',
        page: 1,
      },
    });
    return NextResponse.json(searchResponse.data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}