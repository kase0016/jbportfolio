import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_QUOTES_API_URL!;
  // const apiKey = process.env.QUOTE_API_KEY!;

  const quoteUrl = new URL(baseUrl);

  const res = await fetch(quoteUrl.toString(), {
    // headers: { "X-Api-Key": apiKey },
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Upstream error", status: res.status },
      { status: res.status }
    );
  }

  const data = await res.json();

  return NextResponse.json(data);
}
