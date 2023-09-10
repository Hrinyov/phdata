import { useState } from "react";

export default function useToken() {
  const getToken = (): string | null => {
    const tokenString = localStorage.getItem("token");
    const userToken = tokenString ? JSON.parse(tokenString) : null;
    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken:  string | null ) => {
    if (userToken === null) {
      localStorage.removeItem("token");
    } else {
      localStorage.setItem("token", JSON.stringify(userToken));
    }
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
}
