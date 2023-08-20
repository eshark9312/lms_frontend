import { ArrowDownIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Label from "../../common/Label";
import Check from "../../common/Check";
import Pagination from "../Pagination";
import Search from "../Search";
import Filter from "../Filter";
import { useAuth } from "../../../providers/authProvider";
import useAuthHttpClient from "../../../hooks/useAuthHttpClient";
import { format } from "date-fns";
import DPItem from "../DPItem";

function All() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const authHttpClient = useAuthHttpClient();
  const [dps, setDps] = useState([]);
  const [selectedDp, setSelectedDp] = useState(null);

  useEffect(() => {
    const fetchDPs = async () => {
      try {
        const response = await authHttpClient.get("/dp");
        setDps(response.data.data);
        // setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDPs();
  }, []);

  return (
    <div>
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg  divide-y-2 divide-gray-200">
        <div className="p-4 bg-white flex justify-between">
          <Search />
          <Filter />
        </div>

        <table className="my-4 min-w-full divide-y divide-gray-300 rounded-lg border-2 border-gray-400">
          <thead className="divide-y divide-gray-200 bg-white rounded">
            <tr>
              <th
                scope="col"
                className="min-w-[80px] py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 flex items-center gap-2"
              >
                <div>ID</div>
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Last assessed
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Matiere
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Item
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Last score
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Test</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {dps.map((dp) => (
              <DPItem key={dp._id} dp={dp} />
            ))}
          </tbody>
        </table>
        <Pagination />
      </div>
    </div>
  );
}

export default All;
