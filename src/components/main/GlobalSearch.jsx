import React, { useState } from "react";
import SearchIcon from "../icons/SearchIcon";
import Modal from "../common/Modal";
import Search from "./Search";

function GlobalSearch() {
  const [search, openSearch] = useState(false)
  return (
    <>
      <button onClick={()=>{openSearch(state=>!state)}} className="px-4 py-2 w-full text-left border-2 rounded-lg text-gray-600 border-gray-400 hover:border-primary-600 hover:text-primary-600 hover:font-bold flex gap-2 click-action">
        <SearchIcon />
        Search
      </button>
      <Modal open={search} setOpen={openSearch}>
        <Search />
      </Modal>
    </>
  );
}

export default GlobalSearch;
