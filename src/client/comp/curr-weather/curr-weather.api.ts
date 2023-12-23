//package imports
//package types imports
//porject imports
import { $api, noToastErrTransform } from "@client/store/api";
//project types imports
import type {
  TGetCurrWeatherReq,
  TGetCurrWeatherRes,
} from ".";

export const $currWeatherApi = $api.injectEndpoints({
  endpoints: (build) => ({
    //gets current weather data
    getCurrWeather: build.mutation<TGetCurrWeatherRes, TGetCurrWeatherReq>({
      query(data) {
        return {
          url: `current?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&lat=${data.lat}&lon=${data.lon}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetCurrWeatherMutation,
} = $currWeatherApi;
