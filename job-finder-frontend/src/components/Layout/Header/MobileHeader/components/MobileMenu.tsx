import { useAtom } from 'jotai';
import { NavLink, useNavigate } from 'react-router-dom';

import { CloseIcon } from 'assets/Icons/CloseIcon';
import { BasicRoutes, userRoutes } from 'components/Layout/Header/MobileHeader/utils';
import { ButtonUI } from 'components/ui/Button';
import { authStatusAtom } from 'hooks/useAuthorization/authAtom';
import { useLogout } from 'hooks/useAuthorization/useAuthorization';

type Props = {
  onClose: () => void;
};

export const MobileMenu = ({ onClose }: Props) => {
  const [authStatus] = useAtom(authStatusAtom);

  const navigate = useNavigate();
  const logout = useLogout();

  const handleLogout = () => {
    onClose();
    logout();
  };

  const isUserAuthorized = authStatus === 'AUTHORIZED';

  return (
    <div className="relative p-4">
      <div className="absolute top-2 right-0 cursor-pointer">
        <ButtonUI
          label="close-icon"
          icon={<CloseIcon size="sm" />}
          variant="ghost"
          onClick={onClose}
        />
      </div>

      {isUserAuthorized && (
        <div className="border-b-jf-warm-gray-200 flex flex-col gap-1 border-b py-6">
          <p>User fullName</p>
          <p>email</p>
        </div>
      )}

      <ul className="border-b-jf-warm-gray-200 flex flex-col gap-4 border-b py-6">
        {BasicRoutes.map((route) => {
          return (
            <li key={route.id} className="font-paragraph-1 hover:text-jf-blue-400">
              <NavLink to={route.to} onClick={onClose}>
                {({ isActive }) => (
                  <span className={`${isActive ? 'text-jf-blue-600' : ''}`}>{route.value}</span>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>

      {isUserAuthorized ? (
        <ul className="flex flex-col gap-2 py-6">
          {userRoutes.map((route) => {
            return (
              <li key={route.id} className="hover:text-jf-blue-400 last-of-type:mt-4">
                <NavLink
                  to={route.to}
                  onClick={() => (route.value === 'Logout' ? handleLogout() : onClose())}
                >
                  {({ isActive }) => (
                    <div
                      className={`flex items-center gap-2 ${isActive ? 'text-jf-blue-600' : ''}`}
                    >
                      <span>{route.icon}</span>
                      <p>{route.value}</p>
                    </div>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex flex-col gap-2 py-6">
          <ButtonUI
            text="Sign In"
            variant="ghost"
            onClick={() => {
              onClose();
              navigate('/login');
            }}
          />
          <ButtonUI
            text="Get Started"
            onClick={() => {
              onClose();
              navigate('/register');
            }}
          />
        </div>
      )}
    </div>
  );
};
