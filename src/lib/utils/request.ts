import axios, { type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { tryit } from "radash";


export type VjRequestConf = {
  interceptorRequest: (conf: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
  interceptorRequestErr: (err: unknown) => unknown;
  interceptorResponse: (res: AxiosResponse) => AxiosResponse;
  interceptorResponseErr: (err: unknown) => unknown;
  responseGlobalCheck: <T>(response: AxiosResponse<T, unknown>, options?: VjRequestOptions) => [true, T] | [false, unknown];
  globalErrorHandle: <T = unknown>(err: unknown) => Promise<T>;
};

export type VjRequestOptions = AxiosRequestConfig & Record<string, unknown>;

let requestConf: Partial<VjRequestConf> = {};

export const VjRequestSetConf = (conf: Partial<VjRequestConf>) => {
  requestConf = conf;
};

export const VjRequestGetConf = () => requestConf;

export const VjRequestInstance = axios.create();

export const VjRequestInit = (conf?: Partial<VjRequestConf>) => {
  if (conf) {
    VjRequestSetConf(conf);
  }
  VjRequestInstance.interceptors.request.use(
    (config) => {
      let conf = config;
      if (requestConf.interceptorRequest) {
        conf = requestConf.interceptorRequest(config);
      }
      return conf;
    },
    (error) => {
      let err = error;
      if (requestConf.interceptorRequestErr) {
        err = requestConf.interceptorRequestErr(error);
      }
      return Promise.reject(err);
    },
  );
  VjRequestInstance.interceptors.response.use(
    (response) => {
      let res = response;
      if (requestConf.interceptorResponse) {
        res = requestConf.interceptorResponse(response);
      }
      return res;
    },
    (error) => {
      let err = error;
      if (requestConf.interceptorResponseErr) {
        err = requestConf.interceptorResponseErr(error);
      }
      return Promise.reject(err);
    },
  );
};


const responseHandle = async <T>(
  res: AxiosResponse<T, any> | undefined,
  err: Error | undefined,
  options?: VjRequestOptions
) => {
  if (res && res.data) {
    if (requestConf.responseGlobalCheck) {
      let [status, latest] = requestConf.responseGlobalCheck<T>(res, options);
      if (status) {
        return latest as T;
      } else {
        throw latest;
      }
    } else {
      throw res;
    }
  } else {
    throw err;
  }
};

const catchFunc = <T>(error: unknown) => {
  if (requestConf.globalErrorHandle) {
    return requestConf.globalErrorHandle<T>(error);
  }
  return Promise.reject(error);
};

export const VjGet = async <T>(
  url: string,
  data?: unknown,
  options?: VjRequestOptions,
): Promise<T> => {
  let [err, res] = await tryit(() => VjRequestInstance.get<T>(url, Object.assign({}, { params: data }, options || {})).catch(catchFunc<AxiosResponse<T, any>>))();
  return responseHandle(res, err, options);
};

export const VjPost = async <T>(
  url: string,
  data?: unknown,
  options?: VjRequestOptions,
): Promise<T> => {
  let [err, res] = await tryit(() => VjRequestInstance.post<T>(url, data || {}, options || {}).catch(catchFunc<AxiosResponse<T, any>>))();
  return responseHandle(res, err, options);
};

export const VjPut = async <T>(
  url: string,
  data?: unknown,
  options?: VjRequestOptions,
): Promise<T> => {
  let [err, res] = await tryit(() => VjRequestInstance.put<T>(url, data || {}, options || {}).catch(catchFunc<AxiosResponse<T, any>>))();
  return responseHandle(res, err, options);
};

export const VjDel = async <T>(
  url: string,
  data?: unknown,
  options?: VjRequestOptions,
): Promise<T> => {
  let [err, res] = await tryit(() => VjRequestInstance.delete<T>(url, Object.assign({}, { params: data }, options || {})).catch(catchFunc<AxiosResponse<T, any>>))();
  return responseHandle(res, err, options);
};