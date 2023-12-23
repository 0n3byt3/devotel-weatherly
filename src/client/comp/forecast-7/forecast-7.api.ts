//package imports
//package types imports
//porject imports
import { $api, noToastErrTransform } from "@client/store/api";
//project types imports
import type {
  TGetForecast7Req,
  TGetForecast7Res,
} from ".";

export const $forecast7Api = $api.injectEndpoints({
  endpoints: (build) => ({
    //gets 7 day forecast data
    getForecast7: build.mutation<TGetForecast7Res, TGetForecast7Req>({
      query(data) {
        return {
          url: `forecast/daily?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&days=7&lat=${data.lat}&lon=${data.lon}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetForecast7Mutation,
} = $forecast7Api;
