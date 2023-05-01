"use client";
import { useSession } from "next-auth/react";
import axios from "../axios";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await axios.post("/auth/refresh", {
      refreshToken: session?.user.refreshToken,
    });
    
    if (session) {
      session.user.accessToken = res.data.accessToken;
      session.user.expiresIn = res.data.expiresIn;
    }
  }

  return refreshToken;
}