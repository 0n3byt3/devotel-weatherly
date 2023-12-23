//package imports
//package types imports
//porject imports
import { $api, noToastErrTransform } from "@client/store/api";
//project types imports
import type {
  TGetIpLocReq,
  TGetIpLocRes,
} from "./main.schm";

export const $mainApi = $api.injectEndpoints({
  endpoints: (build) => ({
    //gets ip location
    getIpLoc: build.query<TGetIpLocRes, TGetIpLocReq>({
      query(data) {
        return {
          url: `http://ip-api.com/json/`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetIpLocQuery,
} = $mainApi;
