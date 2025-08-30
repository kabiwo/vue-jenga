import{_ as e}from"./index.vue_vue_type_script_setup_true_lang-sL8bRyZN.js";import{d as t,i as o,e as s,o as r}from"./index-BlcAyLQn.js";const i=`# 组件介绍

对axios进行了封装，提供配置管理与常用的Get/Post/Put/Del方法

# 使用方法

由于axios初始化不在响应式范围内，配置写在VjConf中调用不便，因此单独管理

1. 在项目初始化时通过VjRequestInit方法传入配置

2. 可通过VjRequestSetConf修改配置

3. 调用Vj前缀的Get/Post/Put/Del方法

# 类型说明

\`\`\`ts
export type VjRequestConf = { // 配置参数
  // 请求拦截器
  interceptorRequest: (conf: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
  // 请求报错拦截器
  interceptorRequestErr: (err: unknown) => unknown;
  // 响应拦截器
  interceptorResponse: (res: AxiosResponse) => AxiosResponse;
  // 响应报错拦截器
  interceptorResponseErr: (err: unknown) => unknown;
  // 通用方法处理函数（按照各项目约定，实现自定义错误码处理等）
  responseGlobalCheck: <T>(response: AxiosResponse<T, unknown>, options?: VjRequestOptions) => [true, T] | [false, unknown];
}

export type VjRequestOptions = AxiosRequestConfig & Record<string, unknown>;  // 请求参数

const VjRequestSetConf: (conf: Partial<VjRequestConf>) => void  // 写入配置

const VjRequestGetConf: () => Partial<VjRequestConf>   // 获取配置

const VjRequestInit: (conf?: Partial<VjRequestConf> | undefined) => void  // 初始化拦截器，写入初始化配置

// Get方法
const VjGet: <T>(url: string, data?: unknown, options?: VjRequestOptions | undefined) => Promise<T>

// Post方法
const VjPost: <T>(url: string, data?: unknown, options?: VjRequestOptions | undefined) => Promise<T>

// Put方法
const VjPut: <T>(url: string, data?: unknown, options?: VjRequestOptions | undefined) => Promise<T>

// Del方法
const VjDel: <T>(url: string, data?: unknown, options?: VjRequestOptions | undefined) => Promise<T>
\`\`\``,R=t({__name:"index",setup(u){return(p,a)=>{const n=e;return r(),o(n,{mdStr:s(i)},null,8,["mdStr"])}}});export{R as default};
