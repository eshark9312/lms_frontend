import { createContext, useContext, useEffect, useState } from "react";

import { isAxiosError } from "axios";
import { httpClient } from "../config/axiosConfig";

import { setAccessToken } from "../helper/Token";
import { useNavigate } from "react-router-dom";
import useAuthHttpClient from "../hooks/useAuthHttpClient";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const authHttpClient = useAuthHttpClient();

  useEffect(() => {
    authHttpClient
      .get("auth/refresh")
      .then((res) => {
        // console.log(res);
        setUser(res.data.data.user);
      })
      .catch((e) => e);
  }, []);

  const navigate = useNavigate();
  const login = async ({ email, password }) => {
    let err = "";
    try {
      const { data } = await httpClient.post("/auth/signin", {
        email,
        password,
      });
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      setAccessToken(data.user.token);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
        err = error.response.data.error;
      } else {
        console.log(error);
        err = "Opps! Something Unexpected happens";
      }
    }
    return err;
  };
  const signup = async (signUpData) => {
    let err = "";
    try {
      await httpClient.post("/auth/signup", signUpData);
    } catch (error) {
      if (isAxiosError(error)) {
        err = error.response.data.error;
      } else {
        err = "Opps! Something Unexpected happens";
      }
    }
    return err;
  };
  const signout = async () => {
    let err = "";
    try {
      // await httpClient.get("/auth/signout");
      setUser(undefined);
      localStorage.removeItem("user");
      setAccessToken("");
      navigate("/");
    } catch (error) {
      if (isAxiosError(error)) {
        err = error.response.data.error;
      } else {
        err = "Opps! Something Unexpected happens";
      }
    }
    return err;
  };
  const forgotpassword = async (email) => {
    let err = "";
    try {
      await httpClient.post("/auth/forgotpassword", {
        email,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        err = error.response?.data.error.message;
      } else {
        err = "Opps! Something Unexpected happens";
      }
    }
    return err;
  };
  const resetpassword = async (password, resetpasswordToken) => {
    let err = "";
    try {
      await httpClient.post(
        "/auth/resetpassword",
        {
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${resetpasswordToken}`,
          },
        }
      );
    } catch (error) {
      if (isAxiosError(error)) {
        err = error.response?.data.error.message;
      } else {
        err = "Opps! Something Unexpected happens";
      }
    }

    return err;
  };

  const value = {
    user,
    login,
    signup,
    signout,
    forgotpassword,
    resetpassword,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  return useContext(AuthContext);
}
