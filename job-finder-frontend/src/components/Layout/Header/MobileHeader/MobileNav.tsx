import {
  authorizedRoutes,
  Route,
  unauthorizedRoutes,
} from "components/Layout/Header/MobileHeader/utils";
import { motion } from "framer-motion";
import { useLogout } from "hooks/useAuthorization/useAuthorization";
import { NavLink } from "react-router-dom";

type Props = {
  isMenuOpen: boolean;
  authStatus: "AUTHORIZED" | "UNAUTHORIZED";
  onNavOptionClick: () => void;
};

export const MobileNav = ({
  isMenuOpen,
  authStatus,
  onNavOptionClick,
}: Props) => {
  const logout = useLogout();

  const handleNavOptionClick = (route: Route) => {
    if (route.value === "Logout") {
      logout();
    }

    onNavOptionClick();
  };

  return (
    <motion.nav
      className="h-full w-full flex flex-col gap-2 justify-center items-center font-jf-paragraph"
      animate={{ opacity: isMenuOpen ? 100 : 0 }}
      transition={{ duration: isMenuOpen ? 0.9 : 0.9 }}
    >
      {(authStatus === "AUTHORIZED"
        ? authorizedRoutes
        : unauthorizedRoutes
      ).map((route) => (
        <motion.li
          key={route.id}
          animate={{ opacity: isMenuOpen ? 100 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: isMenuOpen ? 1.2 : 0.8 }}
          className={`text-xl ${
            route.color ? route.color : "text-jf-purple-400"
          } list-none`}
        >
          <NavLink
            to={route.to}
            onClick={() => handleNavOptionClick(route)}
            className={`${!isMenuOpen && "pointer-events-none"}`}
          >
            {route.value.toUpperCase()}
          </NavLink>
        </motion.li>
      ))}
    </motion.nav>
  );
};
