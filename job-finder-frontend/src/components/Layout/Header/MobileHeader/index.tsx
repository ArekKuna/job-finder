import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { HamburgerMenu } from "components/Layout/Header/MobileHeader/HamburgerMenu";
import { JobFinderLogo } from "components/Layout/JobFinderLogo/JobFinderLogo";
import { MobileHeaderTitle } from "components/Layout/Header/MobileHeader/MobileHeaderTitle";
import { MobileNav } from "components/Layout/Header/MobileHeader/MobileNav";
import { Search } from "components/Layout/Header/MobileHeader/Search";

export const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuVisibility = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <div>
      <motion.div
        className="fixed top-0 left-0 p-2 w-full flex flex-col shadow-md bg-white overflow-hidden"
        animate={{ height: isMenuOpen ? window.innerHeight : "70px" }}
        initial={{ height: "70px" }}
        transition={{ duration: 0.9, ease: "circInOut" }}
      >
        <div className="flex justify-between">
          <NavLink to="/">
            <JobFinderLogo />
          </NavLink>

          <HamburgerMenu
            isMenuOpen={isMenuOpen}
            onMenuVisibilityChange={handleMenuVisibility}
          />
        </div>

        <MobileNav
          isMenuOpen={isMenuOpen}
          onMenuVisibilityChange={handleMenuVisibility}
        />
      </motion.div>

      {isLandingPage && (
        <>
          <MobileHeaderTitle />
          <Search />
        </>
      )}
    </div>
  );
};
