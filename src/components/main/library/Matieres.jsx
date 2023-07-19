import React from 'react'
import Search from '../Search'
import CatCard from './CatCard'
import Pagination from '../Pagination'

function Matieres() {
  return (
    <div><div className="-mx-4 sm:-mx-6 lg:-mx-8 -mb-8 px-4 sm:px-6 lg:px-8 py-8 bg-gray-50">
    <div className="mb-4 flex flex-row-reverse">
      <Search />
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
      <CatCard />
      <CatCard />
      <CatCard />
      <CatCard />
      <CatCard />
      <CatCard />
      <CatCard />
      <CatCard />
      <CatCard />
      <CatCard />
      <CatCard />
      <CatCard />
    </div>
    <div className="mt-4">
      <Pagination />
    </div>
  </div></div>
  )
}

export default Matieres