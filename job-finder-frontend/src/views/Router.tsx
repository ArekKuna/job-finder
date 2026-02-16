import { BrowserRouter, Route, Routes } from 'react-router';
import { About } from 'views/About';
import { Companies } from 'views/Companies';
import { EmployeeRegistration } from 'views/EmployeeRegistration';
import { EmployerRegistration } from 'views/EmployerRegistration';
import { JobBoard } from 'views/JobBoard';
import { Login } from 'views/Login';
import { UserSettings } from 'views/UserSettings';

import { ScrollToTop } from 'common/ScrollToTop';
import { RouteWrapper } from 'components/RouteWrapper/RouteWrapper';
import { Home } from 'views/Home';
import { MyProfile } from 'views/MyProfile';
import { PasswordRecovery } from 'views/PasswordRecovery';
import { Register } from 'views/Register';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteWrapper>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/job-board" element={<JobBoard />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password-recovery" element={<PasswordRecovery />} />
          <Route path="/register" element={<Register />} />
          <Route path="/employee-registration" element={<EmployeeRegistration />} />
          <Route path="/employer-registration" element={<EmployerRegistration />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/settings" element={<UserSettings />} />
        </Routes>
      </RouteWrapper>
    </BrowserRouter>
  );
};
