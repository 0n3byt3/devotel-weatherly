//package imports
import { z } from "zod";
//package types imports
//porject imports
import { TFormErrorObj } from "@shared/schema";
//project types imports

export class SchemaValidationError {
  errors: TFormErrorObj;
  raw: z.ZodError;
  constructor(vError: z.ZodError) {
    this.errors = vError.format();
    this.raw = vError;

    return this;
  }
}

export const validateSchema = <T extends z.ZodTypeAny>(
  data: unknown,
  schema: T,
  opt: Partial<{strict: boolean}> = {strict: true},
): z.infer<T> => {
  try {
    //strict only for object schemas
    if ((schema instanceof z.ZodObject) && opt.strict)
      return schema.strict().parse(data);
      
    return schema.parse(data);
  } catch (err) {
    if (err instanceof z.ZodError)
      throw new SchemaValidationError(err);
    else
      throw err;
  }
}