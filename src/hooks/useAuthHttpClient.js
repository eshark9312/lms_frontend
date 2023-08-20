import axios from "axios";
import { httpClient } from "../config/axiosConfig";
import { useAuth } from "../providers/authProvider";
import { getAccessToken, setAccessToken } from "../helper/Token";

const useAuthHttpClient = () => {
  const { signout } = useAuth();

  const authHttpClient = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/api`,
    withCredentials: false,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const refreshAccessToken = async () => {
    try {
      const response = await httpClient.get("/auth/refresh");
      console.log(response.data);
      const { token } = response.data.data;
      return token;
    } catch (error) {
      signout();
    }
    return "";
  };

  authHttpClient.interceptors.request.use(
    async (
      config
    ) => {
      let accessToken = getAccessToken();

      if (!accessToken) {
        accessToken = (await refreshAccessToken());
        setAccessToken(accessToken);
      }
      config.headers["x-access-token"] = accessToken;

      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  authHttpClient.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        error.response.data.message === "Unauthorized!"
      ) {
        const accessToken = (await refreshAccessToken());
        setAccessToken(accessToken);

        originalRequest.headers["x-access-token"] = accessToken;

        return authHttpClient.request(originalRequest);
      }
      return Promise.reject(error);
    }
  );

  return authHttpClient;
};
export default useAuthHttpClient;