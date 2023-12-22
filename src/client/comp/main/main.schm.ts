//external dependencies
import { z } from "zod";
//external types dependencies
//internal dependencies
import { errMsg } from "@shared";
//internal types dependencies

//base ip location api resp schema
const BaseIpLocSchm = z.object({
  query: z
    .string(),
  lat: z
    .number(),
  lon: z
    .number(),
});

export type TGetIpLocReq = void;
export type TGetIpLocRes = z.infer<typeof BaseIpLocSchm>;

//base current weather api resp schema
const BaseCurrWeatherSchm = z.object({
  count: z
    .number()
    .optional(),
  data: z
    .array(z.object({
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
    }))
    .optional(),
});

export type TGetCurrWeatherReq = {
  lat: number,
  lon: number,
};
export type TGetCurrWeatherRes = z.infer<typeof BaseCurrWeatherSchm>;