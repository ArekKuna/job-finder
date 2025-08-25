import { BrowserRouter, Route, Routes } from 'react-router';

import { RouteWrapper } from 'components/RouteWrapper/RouteWrapper';
import { About } from 'views/About';
import { Companies } from 'views/Companies';
import { EmployeeRegistration } from 'views/EmployeeRegistration';
import { EmployerRegistration } from 'views/EmployerRegistration';
import { GetStartedPage } from 'views/GetStarted';
import { Home } from 'views/Home';
import { JobBoard } from 'views/JobBoard';
import { Login } from 'views/Login';
import { MyProfile } from 'views/MyProfile';
import { UserSettings } from 'views/UserSettings';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <RouteWrapper>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/job-board" element={<JobBoard />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/get-started" element={<GetStartedPage />} />
          <Route path="/employee-registration" element={<EmployeeRegistration />} />
          <Route path="/employer-registration" element={<EmployerRegistration />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/settings" element={<UserSettings />} />
        </Routes>
      </RouteWrapper>
    </BrowserRouter>
  );
};
