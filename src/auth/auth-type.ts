export interface SignUpDto {
  login: string;
  password: string;
}

export interface LoginDto {
  login: string;
  password: string;
}

export interface RefreshDto {
  refreshToken: string;
}
