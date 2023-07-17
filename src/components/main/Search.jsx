import React from 'react'
import SearchIcon from '../icons/SearchIcon'

function Search() {
  return (
    <button className='px-4 py-2 w-full text-left border-2 rounded-lg text-gray-600 border-gray-400 hover:border-primary-600 hover:text-primary-600 hover:font-bold flex gap-2 '>
      <SearchIcon />
      Search
    </button>
  )
}

export default Search