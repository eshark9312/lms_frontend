import { useEffect, useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronUpDownIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

import useAuthHttpClient from "../../../hooks/useAuthHttpClient";
import { useAuth } from "../../../providers/authProvider";

import DPItem from "../DPItem";
import Pagination from "../Pagination";
import Search from "../Search";
import Filter from "./Filter";
import Label from "../../common/Label";
import { Spinner } from "../../icons/Spinner";

const colors = [
  "primary",
  "red",
  "green",
  "grayBlue",
  "orange",
  "gray",
  "blue",
  "indigo",
  "pink",
  "success",
  "lightBlue",
  "purple",
];

export default function Session({ session, index, editAction }) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const authHttpClient = useAuthHttpClient();
  const [dps, setDps] = useState([]);
  const [selectedDp, setSelectedDp] = useState(null);
  const [show, setShow] = useState(false);
  
  const [totalNumber, setTotalNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({ dp_number: 1 });
  
  useEffect(() => {
    const fetchDPs = async () => {
      try {
        const response = await authHttpClient.post("/dp/getPage", {
          user_id: user._id,
          pageSize,
          session_id: session._id,
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
  }, [searchText,pageNumber, pageSize, sort, filter, session]);

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

  return isLoading ? (
    <div
      role="status"
      className="h-[70vh] pb-20 flex justify-center items-center"
    >
      <Spinner />
    </div>
  ) : (
    <div className="mt-2 shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg  divide-y-2 divide-gray-200">
      <div className="p-4 bg-white flex justify-between items-center gap-2 rounded-t-lg">
        <div className="flex items-center gap-2">
          <Label color={colors[index % colors.length]}>{session.name}</Label>
          <div className="px-2 border-2 border-gray-400 rounded-md text-[12px] h-fit text-gray-700 font-semibold">
            {session.n_dps} dps
          </div>
          <div className="px-2 border-2 border-gray-400 rounded-md text-[12px] h-fit text-gray-700 font-semibold">
            {session.n_questions} questions
          </div>
        </div>
        <div className="flex items-center gap-2">
          {show ? (
            <ChevronUpIcon
              onClick={() => setShow((state) => !state)}
              className="w-5 h-5 stroke-2 hover:cursor-pointer hover:text-primary-600"
            />
          ) : (
            <ChevronDownIcon
              onClick={() => setShow((state) => !state)}
              className="w-5 h-5 stroke-2 hover:cursor-pointer hover:text-primary-600"
            />
          )}
          <div
            onClick={editAction}
            className="rounded-lg hover:outline hover:outline-2 hover:cursor-pointer outline-primary-600"
          >
            <EllipsisVerticalIcon className="w-5 h-5 stroke-2" />
          </div>
        </div>
      </div>
      {show && (
        <>
          <div className="p-4 bg-white flex justify-between">
                <Search searchText={searchText} setSearchText={setSearchText}/>
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
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  <div
                    onClick={() => {
                      sortByLastAssess();
                    }}
                    className="hover:cursor-pointer hover:text-primary-600 flex items-center max-w-fit"
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
        </>
      )}
    </div>
  );
}
