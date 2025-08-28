import type { APIWeatherRes, WeatherRes } from "./types";

export function weatherResConversion(apiRes: APIWeatherRes): WeatherRes {
  console.log(apiRes);
  return {
    city: apiRes.location.name,
    country: apiRes.location.country,
    lat: apiRes.location.lat,
    lon: apiRes.location.lon,
    condition: apiRes.current.condition.text,
    tempC: apiRes.current.temp_c,
    feelTempC: apiRes.current.feelslike_c,
    icon: apiRes.current.condition.icon,
  };
}
