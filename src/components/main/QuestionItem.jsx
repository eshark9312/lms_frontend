import React from "react";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

import { useQuiz } from "../../hooks/useQuiz";
import Label from "../common/Label";

const QuestionItem = ({ question: _question }) => {
  const {
    question_id,
    question,
    question_number,
    playlists,
    user_score,
    total_score,
    last_assess,
  } = _question;

  const { selectedQuestions, setSelectedQuestions } = useQuiz();

  const checkHandle = (checked) => {
    const tempQuestions = [
      ...selectedQuestions.filter((_id) => question_id !== _id),
    ];
    if (checked) tempQuestions.push(question_id);
    setSelectedQuestions(tempQuestions);
  };

  return (
    <tr key={question_id} className="even:bg-gray-50">
      <td className="whitespace-wrap font-extrabold py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6 flex questions-center gap-2 items-center">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
          checked={!!selectedQuestions.find((_id) => question_id === _id)}
          onChange={(e) => {
            checkHandle(e.target.checked);
          }}
        />
        {question_number}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {last_assess && format(new Date(last_assess), "MMM dd, yyyy")}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 flex flex-wrap gap-1">
        {playlists && (
          <>
            {playlists
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((playlist) => (
                <Label color={playlist.color}>{playlist.name}</Label>
              ))}
          </>
        )}
      </td>
      <td className="w-1/4 whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-xs flex-auto truncate ">
        {question}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {user_score !== null &&
          user_score !== undefined &&
          `${user_score}/${total_score}`}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <Link href="#" className="text-primary-600 hover:text-primary-900">
          <TrashIcon className="w-5 h-5 stroke-2" />
        </Link>
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <Link className="text-primary-600 hover:text-primary-900">
          <PencilSquareIcon className="w-5 h-5 stroke-2" />
        </Link>
      </td>
    </tr>
  );
};

export default QuestionItem;
