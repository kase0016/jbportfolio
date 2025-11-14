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

export type FavQsQuoteResponse = {
  qotd_date: string;
  quote: FavQsQuote;
};

export type FavQsQuote = {
  id: number;
  dialogue: boolean;
  private: boolean;
  tags: string[];
  url: string;
  favorites_count: number;
  upvotes_count: number;
  downvotes_count: number;
  author: string;
  author_permalink: string;
  body: string;
};
