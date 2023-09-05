import { PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthHttpClient from "../../hooks/useAuthHttpClient";
import { format } from "date-fns";
import { useExam } from "../../providers/examProvider";
import { Spinner } from "../icons/Spinner";

const DPItem = ({ dp }) => {
  const navigator = useNavigate();
  const authHttpClient = useAuthHttpClient();
  const { setDps, selectedDps, setSelectedDps } = useExam();
  const [isLoading, setIsLoading] = useState(false);

  const fetchDpAndLoad = async () => {
    const response = await authHttpClient.get(`/dp/withDetails/${dp._id}`);
    setIsLoading(false);
    // var win = window.open("/exam/", '_blank');
    // win.focus();
    setDps([response.data.data]);
    navigator("/exam/");
  };

  const onClickHandle = () => {
    setIsLoading(true);
    fetchDpAndLoad();
  };

  const checkHandle = (checked) => {
    const tempDps = [...selectedDps.filter(_id=>dp._id !== _id)]
    if(checked) tempDps.push(dp._id);
    setSelectedDps(tempDps);
  };

  return (
    <tr className="even:bg-gray-50">
      <td className="font-extrabold py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600 mr-2"
          checked={!!selectedDps.find(_id=>dp._id === _id)}
          onChange={(e) => {
            checkHandle(e.target.checked);
          }}
        />
        {dp.dp_number}
      </td>
      <td className=" px-3 py-4 text-sm text-gray-500">
        {dp.last_assess && format(new Date(dp.last_assess), "MMM dd, yyyy")}
      </td>
      <td className=" px-3 py-4 text-sm text-gray-500">
        <div className="flex flex-wrap">
          {dp.matieres.map((matiere) => (
            <div
              key={matiere._id}
              className="px-2 m-1 max-w-fit border border-gray-400 rounded-md text-[12px]"
            >
              {matiere.name}
            </div>
          ))}
        </div>
      </td>
      <td className=" px-3 py-4 text-sm text-gray-500">
        <div className="flex flex-wrap">
          {dp.items.map((item) => (
            <div
              key={item._id}
              className="px-2 m-1 max-w-fit border border-gray-400 rounded-md text-[12px]"
            >
              {`${item.item_number}. ${item.name}`}
            </div>
          ))}
        </div>
      </td>
      <td className=" px-3 py-1 text-sm text-gray-500 ">
        {dp.user_score && `${dp.user_score}/${dp.total_score}`}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <div
          // to="/quiz"
          onClick={() => {
            onClickHandle();
          }}
          className="text-primary-600 hover:cursor-pointer"
        >
          {isLoading ? (
            <Spinner small />
          ) : (
            <PencilSquareIcon className="w-5 h-5 stroke-2" />
          )}
        </div>
      </td>
    </tr>
  );
};

export default DPItem;
