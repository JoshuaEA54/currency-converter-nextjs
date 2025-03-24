import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.CURRENCY_API_KEY;

  const res = await fetch(`https://api.currencyapi.com/v3/latest?apikey=${apiKey}&base_currency=USD`);
  const data = await res.json();

  return NextResponse.json(data);
}
