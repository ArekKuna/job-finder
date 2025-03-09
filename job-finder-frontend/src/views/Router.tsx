import { RouteWrapper } from "components/RouteWrapper/RouteWrapper";
import { BrowserRouter, Route, Routes } from "react-router";
import { LandingPage } from "views/LandingPage/LandingPage";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <RouteWrapper>
        <Routes>
          <Route index element={<LandingPage />} />
        </Routes>
      </RouteWrapper>
    </BrowserRouter>
  );
};
