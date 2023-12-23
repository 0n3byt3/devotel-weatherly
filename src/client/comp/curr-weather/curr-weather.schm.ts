//external dependencies
import { z } from "zod";
//external types dependencies
//internal dependencies
import { errMsg } from "@shared";
//internal types dependencies

//base current weather api resp schema
const BaseCurrWeatherSchm = z.object({
  pod: z
    .enum(['d', 'n'])
    .optional(),
  city_name: z
    .string()
    .optional(),
  state_code: z
    .string()
    .optional(),
  country_code: z
    .string()
    .optional(),
  temp: z
    .number()
    .optional(),
  weather: z
    .object({
      icon: z
        .string()
        .optional(),
      code: z
        .number()
        .optional(),
      description: z
        .string()
        .optional(),
    })
    .optional(),
});
export type TCurrWeather = z.infer<typeof BaseCurrWeatherSchm>;

export type TGetCurrWeatherReq = {
  lat: number,
  lon: number,
};
export type TGetCurrWeatherRes = {
  count?: number,
  data?: TCurrWeather[],
};
