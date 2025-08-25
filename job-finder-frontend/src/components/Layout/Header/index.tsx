import { useRef, useState } from 'react';

import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Link } from 'react-router-dom';

import { MobileHeader } from 'components/Layout/Header/MobileHeader';
import { JobFinderLogo } from 'components/Layout/JobFinderLogo/JobFinderLogo';

export const Header = () => {
  const [hidden, setHidden] = useState(false);

  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, 'change', (currentY) => {
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
        y: hidden ? '-100%' : '0%',
      }}
      transition={{ duration: 0.1 }}
      className="fixed top-0 z-50 w-full border p-2 transition-all"
    >
      <nav className="flex items-center justify-between">
        <Link to="/">
          <JobFinderLogo />
        </Link>
        <MobileHeader />
      </nav>
    </motion.header>
  );
};
