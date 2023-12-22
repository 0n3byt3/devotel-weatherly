//package imports
//package types imports
//porject imports
import { $api, noToastErrTransform } from '@client/store/api'
//project types imports
import type { TGetCurrWeatherReq, TGetCurrWeatherRes, TGetIpLocReq, TGetIpLocRes } from './main.schm';

export const $mainApi = $api.injectEndpoints({
  endpoints: (build) => ({
    //gets ip location
    getIpLoc: build.query<TGetIpLocRes, TGetIpLocReq>({
      query(data) {
        return {
          url: `http://ip-api.com/json/`,
          method: 'GET',
        };
      },
    }),
    //gets current weather data
    getCurrWeather: build.mutation<TGetCurrWeatherRes, TGetCurrWeatherReq>({
      query(data) {
        return {
          url: `https://api.weatherbit.io/v2.0/current?key=4e4f1595534549219ec4be3d0177a5d6&lat=${data.lat}&lon=${data.lon}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useGetIpLocQuery,
  useGetCurrWeatherMutation,
} = $mainApi;