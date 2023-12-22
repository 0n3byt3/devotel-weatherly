//package imports
import { isRejectedWithValue } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
//package types imports
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'
import type { FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
//porject imports
import { $log } from '@shared/util';
import { handleReqErr } from '@client/util';
//project types imports
import type { RootState } from '../store';

type TClientErrorRes = FetchBaseQueryError & {
  noToast?: boolean;
};

export interface TApiRes<T> {
  success: boolean;
  status: number;
  data: T;
}

//TODO: solve multiple toast err problem 
/**
 * Log a warning and show a toast!
 */
export const apiErrToast: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    const err = action.payload;
    $log.warn('We got a rejected action!', err);
    handleReqErr(err);
  }

  return next(action);
};

/**
 * staggeredBaseQueryWithBailOut  
 */
const baseQuery = retry(
  async (args: string | FetchArgs, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_REACT_APP_API_SERVER_URL, //should end with '/' (slash)
      prepareHeaders: (headers, { getState }) => {
        // By default, if we have a token in the store, let's use that for authenticated requests
        const token = (getState() as RootState).auth.token?.access;
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
      },
    })(
      args,
      api,
      extraOptions
    );

    // bail out of re-tries immediately if unauthorized, Unprocessable Content, ...
    // because we know successive re-retries would be redundant
    if (result.error?.status === 400 || result.error?.status === 401 || result.error?.status === 422) {
      retry.fail(result.error);
    }

    return result;
  },
  {
    maxRetries: 3,
  }
);

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded 
 */
export const $api = createApi({
    reducerPath: '$Api',
    baseQuery,
    /**
     * Tag types must be defined in the original API definition
     * for any tags that would be provided by injected endpoints
     */
    tagTypes: [
      'Auth',
    ],
    /**
     * This api has endpoints injected in adjacent files,
     * which is why no endpoints are shown below.
     */
    endpoints: () => ({}),
});

export const noToastErrTransform = (res: TClientErrorRes, meta: unknown, arg: unknown) => {
  res.noToast = true;
  return res;
};