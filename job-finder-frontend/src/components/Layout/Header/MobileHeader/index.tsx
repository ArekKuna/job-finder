import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { HamburgerMenu } from "components/Layout/Header/MobileHeader/HamburgerMenu";
import { JobFinderLogo } from "components/Layout/JobFinderLogo/JobFinderLogo";

export const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.div
      className="fixed top-0 left-0 p-2 w-full flex justify-between bg-white"
      animate={{ height: isMenuOpen ? "100vh" : "71px" }}
      initial={{ height: "71px" }}
      transition={{ duration: 0.9, ease: "circInOut" }}
    >
      <NavLink to="/">
        <JobFinderLogo />
      </NavLink>

      <HamburgerMenu isMenuOpen={isMenuOpen} onOpenMenu={handleOpenMenu} />
    </motion.div>
  );
};
