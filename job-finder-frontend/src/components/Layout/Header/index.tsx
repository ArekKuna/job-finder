import { MobileHeader } from "components/Layout/Header/MobileHeader";
import { JobFinderLogo } from "components/Layout/JobFinderLogo/JobFinderLogo";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="w-full flex justify-between p-4 items-center">
      <Link to="/">
        <JobFinderLogo />
      </Link>
      <MobileHeader />
    </header>
  );
};
