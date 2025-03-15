import { ChangeEvent, Dispatch, useState } from "react";
import { Input } from "components/Input/Input";
import { LocationIcon } from "assets/Icons/LocationIcon";
import { SearchIcon } from "assets/Icons/SearchIcon";

export const Search = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleInputValueChange = (
    e: ChangeEvent<HTMLInputElement>,
    setterFn: Dispatch<React.SetStateAction<string>>
  ) => {
    setterFn(e.target.value);
  };

  return (
    <div className="px-4 flex flex-col gap-2">
      <Input
        border="secondary"
        sideElement={<SearchIcon />}
        sideElementPosition="start"
        value={searchInput}
        placeholder="company, location, etc..."
        onChange={(e) => handleInputValueChange(e, setSearchInput)}
      />
      <Input
        border="secondary"
        sideElement={<LocationIcon />}
        sideElementPosition="start"
        value={searchInput}
        placeholder="find your city"
        onChange={(e) => handleInputValueChange(e, setSearchInput)}
      />
      <button className="w-full h-10 flex justify-center items-center rounded-lg text-jf-geologica-white bg-jf-purple-700">
        Search
      </button>
    </div>
  );
};
