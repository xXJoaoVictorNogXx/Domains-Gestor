export interface User {
    id: number;
    email: string;
    password: string;
    token?: string;
    accessToken: string;
}

export interface LoginResponse {
  token?: string;
  accessToken?: string;
  user?: User; 
}