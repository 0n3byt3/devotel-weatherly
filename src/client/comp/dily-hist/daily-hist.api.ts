//package imports
//package types imports
//porject imports
import { $api, noToastErrTransform } from "@client/store/api";
//project types imports
import type {
  TGetDailyHistReq,
  TGetDailyHistRes,
} from ".";

export const $dailyHistApi = $api.injectEndpoints({
  endpoints: (build) => ({
    //gets daily weather history data
    getDailyHist: build.mutation<TGetDailyHistRes, TGetDailyHistReq>({
      query(data) {
        return {
          url: `history/daily?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&lat=${data.lat}&lon=${data.lon}&start_date=${data.start}&end_date=${data.end}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetDailyHistMutation,
} = $dailyHistApi;
