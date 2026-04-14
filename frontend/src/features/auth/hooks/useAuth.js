import { useDispatch } from "react-redux";
import { register, login, getMe, logout } from "../services/auth.api";
import { setUser, setLoading, setError } from "../auth.slice";

export function useAuth() {
  const dispatch = useDispatch();

  async function handleRegister({ email, password, username }) {
    try {
      dispatch(setLoading(true));
      const response = await register({ email, password, username });
      return { success: true };
    } catch (err) {
      dispatch(setError(err.response?.data?.message || "Registration failed"));
      return { success: false };
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogin({ email, password }) {
    try {
      dispatch(setLoading(true));
      const response = await login({ email, password });
      dispatch(setUser(response.user));
    } catch (err) {
      dispatch(setError(err.response.data.message || "Login failed"));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetMe(silent = false) {
    try {
      if (!silent) {
        dispatch(setLoading(true));
      }
      const response = await getMe();
      dispatch(setUser(response.user));
    } catch (err) {
      // Only dispatch error if not in silent mode (initial app load)
      if (!silent) {
        dispatch(
          setError(err.response?.data?.message || "Failed to fetch user details"),
        );
      }
    } finally {
      if (!silent) {
        dispatch(setLoading(false));
      }
    }
  }

  async function handleLogout(){
    try{
      dispatch(setLoading(true));
      await logout();
      dispatch(setUser(null));    
    } catch (err) {
      dispatch(setError(err.response.data.message || "Failed to logout"));
    } finally {
      dispatch(setLoading(false));
    }
  }

  return {
    handleRegister,
    handleLogin,
    handleGetMe,
    handleLogout
  };
}
