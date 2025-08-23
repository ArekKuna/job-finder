import { RouteWrapper } from "components/RouteWrapper/RouteWrapper";
import { BrowserRouter, Route, Routes } from "react-router";
import { EmployeeRegistration } from "views/EmployeeRegistration/EmployeeRegistration";
import { GetStartedPage } from "views/GetStarted";
import { Home } from "views/Home/Home";
import { Login } from "views/Login/Login";
import { MyProfile } from "views/MyProfile";

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
          <Route path="/get-started" element={<GetStartedPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<MyProfile />} />
        </Routes>
      </RouteWrapper>
    </BrowserRouter>
  );
};
