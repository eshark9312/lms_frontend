import React from "react";
import SearchIcon from "../icons/SearchIcon";

function Search() {
  return (
    <form
      className="relative flex w-[450px] h-fit justify-center items-center"
      action="#"
      method="GET"
    >
      <label htmlFor="search-field" className="sr-only">
        Search
      </label>
      <div
        className="pointer-events-none absolute pt-2.5 inset-y-0 left-3 h-full w-5 text-gray-400"
        aria-hidden="true"
      >
        <SearchIcon />
      </div>
      <input
        id="search-field"
        className="block py-3 h-full w-full pl-10 pr-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-sm  rounded-lg border-2 border-gray-400 focus:border-primary-600"
        placeholder="Search"
        type="search"
        name="search"
      />
    </form>
  );
}

export default Search;
