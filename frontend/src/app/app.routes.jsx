import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Dashboard from "../features/chat/pages/Dashboard";
import Protected from "../features/auth/components/Protected";
import UserProfile from "../features/profile/pages/UserProfile";
import WebsiteAnalyzerDashboard from "../features/websiteAnalyzer/pages/WebsiteAnalyzerDashboard";
import AnimatedLayout from "../shared/components/AnimatedLayout";

export const router = createBrowserRouter([
  {
    element: <AnimatedLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/",
        element: (
          <Protected>
            <Dashboard />
          </Protected>
        ),
      },
      {
        path: "/profile",
        element: (
          <Protected>
            <UserProfile />
          </Protected>
        ),
      },
      {
        path: "*",
        element: (
          <Protected>
            <Dashboard />
          </Protected>
        ),
      },
      {
        path: "/website-analyzer",
        element: (
          <Protected>
            <WebsiteAnalyzerDashboard />
          </Protected>
        ),
      },
    ],
  },
]);
