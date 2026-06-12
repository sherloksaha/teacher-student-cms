export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  status: string;
  message: string;
  data: T;
  timestamp: string;
}
