import { CloseIcon } from "assets/Icons/CloseIcon";
import {
  BasicRoutes,
  userRoutes,
} from "components/Layout/Header/MobileHeader/utils";
import { authStatusAtom } from "hooks/useAuthorization/authAtom";

import { useAtom } from "jotai";
import { NavLink } from "react-router-dom";

type Props = {
  onClose: () => void;
};

export const MobileMenu = ({ onClose }: Props) => {
  const [authStatus] = useAtom(authStatusAtom);

  const isUserAuthorized = authStatus === "AUTHORIZED";

  return (
    <div className="p-4 relative">
      <button
        className="absolute top-4 right-4 cursor-pointer"
        onClick={onClose}
      >
        <CloseIcon size="sm" />
      </button>

      {isUserAuthorized && (
        <div className="flex flex-col gap-1 py-6 border-b border-b-jf-warm-gray-200">
          <p>User fullName</p>
          <p>email</p>
        </div>
      )}

      <ul className="flex flex-col gap-4 py-6 border-b border-b-jf-warm-gray-200">
        {BasicRoutes.map((route) => {
          return (
            <li key={route.id} className="font-paragraph-1">
              <NavLink to={route.to} onClick={onClose}>
                {route.value}
              </NavLink>
            </li>
          );
        })}
      </ul>

      {isUserAuthorized ? (
        <ul className="flex flex-col gap-2 py-6">
          {userRoutes.map((route) => {
            return (
              <li key={route.id} className="last-of-type:mt-4">
                <NavLink to={route.to} onClick={onClose}>
                  <div className="flex gap-2 items-center">
                    <span>{route.icon}</span>
                    <p>{route.value}</p>
                  </div>
                </NavLink>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex flex-col">
          <button>Sign in</button>
          <button>Get Started</button>
        </div>
      )}
    </div>
  );
};
