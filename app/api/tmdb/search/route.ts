import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      return NextResponse.json({ error: axiosError.message }, { status: 500 });
    } else if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}}