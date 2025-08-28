export type APIWeatherRes = {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    feelslike_c: number;
  };
};

export type WeatherRes = {
  city: string;
  country: string;
  lat: number;
  lon: number;
  condition: string;
  tempC: number;
  feelTempC: number;
  icon: string;
};

export type QuoteOD = {
  quote: string;
  author: string;
  category: string;
};
