import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchDataFromTMDB = async (url: string) => {
  if (!API_KEY) {
    throw new Error('TMDB API key is missing');
  }
  try {
    const response = await axios.get(url, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching from TMDB:', error);
    throw error;
  }
};

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const id = searchParams.get('id');
  const type = searchParams.get('type');

  if (!API_KEY) {
    return NextResponse.json({ error: 'TMDB API key is missing' }, { status: 500 });
  }
  if (!id || !type) {
    return NextResponse.json({ error: 'ID and Type are required' }, { status: 400 });
  }

  try {
    const detailsEndpoint = type === 'Movie' ? 'movie' : 'tv';
    const detailsResponse = await fetchDataFromTMDB(
      `${BASE_URL}/${detailsEndpoint}/${id}?append_to_response=credits`
    );

    const recommendationsResponse = await fetchDataFromTMDB(
      `${BASE_URL}/${detailsEndpoint}/${id}/recommendations`
    );
    const similarResponse = await fetchDataFromTMDB(
      `${BASE_URL}/${detailsEndpoint}/${id}/similar`
    );

    return NextResponse.json({
      details: detailsResponse,
      recommendations: recommendationsResponse.results,
      similar: similarResponse.results,
    }, { status: 200 });
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
