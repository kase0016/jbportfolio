import { weatherResConversion } from "../features/weather/mapper";
import { QuoteOD, WeatherRes } from "../features/weather/types";

// Get weather with default location

export const getWeatherNoLocation = async (): Promise<WeatherRes> => {
  // Fetch Weather Using Ottawa
  const city = "Ottawa";
  const res = await fetch(`/api/weather?q=${encodeURIComponent(city)}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`/api/weather failed: ${res.status}`);
  const data = await res.json();
  return weatherResConversion(data);
};

// Getting Location Using Lat & Lon
export const getWeatherWithLocation = async (
  lat: number,
  lon: number
): Promise<WeatherRes> => {
  const location = `${lat},${lon}`;
  const res = await fetch(`/api/weather?q=${encodeURIComponent(location)}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`/api/weather failed: ${res.status}`);
  const data = await res.json();
  return weatherResConversion(data);
};

export const getQuoteOD = async (): Promise<QuoteOD> => {
  const res = await fetch(`/api/quoteofday`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`/api/quoteofday failed: ${res.status} – ${body}`);
  }
  const data = await res.json();
  return data;
};
