import { Hamburger } from "components/Layout/Header/MobileHeader/components/Hamburger";
import { MobileMenu } from "components/Layout/Header/MobileHeader/components/MobileMenu";
import { Drawer } from "components/ui/Drawer";
import { useState } from "react";

export const MobileHeader = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <>
      <Hamburger onClick={() => setIsDrawerOpen(true)} />
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <MobileMenu onClose={() => setIsDrawerOpen(false)} />
      </Drawer>
    </>
  );
};
