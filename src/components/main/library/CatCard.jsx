import React from 'react'
import ProgressCircle from '../../common/ProgressCircle'
import { useNavigate } from 'react-router-dom'

function CatCard({matiere}) {
  const navigate = useNavigate()

  return (
        <div onClick={()=>{navigate(`/library/matiere/${matiere._id}`)}} className="border-2 rounded-lg min-h-[200px] bg-white p-6 hover:shadow-lg hover:shadow-gray-300 click-action hover:cursor-pointer">
          <div className="flex justify-between items-center">
            <div className="w-20 h-20 bg-gray-100 rounded-lg flex flex-col justify-end items-center">
              <img src="/assets/image/card3.svg" alt="card" />
            </div>
            <ProgressCircle r={36} percent={40} />
          </div>
          <div className="mt-4 py-2 text-2xl font-extrabold">{matiere.name}</div>
          <div>{matiere.n_items} items {matiere.n_questions} questions</div>
        </div>
  )
}

export default CatCard