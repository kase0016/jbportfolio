import { NextResponse } from "next/server";

export default async function GET() {
  const baseUrl = process.env.QUOTES_API_URL!;
  const quoteUrl = new URL(baseUrl);

  const res = await fetch(quoteUrl);

  const data = await res.json();

  return NextResponse.json(data);
}
