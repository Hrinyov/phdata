import axios from "axios";

export const loginUser = async (username: string , password: string) => {
    const response = await axios.post("http://localhost:8080/login", {
      username: username,
      password: password,
    });
    return response;
}

export const registerUser = async (username: string, password: string) => {
  const response = await axios.post("http://localhost:8080/register", {
    username: username,
    password: password,
  });
  return response;
};
