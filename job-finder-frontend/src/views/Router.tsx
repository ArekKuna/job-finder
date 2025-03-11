import { RouteWrapper } from "components/RouteWrapper/RouteWrapper";
import { BrowserRouter, Route, Routes } from "react-router";
import { EmployeeRegistration } from "views/EmployeeRegistration/EmployeeRegistration";
import { Home } from "views/Home/Home";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <RouteWrapper>
        <Routes>
          <Route index element={<Home />} />
          <Route
            path="/employee-registration"
            element={<EmployeeRegistration />}
          />
        </Routes>
      </RouteWrapper>
    </BrowserRouter>
  );
};
