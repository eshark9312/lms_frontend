import {
  ArrowDownIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import format from "date-fns/format";
import { Link } from "react-router-dom";
import Label from "../../../common/Label";
import Check from "../../../common/Check";
import Pagination from "../../Pagination";
import useAuthHttpClient from "../../../../hooks/useAuthHttpClient";
import { useAuth } from "../../../../providers/authProvider";
import { Spinner } from "../../../icons/Spinner";
import QuestionItem from "../../QuestionItem";

function SavedQuestions({ matiere_id }) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authHttpClient = useAuthHttpClient();

  const [totalNumber, setTotalNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [sort, setSort] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await authHttpClient.post(
          `/playlist/getQuestionsWithDetail`,
          {
            user_id: user.id,
            matiere_id: matiere_id,
            pageNumber: pageNumber,
            pageSize: pageSize,
            sort: sort,
          }
        );
        console.log(response);
        setTotalNumber(response.data.total_number);
        setQuestions(
          response.data.data.map(({_id}) => _id)
        );
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestions();
  }, [pageSize, pageNumber, sort]);
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
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg  divide-y-2 divide-gray-200">
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
                <QuestionItem question_id={question} key={question} />
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

export default SavedQuestions;
