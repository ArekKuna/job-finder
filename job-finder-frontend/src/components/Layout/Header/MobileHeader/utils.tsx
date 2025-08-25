import { LogoutIcon } from 'assets/Icons/LogoutIcon';
import { ProfileIcon } from 'assets/Icons/ProfileIcon';
import { SettingsIcon } from 'assets/Icons/SettingsIcon';
import { BasicRoute, UserRoute } from 'components/Layout/Header/MobileHeader/types';

export const BasicRoutes: BasicRoute[] = [
  {
    id: 1,
    to: '/',
    value: 'Home',
  },
  {
    id: 2,
    to: '/job-board',
    value: 'Find Jobs',
  },
  {
    id: 3,
    to: '/companies',
    value: 'Companies',
  },
  {
    id: 4,
    to: '/about',
    value: 'About Us',
  },
];

export const userRoutes: UserRoute[] = [
  {
    id: 1,
    to: '/profile',
    value: 'Profile',
    icon: <ProfileIcon size="sm" />,
  },
  {
    id: 2,
    to: '/settings',
    value: 'Settings',
    icon: <SettingsIcon size="sm" />,
  },
  {
    id: 4,
    to: '/',
    value: 'Logout',
    icon: <LogoutIcon size="sm" />,
  },
];
