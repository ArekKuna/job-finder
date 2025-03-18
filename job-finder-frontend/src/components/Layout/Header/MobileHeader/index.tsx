import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { HamburgerMenu } from "components/Layout/Header/MobileHeader/HamburgerMenu";
import { JobFinderLogo } from "components/Layout/JobFinderLogo/JobFinderLogo";
import { MobileHeaderTitle } from "components/Layout/Header/MobileHeader/MobileHeaderTitle";
import { MobileNav } from "components/Layout/Header/MobileHeader/MobileNav";
import { Search } from "components/Layout/Header/MobileHeader/Search";
import { useAtom } from "jotai";
import { authStatusAtom } from "hooks/useAuthorization/authAtom";
import { AvatarIcon } from "assets/Icons/AvatarIcon";

export const MobileHeader = () => {
  const [authStatus] = useAtom(authStatusAtom);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavOptionClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <div>
      <motion.div
        className="fixed top-0 left-0 p-2 w-full flex flex-col shadow-md bg-white overflow-hidden z-20"
        animate={{ height: isMenuOpen ? window.innerHeight : "70px" }}
        initial={{ height: "70px" }}
        transition={{ duration: 0.9, ease: "circInOut" }}
      >
        <div className="flex justify-between items-center">
          <NavLink to="/">
            <JobFinderLogo />
          </NavLink>

          {authStatus === "AUTHORIZED" ? (
            <div onClick={handleNavOptionClick}>
              <AvatarIcon />
            </div>
          ) : (
            <HamburgerMenu
              isMenuOpen={isMenuOpen}
              onNavOptionClick={handleNavOptionClick}
            />
          )}
        </div>

        <MobileNav
          isMenuOpen={isMenuOpen}
          authStatus={authStatus}
          onNavOptionClick={handleNavOptionClick}
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
