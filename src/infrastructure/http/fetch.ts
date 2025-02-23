import { TMDBContextData } from "../../application/contexts/TMDBContext";

export interface HttpClient {
  get<T>(url: string, options?: RequestInit): Promise<T>;
  post<T>(url: string, data: unknown, options?: RequestInit): Promise<T>;
  put<T>(url: string, data: unknown, options?: RequestInit): Promise<T>;
  delete<T>(url: string, options?: RequestInit): Promise<T>;
}

export class FetchHttpClient implements HttpClient {
  constructor(private readonly config?: TMDBContextData) {}

  private async request<T>(
    url: string,
    method: string,
    options?: RequestInit,
    data?: unknown
  ): Promise<T> {
    try {
      const headers = this.buildHeaders(options?.headers);
      const response = await fetch(url, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
        ...options,
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Falha na requisição: ${error.message}`);
      }
      throw new Error("Erro desconhecido na requisição");
    }
  }

  private buildHeaders(customHeaders?: HeadersInit): Headers {
    const defaultHeaders = new Headers({
      "Content-Type": "application/json",
    });

    if (this.config?.fetchOptions?.headers) {
      Object.entries(this.config.fetchOptions.headers).forEach(([key, value]) => {
        defaultHeaders.append(key, value);
      });
    }

    if (customHeaders) {
      new Headers(customHeaders).forEach((value, key) => {
        defaultHeaders.append(key, value);
      });
    }

    return defaultHeaders;
  }

  async get<T>(url: string, options?: RequestInit): Promise<T> {
    return this.request<T>(url, "GET", options);
  }

  async post<T>(url: string, data: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(url, "POST", options, data);
  }

  async put<T>(url: string, data: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(url, "PUT", options, data);
  }

  async delete<T>(url: string, options?: RequestInit): Promise<T> {
    return this.request<T>(url, "DELETE", options);
  }
}