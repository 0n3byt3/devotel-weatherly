//external dependencies
import { z } from "zod";
//external types dependencies
//internal dependencies
import { errMsg } from "@shared";
//internal types dependencies

//base 7 dayforcast weather api schema
const BaseDayForecastSchm = z.object({
  datetime: z
    .string()
    .optional(),
  ts: z
    .number()
    .optional(),
  pod: z
    .enum(['d', 'n'])
    .optional(),
  temp: z
    .number()
    .optional(),
  min_temp: z
    .number()
    .optional(),
  max_temp: z
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
export type TDayForecast = z.infer<typeof BaseDayForecastSchm>;

const BaseForecastSchm = z.object({
  city_name: z
    .string()
    .optional(),
  state_code: z
    .string()
    .optional(),
  country_code: z
    .string()
    .optional(),
  data: z
    .array(BaseDayForecastSchm)
    .optional()
});
export type TForecast = z.infer<typeof BaseForecastSchm>;

export type TGetForecast7Req = {
  lat: number,
  lon: number,
};
export type TGetForecast7Res = TForecast;
