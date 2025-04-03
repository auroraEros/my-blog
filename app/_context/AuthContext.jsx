"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import { getUserApi, signinApi, signupApi } from "../_lib/authService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    case "signin":
    case "signup":
    case "user/loaded":
      return {
        user: { ...action.payload },
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case "logout":
      return {
        user: {},
        isAuthenticated: false,
        isLoading: false,
      };

    default:
      return initialState;
  }
}

export default function AuthProvider({ children }) {
  const router = useRouter();
  const [{ user, isAuthenticated, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function signup(values) {
    dispatch({ type: "loading" });
    try {
      const { user, message } = await signupApi(values);
      dispatch({ type: "signup", payload: user });
      toast.success(message);
      router.push("/profile");
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      dispatch({ type: "rejected", payload: errorMsg });
      toast.error(errorMsg);
    }
  }

  async function signin(values) {
    dispatch({ type: "loading" });
    try {
      const { user, message } = await signinApi(values);
      dispatch({ type: "signin", payload: user });
      toast.success(message);
      router.push("/profile");
    } catch (error) {
      const errorMsg = error?.response?.data?.message || "کاربری یافت نشد";
      dispatch({ type: "rejected", payload: errorMsg });
      toast.error(errorMsg);
    }
  }

  function logout() {
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";

    dispatch({ type: "logout" });

    router.push("/");
    toast.success("با موفقیت از سیستم خارج شدید");
  }

  async function getUser() {
    dispatch({ type: "loading" });
    try {
      const { user } = await getUserApi();
      dispatch({ type: "user/loaded", payload: user });
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      dispatch({ type: "rejected", payload: errorMsg });
    }
  }

  async function updateUser(updatedData) {
    dispatch({
      type: "user/loaded",
      payload: {
        ...user,
        avatarUrl: updatedData.avatarUrl,
      },
    });
  }

  useEffect(() => {
    getUser();
  }, [user?.avatarUrl]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        signin,
        signup,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useContext was used outside of AuthContext");
  return context;
}
