//package imports
//package types imports
//porject imports
import { $api, noToastErrTransform } from "@client/store/api";
//project types imports
import type {
  TGetAlertsReq,
  TGetAlertsRes,
} from ".";

export const $alertsApi = $api.injectEndpoints({
  endpoints: (build) => ({
    //gets weather alerts
    getAlerts: build.mutation<TGetAlertsRes, TGetAlertsReq>({
      query(data) {
        return {
          url: `alerts?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&lat=${data.lat}&lon=${data.lon}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetAlertsMutation,
} = $alertsApi;
