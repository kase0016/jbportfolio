import { error } from "console";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("q");

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const weatherUrl = new URL("current.json", baseUrl);

  weatherUrl.searchParams.set("key", process.env.WEATHER_API_KEY!);
  weatherUrl.searchParams.set("q", city!);

  const res = await fetch(weatherUrl);

  if (!res.ok) {
    return NextResponse.json(
      { error: "response error" },
      { status: res.status }
    );
  }
  const data = await res.json();

  return NextResponse.json(data);
}
