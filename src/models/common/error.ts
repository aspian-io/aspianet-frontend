export interface INestError {
  statusCode: number;
  message: string;
  error: string;
  internalCode?: number;
}