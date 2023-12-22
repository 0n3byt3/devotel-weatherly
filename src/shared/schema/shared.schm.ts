//external dependencies
import {number, z} from 'zod'
//external types dependencies
//internal dependencies
import { errMsg } from '../util';
//internal types dependencies

//Distributive Omit
export type DistOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

//OLD: formatted form validation error object
//taken from zod formated error
// type recursiveFormattedError<T> = T extends [any, ...any[]] ? {
//   [K in keyof T]?: FormattedError<T[K]>;
// } : T extends any[] ? {
//   [k: number]: FormattedError<T[number]>;
// } : T extends object ? {
//   [K in keyof T]?: FormattedError<T[K]>;
// } : unknown;

// type FormattedError<T, U = string> = {
//   _errors?: U[];
// } & recursiveFormattedError<NonNullable<T>>;

//export type FormErrorObj = FormattedError<{[key: string]: any}>;

//NEW: formatted form validation error object
// export type Remove_Errors<Type> = {
//   [K in keyof Type as Exclude<K, "_errors">]?: Type[K];
// };
// export interface IObj {
//   [key: string]: IObj;
// };
export interface TFormErrorObj {
  _errors?: string[];
  [key: string]: any;
};

// export type OM<T> = Omit<{
//   [key: string]: T;
// }, '_errors'>;
// export interface FormErrorObj extends OM<FormErrorObj>{
//   _errors?: string[];
// } ;

// Shape of the response when an error is thrown
export interface GeneralServerErrorRes {
  type: 'general';
  msg: string[];
}
export interface SchemaServerErrorRes {
  type: 'schema';
  msg: TFormErrorObj;
}
export type ServerErrorRes = GeneralServerErrorRes | SchemaServerErrorRes;

export const PaginationReqSchm = z.object({
  pageNum: z
    .coerce
    .number()
    .int()
    .nonnegative(errMsg.minVal('page number', 0))
    .default(1),
  pageSize: z
    .coerce
    .number()
    .int()
    .min(10, errMsg.minVal('items per page', 10))
    .default(10),
});
export type PaginationReq = z.infer<typeof PaginationReqSchm>;
export interface PaginationRes<T> {
  pageNum: number;
  totalPages: number;
  pageSize: number;
  list: T[];
}
