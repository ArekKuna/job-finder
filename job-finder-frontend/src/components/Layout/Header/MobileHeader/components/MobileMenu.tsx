import { CloseIcon } from "assets/Icons/CloseIcon";
import {
  BasicRoutes,
  userRoutes,
} from "components/Layout/Header/MobileHeader/utils";
import { Button } from "components/ui/Button";
import { authStatusAtom } from "hooks/useAuthorization/authAtom";
import { useLogout } from "hooks/useAuthorization/useAuthorization";

import { useAtom } from "jotai";
import { NavLink, useNavigate } from "react-router-dom";

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

  const isUserAuthorized = authStatus === "AUTHORIZED";

  return (
    <div className="p-4 relative">
      <div className="absolute top-4 right-4 cursor-pointer">
        <Button
          label="close-icon"
          icon={<CloseIcon size="sm" />}
          variant="ghost"
          onClick={onClose}
        />
      </div>

      {isUserAuthorized && (
        <div className="flex flex-col gap-1 py-6 border-b border-b-jf-warm-gray-200">
          <p>User fullName</p>
          <p>email</p>
        </div>
      )}

      <ul className="flex flex-col gap-4 py-6 border-b border-b-jf-warm-gray-200">
        {BasicRoutes.map((route) => {
          return (
            <li
              key={route.id}
              className="font-paragraph-1 hover:text-jf-blue-400"
            >
              <NavLink to={route.to} onClick={onClose}>
                {({ isActive }) => (
                  <span className={`${isActive ? "text-jf-blue-600" : ""}`}>
                    {route.value}
                  </span>
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
              <li
                key={route.id}
                className="hover:text-jf-blue-400 last-of-type:mt-4"
              >
                <NavLink
                  to={route.to}
                  onClick={() =>
                    route.value === "Logout" ? handleLogout() : onClose()
                  }
                >
                  {({ isActive }) => (
                    <div
                      className={`flex gap-2 items-center ${isActive ? "text-jf-blue-600" : ""}`}
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
          <Button
            text="Sign In"
            variant="ghost"
            onClick={() => {
              onClose();
              navigate("/login");
            }}
          />
          <Button
            text="Get Started"
            onClick={() => {
              onClose();
              navigate("/get-started");
            }}
          />
        </div>
      )}
    </div>
  );
};
