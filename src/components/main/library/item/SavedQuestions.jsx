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

function SavedQuestions({ item_id }) {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authHttpClient = useAuthHttpClient();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await authHttpClient.post(`/question/filter`, {
          item_id,
        });
        setQuestions(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <div>
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
              <QuestionItem question={question} key={question._id} />
            ))}
          </tbody>
        </table>
        <Pagination />
      </div>
    </div>
  );
}

const QuestionItem = ({ question }) => {
  const { user } = useAuth();
  const [lastAssessed, setLastAssessed] = useState();
  const [lastScore, setLastScore] = useState();
  const [playlist, setPlaylist] = useState();
  const authHttpClient = useAuthHttpClient();

  useEffect(() => {
    const getHistory = async () => {
      try {
        const response = await authHttpClient.post(`/answer/getLastAssess`, {
          user_id: user._id,
          question_id: question._id,
        });
        setLastScore(response.data.data?.user_score);
        setLastAssessed(response.data.data?.last_access);
      } catch (error) {
        console.log(error);
      }
    };
    getHistory();
  }, [authHttpClient, user, question]);

  useEffect(() => {
    const getPlaylist = async () => {
      try {
        const response = await authHttpClient.post(`/playlist/filterQuestion`, {
          user_id: user._id,
          question_id: question._id,
        });
        console.log(response.data.data)
        setPlaylist(response.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getPlaylist();
  }, [user, question]);


  return (
    <tr key={question._id} className="even:bg-gray-50">
      <td className="whitespace-wrap font-extrabold py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6 flex questions-center gap-2">
        <Check />#{question.question_number}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {lastAssessed && format(new Date(lastAssessed),"MMM dd, yyyy")}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {playlist && <Label>{playlist.playlist_id.name}</Label>}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {question.desc}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {lastScore && `${lastScore}/20`}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <Link href="#" className="text-indigo-600 hover:text-indigo-900">
          <TrashIcon className="w-5 h-5 stroke-2" />
        </Link>
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <Link to="/quiz" className="text-indigo-600 hover:text-indigo-900">
          <PencilSquareIcon className="w-5 h-5 stroke-2" />
        </Link>
      </td>
    </tr>
  );
};

export default SavedQuestions;
