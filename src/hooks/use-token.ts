import { useState } from "react";

export default function useToken() {
  const getToken = (): string | null => {
    const tokenString = localStorage.getItem("token");
    console.log(tokenString)
    const userToken = tokenString ? JSON.parse(tokenString) : null;
    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: { token: string }) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
}
