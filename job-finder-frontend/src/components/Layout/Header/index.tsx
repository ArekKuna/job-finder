import { MobileHeader } from "components/Layout/Header/MobileHeader";
import { JobFinderLogo } from "components/Layout/JobFinderLogo/JobFinderLogo";

export const Header = () => {
  return (
    <header className="w-full flex justify-between p-4 items-center">
      <JobFinderLogo />
      <MobileHeader />
    </header>
  );
};
