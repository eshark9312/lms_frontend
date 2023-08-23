import React, { useEffect, useState } from "react";
import {
  ArrowDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Check from "../../common/Check";
import Label from "../../common/Label";
import Search from "../Search";
import Filter from "../Filter";
import { useAuth } from "../../../providers/authProvider";
import useAuthHttpClient from "../../../hooks/useAuthHttpClient";
import QuestionItem from "../QuestionItem";
import Pagination from "../Pagination";
import { Spinner } from "../../icons/Spinner";

function Playlist({ playlist }) {
  const [show, setShow] = useState(false);
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authHttpClient = useAuthHttpClient();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await authHttpClient.post(
          "/playlist/filterQuestion",
          { user_id: user._id,
           playlist_id: playlist._id}
        );
        setQuestions(
          response.data.data
            .map((playlist) => playlist.question_id)
            .filter((item, pos, self) => self.indexOf(item) === pos) //remove duplicates
        );
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestions();
  }, []);
  return (
    <>
      {isLoading ? (
        <div
          role="status"
          className="h-[70vh] pb-20 flex justify-center items-center"
        >
          <Spinner />
        </div>
      ) : (<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg  divide-y-2 divide-gray-200">
        <div className="p-4 bg-white flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <Label color={playlist.color}>{playlist.name}</Label>
            <div className="px-2 border-2 border-gray-400 rounded-md text-[12px] h-fit text-gray-700 font-semibold">
              {questions.length} questions
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
            <EllipsisVerticalIcon className="w-5 h-5 stroke-2" />
          </div>
        </div>
        {show && (
          <>
            <div className="p-4 bg-white flex justify-between">
              <Search />
              <Filter />
            </div>
            <table className="min-w-full divide-y divide-gray-300">
            <thead className="divide-y divide-gray-200 bg-white">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 flex items-center gap-2"
                >
                  <div>Question ID</div>
                  <ArrowDownIcon className="w-4 h-4" />
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Last Assessed
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Playlist
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Last score
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Delete</span>
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Test</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {questions.map((question) => (
                <QuestionItem question_id={question} key={question._id} />
              ))}
            </tbody>
          </table>
          <Pagination />
          </>
        )}
      </div>)}
    </>
  );
}

export default Playlist;
