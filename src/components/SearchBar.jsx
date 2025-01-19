import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSearch, setSearch } from "../redux/features/search/searchSlice";

const SearchBar = () => {
  const searchQuery = useSelector(selectSearch);
  const dispatch = useDispatch();

  const handleSearchQuery = (e) => {
    dispatch(setSearch(e.target.value));
  };
  return (
    <input
      type="search"
      value={searchQuery}
      onChange={handleSearchQuery}
      className="w-[50%] rounded-lg outline-none p-2 text-black"
      placeholder="Search Here..."
    />
  );
};

export default SearchBar;
