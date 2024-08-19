import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

interface TokenPayload {
  email: string;
  exp: number;
  iat: number;
  id: string;
  name: string;
  role: string;
  avatar: string;
}

interface TokenStore {
  token: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  id: string;
  exp: number;
  iat: number;
  setToken: (newToken: string) => void;
  removeToken: () => void;
  refreshToken: () => void;
}

export const useTokenStore = create<TokenStore>((set) => ({
  token: "",
  id: "",
  name: "",
  email: "",
  role: "",
  avatar: "",
  exp: 0,
  iat: 0,
  setToken: (newToken: string) => {
    try {
      const decodedToken = jwtDecode<TokenPayload>(newToken);
      set({
        token: newToken,
        id: decodedToken.id,
        name: decodedToken.name,
        email: decodedToken.email,
        role: decodedToken.role,
        avatar: decodedToken.avatar,
        exp: decodedToken.exp,
        iat: decodedToken.iat,
      });
    } catch (error) {
      console.error("Invalid token", error);
      // Handle error jika token tidak valid
    }
  },
  removeToken: () =>
    set({
      token: "",
      id: "",
      name: "",
      email: "",
      role: "",
      avatar: "",
      exp: 0,
      iat: 0,
    }),
  refreshToken: async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/refresh-token`,
        { withCredentials: true }
      );
      const decodedToken = jwtDecode<TokenPayload>(
        response.data.data.access_token
      );
      set({
        token: response.data.data.access_token,
        id: decodedToken.id,
        name: decodedToken.name,
        email: decodedToken.email,
        role: decodedToken.role,
        avatar: decodedToken.avatar,
        exp: decodedToken.exp,
        iat: decodedToken.iat,
      });
    } catch (error: any) {
      console.error("Invalid token", error);
    }
  },
}));
