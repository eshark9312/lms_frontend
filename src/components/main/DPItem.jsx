import { ArrowDownIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Label from "../common/Label";
import Check from "../common/Check";
import Pagination from "./Pagination";
import Search from "./Search";
import Filter from "./Filter";
import { useAuth } from "../../providers/authProvider";
import useAuthHttpClient from "../../hooks/useAuthHttpClient";
import { format } from "date-fns";

const DPItem = ({ dp }) => {
  const { user } = useAuth();
  const [lastAssessed, setLastAssessed] = useState();
  const [lastScore, setLastScore] = useState();
  const [playlists, setPlaylist] = useState();
  const authHttpClient = useAuthHttpClient();

  // useEffect(() => {
  //   const getHistory = async () => {
  //     try {
  //       const response = await authHttpClient.post(`/answer/getLastAssessForDp`, {
  //         user_id: user._id,
  //         dp_id: dp._id,
  //       });
  //       setLastScore(response.data.data?.user_score);
  //       setLastAssessed(response.data.data?.last_access);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getHistory();
  // }, [user, dp]);

  // useEffect(() => {
  //   const getPlaylist = async () => {
  //     try {
  //       const response = await authHttpClient.post(
  //         `/playlist/filterAndGetPlaylist`,
  //         {
  //           user_id: user._id,
  //           question_id,
  //         }
  //       );
  //       setPlaylist(response.data.data.map((playlist) => playlist.playlist_id));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getPlaylist();
  // }, [user, question_id]);

  return (
    <tr className="even:bg-gray-50">
      <td className="font-extrabold py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6 flex dps-center gap-2">
        {dp.dp_number}
      </td>
      <td className=" px-3 py-4 text-sm text-gray-500">
        {lastAssessed && format(new Date(lastAssessed), "MMM dd, yyyy")}
      </td>
      <td className=" px-3 py-4 text-sm text-gray-500">{dp.matiere_id.name}</td>
      <td className=" px-3 py-4 text-sm text-gray-500">
        { dp.item_id && `${dp.item_id.item_number}. ${dp.item_id.name}`}
      </td>
      <td className=" px-3 py-1 text-sm text-gray-500 ">
        {lastScore && `${lastScore}/20`}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <Link
          // to="/quiz"
          className="text-primary-600 hover:text-primary-900"
        >
          <PencilSquareIcon className="w-5 h-5 stroke-2" />
        </Link>
      </td>
    </tr>
  );
};

export default DPItem;
