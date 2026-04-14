import React, { useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./app.routes.jsx";
import { useAuth } from "../features/auth/hooks/useAuth.js";
import { useDispatch } from "react-redux";
import { setLoading } from "../features/auth/auth.slice.js";

const App = () => {
  const { handleGetMe } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    // Silently check for existing user session without showing errors
    const initializeAuth = async () => {
      try {
        await handleGetMe(true); // true = silent mode
      } catch (err) {
        // Silent fail - user is not authenticated
      } finally {
        dispatch(setLoading(false));
      }
    };

    initializeAuth();
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
