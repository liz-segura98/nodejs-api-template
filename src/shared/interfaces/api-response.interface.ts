export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  error: string;
  details: string[];
}