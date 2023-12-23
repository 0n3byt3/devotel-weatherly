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