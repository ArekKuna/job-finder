export type Route = {
  id: number;
  to: string;
  value: string;
  color?: string | null;
};

export const unauthorizedRoutes: Route[] = [
  {
    id: 1,
    to: "/",
    value: "Home",
  },
  {
    id: 2,
    to: "/job-board",
    value: "Job Board",
  },
  {
    id: 3,
    to: "/login",
    value: "Login",
  },
  {
    id: 4,
    to: "/employee-registration",
    value: "Register",
  },
  {
    id: 5,
    to: "/for-employers",
    value: "For employers",
    color: "text-jf-purple-700",
  },
];

export const authorizedRoutes: Route[] = [
  {
    id: 1,
    to: "/",
    value: "Home",
  },
  {
    id: 2,
    to: "/job-board",
    value: "Job Board",
  },
  {
    id: 3,
    to: "/profile",
    value: "Profile",
  },
  {
    id: 4,
    to: "/",
    value: "Logout",
  },
];
