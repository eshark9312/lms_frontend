import React from "react";

function QuickAccess() {
  return (
    <div className="p-2 border-2 border-dashed rounded-lg text-xs flex flex-col justify-center items-center hover:border-primary-600 hover:cursor-pointer group">
      <div className="w-9 h-9 m-1 rounded-full border-4 border-gray-50 bg-gray-100 text-xs flex justify-center items-center group-hover:border-primary-300 group-hover:bg-primary-600 group-hover:text-white">
        +
      </div>
      <div className="text-center text-[10px] group-hover:text-primary-600">Ajoute une matière ou un item</div>
    </div>
  );
}

export default QuickAccess;
