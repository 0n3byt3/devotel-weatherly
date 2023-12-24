//external dependencies
import { z } from "zod";
//external types dependencies
//internal dependencies
import { errMsg } from "@shared";
//internal types dependencies

//base weather alerts api resp schema
const BaseAlertSchm = z.object({
  severity: z
    .enum(['Advisory', 'Watch', 'Warning'])
    .optional(),
  title: z
    .string()
    .optional(),
  description: z
    .string()
    .optional(),
  uri: z
    .string()
    .optional(),
});

const BaseAlertsResSchm = z.object({
  city_name: z
    .string()
    .optional(),
  state_code: z
    .string()
    .optional(),
  country_code: z
    .string()
    .optional(),
  alerts: z
    .array(BaseAlertSchm)
    .optional(),
});
export type TAlert = z.infer<typeof BaseAlertSchm>;

export type TGetAlertsReq = {
  lat: number,
  lon: number,
};
export type TGetAlertsRes = z.infer<typeof BaseAlertsResSchm>;
