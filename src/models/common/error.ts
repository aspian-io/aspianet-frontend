// Error type that receives from the backend
export interface INestError {
  statusCode: number;
  message: string;
  error?: string;
  errors?: INestFieldError[];
  internalCode?: number;
}

// Error constraints type that receive from the backend
export interface INestFieldError {
  property: string;
  children: string[];
  constraints: Record<string, string>;
}