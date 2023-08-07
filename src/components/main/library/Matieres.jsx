import React, { useEffect, useState } from "react";
import axios from "axios";
import Search from "../Search";
import CatCard from "./CatCard";
import { Spinner } from "../../icons/Spinner";

function Matieres() {
  console.log(process.env.REACT_APP_SERVER_URL)
  const [isLoading, setIsLoading] = useState(true);
  const [matieres, setMatieres] = useState([]);

  useEffect(() => {
    const fetchMatieres = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/matiere/`);
        setMatieres(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMatieres();
  }, []);

  return (
    <div>
      <div className="-mx-4 sm:-mx-6 lg:-mx-8 -mb-8 px-4 sm:px-6 lg:px-8 py-8 bg-gray-50">
        <div className="mb-4 flex flex-row-reverse">
          <Search />
        </div>
        {isLoading ? (
          <div role="status" className="h-[50vh] pb-20 flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {matieres.map((matiere, index) => (
              <CatCard key={index} matiere={matiere} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Matieres;
