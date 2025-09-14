export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginData {   // 👈 renamed
  username: string;
  password: string;
}

export interface RegisterData {   // 👈 renamed
  username: string;
  email: string;
  password: string;
}
