import { motion } from "framer-motion";

type Props = {
  isMenuOpen: boolean;
  onMenuVisibilityChange: () => void;
};

export const HamburgerMenu = ({
  isMenuOpen,
  onMenuVisibilityChange,
}: Props) => {
  const handleMenuVisibility = () => {
    onMenuVisibilityChange();
  };

  return (
    <button
      className="h-[50px] w-[50px] flex flex-col justify-center items-center gap-2 rounded-lg bg-gradient-to-r from-jf-purple-400 to-jf-purple-700"
      onClick={handleMenuVisibility}
    >
      <motion.span
        animate={{ y: isMenuOpen ? 11 : 0, rotate: isMenuOpen ? 45 : 0 }}
        transition={{
          y: { duration: 0.3, delay: isMenuOpen ? 0 : 0.5, ease: "easeInOut" },
          rotate: { duration: 0.4, delay: isMenuOpen ? 0.5 : 0 },
        }}
        className="h-[3px] w-[30px] bg-white rounded-lg"
      />
      <motion.span
        className="h-[3px] w-[25px] bg-white rounded-lg"
        animate={{ opacity: isMenuOpen ? 0 : 100 }}
        transition={{
          y: { duration: 0.3, delay: isMenuOpen ? 0.3 : 0, ease: "easeInOut" },
        }}
      ></motion.span>
      <motion.span
        className="h-[3px] w-[30px] bg-white rounded-lg"
        animate={{ y: isMenuOpen ? -11 : 0, rotate: isMenuOpen ? -45 : 0 }}
        transition={{
          y: { duration: 0.3, delay: isMenuOpen ? 0 : 0.5, ease: "easeInOut" },
          rotate: { duration: 0.4, delay: isMenuOpen ? 0.5 : 0 },
        }}
      ></motion.span>
    </button>
  );
};
