import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import Search from "../Search";
import Filter from "../Filter";
import {
  ArrowDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EllipsisVerticalIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import useAuthHttpClient from "../../../hooks/useAuthHttpClient";
import { useAuth } from "../../../providers/authProvider";
import Label from "../../common/Label";
import DPItem from "../DPItem";
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

  const [totalNumber, setTotalNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState({session_id: session._id});
  const [sort, setSort] = useState({});

  useEffect(() => {
    const fetchDPs = async () => {
      try {
        const response = await authHttpClient.post("/dp/getPage", {
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
  }, [searchText,pageNumber]);

  const [show, setShow] = useState(false);
  return isLoading ? (
    <div
      role="status"
      className="h-[70vh] pb-20 flex justify-center items-center"
    >
      <Spinner />
    </div>
  ) : (
    <div className="mt-2 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg  divide-y-2 divide-gray-200">
      <div className="p-4 bg-white flex justify-between items-center gap-2">
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
            <Filter />
          </div>

          <table className="min-w-full divide-y divide-gray-300 rounded-lg border-2 border-gray-400">
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
