export interface IJwt {
  sub: string;
  email: string;
  clms: string[],
  iat: number;
  exp: number;
}