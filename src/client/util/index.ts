//package imports
import { useCallback } from "react"
import _ from 'lodash'
//package types imports
import type { Dispatch, SetStateAction, ChangeEvent } from "react"
//porject imports
import { toast } from "@client/comp";
import { _BasicErrMsg } from "@shared/const";
import { $log, SchemaValidationError } from "@shared/util";
//project types imports
import type { TFormErrorObj } from "@shared/schema";

/** handles api requests errors
 * if schemaErrCb is not passed then it means this func called by middleware
 * if err is a server error and its a valid structured server error and [noToast = true] show the 
 * msg otherwise (like network error, ...) show general error message
 */
export const handleReqErr = (err: any, schemaErrCb?: (err: TFormErrorObj) => any) => {
  if(schemaErrCb) {
    if(err instanceof SchemaValidationError) {
      if(err.errors._errors?.length) //has a root error
        $log.err('Schema Validation Root Error: ', err.errors._errors)
      schemaErrCb(err.errors);
    } else if(err.status === 422)
      schemaErrCb(err.data.error);
    else {
      console.error('Uncaught Request error:', err);
      toast.err(_BasicErrMsg);
    }
  } else if(err?.data?.error) { //if it's a valid structured server error 
    if(!err.noToast && err.data.error?._errors?.length && err?.data?.error?._errors[0])
      toast.err(err.data.error._errors);
  } else
    toast.err(_BasicErrMsg);
};

/**handle form inputs onChange; 
 * @param setObjState set form data state function 
 * */
export const useOnInputChange = <T extends object>(setObjState: Dispatch<SetStateAction<T>>) => {
  return useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setObjState(d => ({..._.set(d, target.name, target.value)}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};