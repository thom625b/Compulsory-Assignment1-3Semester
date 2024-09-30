/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CustomerDto {
  /** @format int32 */
  id?: number;
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
}

export interface CreateCustomerDto {
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
}

export interface Customer {
  /** @format int32 */
  id?: number;
  /**
   * @minLength 0
   * @maxLength 255
   */
  name?: string;
  /**
   * @minLength 0
   * @maxLength 255
   */
  address?: string | null;
  /**
   * @minLength 0
   * @maxLength 50
   */
  phone?: string | null;
  /**
   * @minLength 0
   * @maxLength 255
   */
  email?: string | null;
  orders?: Order[];
}

export interface Order {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  orderDate?: string;
  /** @format date */
  deliveryDate?: string | null;
  /**
   * @minLength 0
   * @maxLength 50
   */
  status?: string;
  /** @format double */
  totalAmount?: number;
  /** @format int32 */
  customerId?: number | null;
  customer?: Customer | null;
  orderEntries?: OrderEntry[];
}

export interface OrderEntry {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  quantity?: number;
  /** @format int32 */
  productId?: number | null;
  /** @format int32 */
  orderId?: number | null;
  order?: Order | null;
  product?: Paper | null;
}

export interface Paper {
  /** @format int32 */
  id?: number;
  /**
   * @minLength 0
   * @maxLength 255
   */
  name?: string;
  discontinued?: boolean;
  /** @format int32 */
  stock?: number;
  /** @format double */
  price?: number;
  orderEntries?: OrderEntry[];
  features?: Feature[];
}

export interface Feature {
  /** @format int32 */
  id?: number;
  /**
   * @minLength 0
   * @maxLength 255
   */
  featureName?: string;
  papers?: Paper[];
}

export interface FeatureDto {
  name?: string;
  /** @format int32 */
  id?: number;
}

export interface CreateFeatureDto {
  name?: string;
}

export interface OrderDto {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  orderDate?: string;
  /** @format date */
  deliveryDate?: string | null;
  status?: string;
  /** @format double */
  totalAmount?: number;
  /** @format int32 */
  customerId?: number | null;
  orderEntries?: OrderEntryDto[];
}

export interface OrderEntryDto {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  quantity?: number;
  /** @format int32 */
  productId?: number | null;
  /** @format int32 */
  orderId?: number | null;
  product?: PaperDto | null;
}

export interface PaperDto {
  /** @format int32 */
  id?: number;
  name?: string;
  discontinued?: boolean;
  /** @format int32 */
  stock?: number;
  /** @format double */
  price?: number;
  orderEntries?: OrderEntry[];
  features?: Feature[];
}

export interface CreateOrderDto {
  /** @format date-time */
  orderDate?: string;
  /** @format date */
  deliveryDate?: string | null;
  status?: string;
  /** @format double */
  totalAmount?: number;
  customerEmail?: string;
  orderEntries?: CreateOrderEntryDto[];
}

export interface CreateOrderEntryDto {
  /** @format int32 */
  quantity?: number;
  /** @format int32 */
  productId?: number;
  /** @format int32 */
  orderId?: number;
}

export interface UpdateOrderDto {
  /** @format int32 */
  id?: number;
  /** @format date */
  deliveryDate?: string;
  /** @format double */
  totalAmount?: number;
}

export interface CreatePaperDto {
  name?: string;
  discontinued?: boolean;
  /** @format int32 */
  stock?: number;
  /** @format double */
  price?: number;
}

export interface UpdatePaperDto {
  /** @format int32 */
  id?: number;
  discontinued?: boolean;
  /** @format int32 */
  stock?: number;
}

export interface FeaturesToPaperDto {
  /** @format int32 */
  paperId?: number;
  featureIds?: number[];
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:5153" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title My Title
 * @version 1.0.0
 * @baseUrl http://localhost:5153
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Customer
     * @name CustomerCreateCustomer
     * @request POST:/api/Customer
     */
    customerCreateCustomer: (data: CreateCustomerDto, params: RequestParams = {}) =>
      this.request<CustomerDto, any>({
        path: `/api/Customer`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Customer
     * @name CustomerGetAllCustomers
     * @request GET:/api/Customer
     */
    customerGetAllCustomers: (params: RequestParams = {}) =>
      this.request<Customer[], any>({
        path: `/api/Customer`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Customer
     * @name CustomerGetCustomer
     * @request GET:/api/Customer/{id}
     */
    customerGetCustomer: (id: number, params: RequestParams = {}) =>
      this.request<Customer, any>({
        path: `/api/Customer/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Feature
     * @name FeatureCreateFeature
     * @request POST:/api/Feature
     */
    featureCreateFeature: (data: CreateFeatureDto, params: RequestParams = {}) =>
      this.request<FeatureDto, any>({
        path: `/api/Feature`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Feature
     * @name FeatureGetAllFeatures
     * @request GET:/api/Feature
     */
    featureGetAllFeatures: (params: RequestParams = {}) =>
      this.request<Feature[], any>({
        path: `/api/Feature`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Feature
     * @name FeatureGetFeature
     * @request GET:/api/Feature/{id}
     */
    featureGetFeature: (id: number, params: RequestParams = {}) =>
      this.request<Feature, any>({
        path: `/api/Feature/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrderCreateOrder
     * @request POST:/api/Order
     */
    orderCreateOrder: (data: CreateOrderDto, params: RequestParams = {}) =>
      this.request<OrderDto, any>({
        path: `/api/Order`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrderGetAllOrders
     * @request GET:/api/Order
     */
    orderGetAllOrders: (params: RequestParams = {}) =>
      this.request<Order[], any>({
        path: `/api/Order`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrderGetOrder
     * @request GET:/api/Order/{id}
     */
    orderGetOrder: (id: number, params: RequestParams = {}) =>
      this.request<Order, any>({
        path: `/api/Order/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrderUpdateOrder
     * @request PUT:/api/Order/update/{id}
     */
    orderUpdateOrder: (id: number, data: UpdateOrderDto, params: RequestParams = {}) =>
      this.request<OrderDto, any>({
        path: `/api/Order/update/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrderDecreaseStock
     * @request PUT:/api/Order/{id}/DecreaseStock
     */
    orderDecreaseStock: (
      id: number,
      query?: {
        /** @format int32 */
        productId?: number;
        /** @format int32 */
        quantity?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<File, any>({
        path: `/api/Order/${id}/DecreaseStock`,
        method: "PUT",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperCreatePaper
     * @request POST:/api/Paper
     */
    paperCreatePaper: (data: CreatePaperDto, params: RequestParams = {}) =>
      this.request<PaperDto, any>({
        path: `/api/Paper`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperGetAllPapers
     * @request GET:/api/Paper
     */
    paperGetAllPapers: (params: RequestParams = {}) =>
      this.request<Paper[], any>({
        path: `/api/Paper`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperGetPaper
     * @request GET:/api/Paper/{id}
     */
    paperGetPaper: (id: number, params: RequestParams = {}) =>
      this.request<Paper, any>({
        path: `/api/Paper/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperUpdatePaper
     * @request PUT:/api/Paper/update/{id}
     */
    paperUpdatePaper: (id: number, data: UpdatePaperDto, params: RequestParams = {}) =>
      this.request<PaperDto, any>({
        path: `/api/Paper/update/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperAddFeaturesToPaper
     * @request PUT:/api/Paper/features/{id}
     */
    paperAddFeaturesToPaper: (id: number, data: FeaturesToPaperDto, params: RequestParams = {}) =>
      this.request<PaperDto, any>({
        path: `/api/Paper/features/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
