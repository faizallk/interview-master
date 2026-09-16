import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import {
  login,
  register,
  changePassword,
  getCurrentUser,
  logout,
} from "../services/auth.api";
export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ username, email, password });
      setUser(data.user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  //Handle Login
  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      setUser(data.user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  //handle current user data
  const handleGetMe = async () => {
    setLoading(true);
    try {
      const data = await getCurrentUser();
      setUser(data.user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async ({ oldPassword, newPassword }) => {
    setLoading(true);
    try {
      await changePassword({ oldPassword, newPassword });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  
  return {
    user,
    loading,
    handleLogin,
    handleChangePassword,
    handleGetMe,
    handleLogout,
    handleRegister,
  };
};
