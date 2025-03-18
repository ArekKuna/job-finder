import { useAuthorization } from "hooks/useAuthorization/useAuthorization";

export const Home = () => {
  useAuthorization();
  return <div className="min-h-screen">LandingPage</div>;
};
