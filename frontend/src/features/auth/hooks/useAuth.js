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

  //Register API
  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ username, email, password });
      setUser(data);
      setLoading(false);
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
      setUser(data);
      setLoading(false);
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
      setUser(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);  
    }
  };
//handle logout
  const handleLogout = async () => {
    setLoading(true);
    try {
      const data = await logout();
      setUser(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
//handle change password
  const handleChangePassword = async ({ oldPassword, newPassword }) => {
    setLoading(true);
    try {
      const data = await login({ oldPassword, newPassword });
      setUser(data);
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
