import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WeatherRes } from "./types";

type weatherState = {
  data: WeatherRes | null;
};
const initialState: weatherState = { data: null };

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeather: (state, action: PayloadAction<WeatherRes>) => {
      state.data = action.payload;
    },
    clearWeather: (state) => {
      state.data = null;
    },
  },
});

export const { setWeather, clearWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
