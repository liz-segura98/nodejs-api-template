export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface ApiErrorDetailResponse {
  code: string;
  status: number;
  message: string;
  details: string[];
}

export interface ApiErrorResponse {
  message: string;
  error: ApiErrorDetailResponse;
}