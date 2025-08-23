import { MobileHeader } from "components/Layout/Header/MobileHeader";
import { JobFinderLogo } from "components/Layout/JobFinderLogo/JobFinderLogo";
import { Link } from "react-router-dom";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";

export const Header = () => {
  const [hidden, setHidden] = useState(false);

  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (currentY) => {
    if (currentY > lastScrollY.current && currentY > 50) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    lastScrollY.current = currentY;
  });

  return (
    <motion.header
      initial={false}
      animate={{
        y: hidden ? "-100%" : "0%",
      }}
      transition={{ duration: 0.1 }} // ease-in-out}
      className="fixed top-0 z-50 w-full flex justify-between p-2 items-center bg-white shadow transition-all"
    >
      <Link to="/">
        <JobFinderLogo />
      </Link>
      <MobileHeader />
    </motion.header>
  );
};
