import { LOGIN_API } from "../constants/ApiConstants";
import { postRequest } from "./ApiHelper";
export const apiLogin = async (email: string, password: string) => {
  const body = {
    username: email,
    password: password,
  };
  const response = await postRequest(body, LOGIN_API);
  return response;
};
