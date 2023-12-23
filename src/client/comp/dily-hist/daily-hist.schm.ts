//external dependencies
import { z } from "zod";
//external types dependencies
//internal dependencies
import { errMsg } from "@shared";
//internal types dependencies

//base daily historical weather api schema
const BaseHistDaySchm = z.object({
  datetime: z
    .string()
    .optional(),
  ts: z
    .number()
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
});
export type THistDay = z.infer<typeof BaseHistDaySchm>;

const BaseHistSchm = z.object({
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
    .array(BaseHistDaySchm)
    .optional()
});
export type THist = z.infer<typeof BaseHistSchm>;

export type TGetDailyHistReq = {
  lat: number,
  lon: number,
  start: string,
  end: string,
};
export type TGetDailyHistRes = THist;