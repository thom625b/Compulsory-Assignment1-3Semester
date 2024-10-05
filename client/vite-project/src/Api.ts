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
  status?: OrderStatus;
  /** @format double */
  totalAmount?: number;
  /** @format int32 */
  customerId?: number | null;
  customer?: Customer | null;
  orderEntries?: OrderEntry[];
}

export enum OrderStatus {
  Pending = 0,
  Shipped = 1,
  Delivered = 2,
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
  paperFeatures?: PaperFeature[];
}

export interface PaperFeature {
  /** @format int32 */
  featureStock?: number | null;
  /** @format int32 */
  paperId?: number;
  /** @format int32 */
  featureId?: number;
  feature?: Feature;
  paper?: Paper;
}

export interface Feature {
  /** @format int32 */
  id?: number;
  /**
   * @minLength 0
   * @maxLength 255
   */
  featureName?: string;
  paperFeatures?: PaperFeature[];
}

export interface FeatureDto {
  name?: string;
  /** @format int32 */
  id?: number;
}

export interface CreateFeatureDto {
  name?: string;
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
  paperFeatures?: PaperFeature[];
}

export interface FeaturesToPaperDto {
  /** @format int32 */
  paperId?: number;
  featureIds?: number[];
  /** @format int32 */
  featureStock?: number;
}

export interface OrderDto {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  orderDate?: string;
  /** @format date */
  deliveryDate?: string | null;
  status?: OrderStatus2;
  /** @format double */
  totalAmount?: number;
  /** @format int32 */
  customerId?: number | null;
  orderEntries?: OrderEntryDto[];
}

export enum OrderStatus2 {
  Pending = "Pending",
  Shipped = "Shipped",
  Delivered = "Delivered",
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

export interface CreateOrderDto {
  /** @format date-time */
  orderDate?: string;
  /** @format date */
  deliveryDate?: string | null;
  status?: OrderStatus2;
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

export interface DecreaseStockDto {
  /** @format int32 */
  productId?: number;
  /** @format int32 */
  quantity?: number;
}

export interface OrderChangeStatusDto {
  newStatus?: OrderStatus;
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

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://localhost:5153";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
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
     * @request PATCH:/api/Order/{id}/DecreaseStock
     */
    orderDecreaseStock: (id: number, data: DecreaseStockDto, params: RequestParams = {}) =>
      this.request<File, any>({
        path: `/api/Order/${id}/DecreaseStock`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrderChangeOrderStatus
     * @request PATCH:/api/Order/{id}/ChangeOrderStatus
     */
    orderChangeOrderStatus: (id: number, data: OrderChangeStatusDto, params: RequestParams = {}) =>
      this.request<File, any>({
        path: `/api/Order/${id}/ChangeOrderStatus`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrderGetOrderStatuses
     * @request GET:/api/Order/statuses
     */
    orderGetOrderStatuses: (params: RequestParams = {}) =>
      this.request<File, any>({
        path: `/api/Order/statuses`,
        method: "GET",
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
  };
  featurePaper = {
    /**
     * No description
     *
     * @tags FeaturePaper
     * @name FeaturePaperGetFeatureStock
     * @request GET:/FeaturePaper/papers/{paperId}/features/{featureId}/stock
     */
    featurePaperGetFeatureStock: (paperId: number, featureId: number, params: RequestParams = {}) =>
      this.request<number, any>({
        path: `/FeaturePaper/papers/${paperId}/features/${featureId}/stock`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags FeaturePaper
     * @name FeaturePaperAddFeaturesToPaper
     * @request PATCH:/FeaturePaper/features/{id}
     */
    featurePaperAddFeaturesToPaper: (id: number, data: FeaturesToPaperDto, params: RequestParams = {}) =>
      this.request<PaperDto, any>({
        path: `/FeaturePaper/features/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
