import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '../interfaces/api-response.interface';

type ResponseOptions<T> = {
  entity: string;
  data: T;
  statusCode?: HttpStatus;
  status?: string;
};

export function buildResponseCreate<T>({
  entity,
  data,
  statusCode = HttpStatus.OK,
  status = 'success',
}: ResponseOptions<T>): ApiResponse<T> {
  return {
    success: statusCode >= 200 && statusCode < 300,
    statusCode,
    status,
    message: `${entity} created successfully`,
    data,
    timestamp: new Date().toISOString(),
  };
}
export function buildResponseFind<T>({
  entity,
  data,
  statusCode = HttpStatus.OK,
  status = 'success',
}: ResponseOptions<T>): ApiResponse<T> {
  return {
    success: statusCode >= 200 && statusCode < 300,
    statusCode,
    status,
    message: `${entity} found. `,
    data,
    timestamp: new Date().toISOString(),
  };
}
export function buildResponseUpdate<T>({
  entity,
  data,
  statusCode = HttpStatus.OK,
  status = 'success',
}: ResponseOptions<T>): ApiResponse<T> {
  return {
    success: statusCode >= 200 && statusCode < 300,
    statusCode,
    status,
    message: `${entity} updated successfully.`,
    data,
    timestamp: new Date().toISOString(),
  };
}
export function buildResponseDelete<T>({
  entity,
  data,
  statusCode = HttpStatus.OK,
  status = 'success',
}: ResponseOptions<T>): ApiResponse<T> {
  return {
    success: statusCode >= 200 && statusCode < 300,
    statusCode,
    status,
    message: `${entity} deleted successfully`,
    data,
    timestamp: new Date().toISOString(),
  };
}
