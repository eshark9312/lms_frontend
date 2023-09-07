import React, { useEffect, useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";

import { useAuth } from "../../../providers/authProvider";
import useAuthHttpClient from "../../../hooks/useAuthHttpClient";

import Pagination from "../Pagination";
import Search from "../Search";
import Filter from "./Filter";
import DPItem from "../DPItem";
import { Spinner } from "../../icons/Spinner";

function All() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const authHttpClient = useAuthHttpClient();
  const [dps, setDps] = useState([]);

  const [totalNumber, setTotalNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState({matieres:[], items: [], tags:[]});
  const [sort, setSort] = useState({ dp_number: 1 });

  useEffect(() => {
    const fetchDPs = async () => {
      try {
        const response = await authHttpClient.post("/dp/getPage", {
          user_id: user._id,
          pageSize,
          pageNumber,
          searchText,
          filter,
          sort,
        });
        console.log(response);
        setTotalNumber(response.data.total_number);
        setDps(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDPs();
  }, [searchText, pageNumber, pageSize, sort, filter]);

  const sortByDPId = () => {
    let tempSort = { ...sort };
    delete tempSort.dp_number;
    if (sort.dp_number === 1) tempSort = { dp_number: -1, ...tempSort };
    else if (sort.dp_number === -1) tempSort = { dp_number: 1, ...tempSort };
    setSort(tempSort);
  };

  const sortByLastAssess = () => {
    let tempSort = { ...sort };
    delete tempSort.last_assess;
    if (!sort?.last_assess) tempSort = { last_assess: 1, ...tempSort };
    else if (sort.last_assess === 1)
      tempSort = { last_assess: -1, ...tempSort };
    setSort(tempSort);
  };

  const sortByScore = () => {
    let tempSort = { ...sort };
    delete tempSort.user_score;
    if (!sort?.user_score) tempSort = { user_score: 1, ...tempSort };
    else if (sort.user_score === 1) tempSort = { user_score: -1, ...tempSort };
    setSort(tempSort);
  };

  return (
    <div>
      {isLoading ? (
        <div
          role="status"
          className="h-[70vh] pb-20 flex justify-center items-center"
        >
          <Spinner />
        </div>
      ) : (
        <div className="shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg  divide-y-2 divide-gray-200">
          <div className="p-4 bg-white flex justify-between sm:rounded-t-lg">
            <Search searchText={searchText} setSearchText={setSearchText} />
            <Filter filter={filter} setFilter={setFilter} />
          </div>
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="divide-y divide-gray-200 bg-white rounded">
              <tr>
                <th
                  scope="col"
                  className="min-w-[80px] py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 flex items-center gap-2"
                >
                  <div
                    onClick={() => {
                      sortByDPId();
                    }}
                    className="hover:cursor-pointer hover:text-primary-600 flex items-center max-w-fit"
                  >
                    ID
                    {sort.dp_number && sort.dp_number === 1 && (
                      <ChevronDownIcon className="w-4 h-4 stroke-2" />
                    )}
                    {sort.dp_number && sort.dp_number === -1 && (
                      <ChevronUpIcon className="w-4 h-4 stroke-2" />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-[150px]"
                >
                  <div
                    onClick={() => {
                      sortByLastAssess();
                    }}
                    className="hover:cursor-pointer hover:text-primary-600 flex items-center"
                  >
                    Last assessed
                    {!sort.last_assess && (
                      <ChevronUpDownIcon className="w-4 h-4 stroke-2" />
                    )}
                    {sort.last_assess && sort.last_assess === 1 && (
                      <ChevronDownIcon className="w-4 h-4 stroke-2" />
                    )}
                    {sort.last_assess && sort.last_assess === -1 && (
                      <ChevronUpIcon className="w-4 h-4 stroke-2" />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-[200px]"
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
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-[150px]"
                >
                <div
                  onClick={() => {
                    sortByScore();
                  }}
                  className="hover:cursor-pointer hover:text-primary-600 flex items-center max-w-fit"
                >
                  Last score
                  {!sort.user_score && (
                    <ChevronUpDownIcon className="w-4 h-4 stroke-2" />
                  )}
                  {sort.user_score && sort.user_score === 1 && (
                    <ChevronDownIcon className="w-4 h-4 stroke-2" />
                  )}
                  {sort.user_score && sort.user_score === -1 && (
                    <ChevronUpIcon className="w-4 h-4 stroke-2" />
                  )}
                </div>
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
          <Pagination
            totalNumber={totalNumber}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </div>
      )}
    </div>
  );
}

export default All;
