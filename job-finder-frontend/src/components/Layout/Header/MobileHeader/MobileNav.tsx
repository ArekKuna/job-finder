import { routes } from "components/Layout/Header/MobileHeader/utils";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

type Props = {
  isMenuOpen: boolean;
  onMenuVisibilityChange: () => void;
};

export const MobileNav = ({ isMenuOpen, onMenuVisibilityChange }: Props) => {
  const handleMenuVisibility = () => {
    onMenuVisibilityChange();
  };

  return (
    <motion.nav
      className="h-full w-full flex flex-col gap-2 justify-center items-center font-jf-paragraph"
      animate={{ opacity: isMenuOpen ? 100 : 0 }}
      transition={{ duration: isMenuOpen ? 0.9 : 0.9 }}
    >
      {routes.map((route) => (
        <motion.li
          key={route.id}
          animate={{ opacity: isMenuOpen ? 100 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className={`text-xl ${
            route.color ? route.color : "text-jf-purple-400"
          } list-none`}
        >
          <NavLink to={route.to} onClick={handleMenuVisibility}>
            {route.value.toUpperCase()}
          </NavLink>
        </motion.li>
      ))}
    </motion.nav>
  );
};
