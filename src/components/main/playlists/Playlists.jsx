import {
  ArrowDownIcon,
  ChevronDownIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";
import Check from "../../common/Check";
import Label from "../../common/Label";
import Playlist from "./Playlist";

function Playlists() {
  const playlists = [
    {
      title: "Playlist 1",
      num_questions: 20,
      color: "primary",
      questions: [
        {
          id: 3066,
          lastAssessed: "Jan 6, 2022",
          playlist: null,
          desc: "",
          lastScore: 4,
        },
        {
          id: 3065,
          lastAssessed: "Jan 6, 2022",
          playlist: null,
          desc: "Épidémiologie",
          lastScore: 10,
        },
        {
          id: 3064,
          lastAssessed: "Jan 6, 2022",
          playlist: null,
          desc: "Prise en charge de la dissection aortique",
          lastScore: 4,
        },
        {
          id: 3063,
          lastAssessed: "Jan 5, 2022",
          playlist: null,
          desc: "",
          lastScore: 20,
        },
        {
          id: 3062,
          lastAssessed: "Jan 5, 2022",
          playlist: 1,
          desc: "",
          lastScore: 20,
        },
        {
          id: 3061,
          lastAssessed: "Jan 4, 2022",
          playlist: null,
          desc: "",
          lastScore: 4,
        },
        {
          id: 3060,
          lastAssessed: "Jan 4, 2022",
          playlist: null,
          desc: "",
          lastScore: 4,
        },
        {
          id: 3059,
          lastAssessed: "Jan 3, 2022",
          playlist: null,
          desc: "Délai ECG SCA",
          lastScore: 4,
        },
        {
          id: 3058,
          lastAssessed: "Jan 3, 2022",
          playlist: null,
          desc: "",
          lastScore: 4,
        },
        {
          id: 3057,
          lastAssessed: "Jan 3, 2022",
          playlist: null,
          desc: "",
          lastScore: 4,
        },
      ],
    },
    {
      title: "Playlist 2",
      num_questions: 20,
      color: "indigo",
      questions: [
        {
          id: 3066,
          lastAssessed: "Jan 6, 2022",
          playlist: null,
          desc: "",
          lastScore: 4,
        },
        {
          id: 3065,
          lastAssessed: "Jan 6, 2022",
          playlist: null,
          desc: "Épidémiologie",
          lastScore: 10,
        },
        {
          id: 3064,
          lastAssessed: "Jan 6, 2022",
          playlist: null,
          desc: "Prise en charge de la dissection aortique",
          lastScore: 4,
        },
        {
          id: 3063,
          lastAssessed: "Jan 5, 2022",
          playlist: null,
          desc: "",
          lastScore: 20,
        },
        {
          id: 3062,
          lastAssessed: "Jan 5, 2022",
          playlist: 1,
          desc: "",
          lastScore: 20,
        },
        {
          id: 3061,
          lastAssessed: "Jan 4, 2022",
          playlist: null,
          desc: "",
          lastScore: 4,
        },
        {
          id: 3060,
          lastAssessed: "Jan 4, 2022",
          playlist: null,
          desc: "",
          lastScore: 4,
        },
        {
          id: 3059,
          lastAssessed: "Jan 3, 2022",
          playlist: null,
          desc: "Délai ECG SCA",
          lastScore: 4,
        },
        {
          id: 3058,
          lastAssessed: "Jan 3, 2022",
          playlist: null,
          desc: "",
          lastScore: 4,
        },
        {
          id: 3057,
          lastAssessed: "Jan 3, 2022",
          playlist: null,
          desc: "",
          lastScore: 4,
        },
      ],
    },
    {
      title: "Playlist 3",
      num_questions: 18,
      color: "pink",
      questions: [
        {
          id: 3066,
          lastAssessed: "Jan 6, 2022",
          playlist: null,
          desc: "",
          lastScore: 4,
        },
        {
          id: 3065,
          lastAssessed: "Jan 6, 2022",
          playlist: null,
          desc: "Épidémiologie",
          lastScore: 10,
        },
        {
          id: 3064,
          lastAssessed: "Jan 6, 2022",
          playlist: null,
          desc: "Prise en charge de la dissection aortique",
          lastScore: 4,
        },
        {
          id: 3063,
          lastAssessed: "Jan 5, 2022",
          playlist: null,
          desc: "",
          lastScore: 20,
        },
        {
          id: 3062,
          lastAssessed: "Jan 5, 2022",
          playlist: 1,
          desc: "",
          lastScore: 20,
        },
        {
          id: 3061,
          lastAssessed: "Jan 4, 2022",
          playlist: null,
          desc: "",
          lastScore: 4,
        },
        {
          id: 3060,
          lastAssessed: "Jan 4, 2022",
          playlist: null,
          desc: "",
          lastScore: 4,
        },
        {
          id: 3059,
          lastAssessed: "Jan 3, 2022",
          playlist: null,
          desc: "Délai ECG SCA",
          lastScore: 4,
        },
        {
          id: 3058,
          lastAssessed: "Jan 3, 2022",
          playlist: null,
          desc: "",
          lastScore: 4,
        },
        {
          id: 3057,
          lastAssessed: "Jan 3, 2022",
          playlist: null,
          desc: "",
          lastScore: 4,
        },
      ],
    },
    {
      title: "Playlist 4",
      num_questions: 21,
      color: "success",
      questions: [
        {
          id: 3066,
          lastAssessed: "Jan 6, 2022",
          playlist: null,
          desc: "",
          lastScore: 4,
        },
        {
          id: 3065,
          lastAssessed: "Jan 6, 2022",
          playlist: null,
          desc: "Épidémiologie",
          lastScore: 10,
        },
        {
          id: 3064,
          lastAssessed: "Jan 6, 2022",
          playlist: null,
          desc: "Prise en charge de la dissection aortique",
          lastScore: 4,
        },
        {
          id: 3063,
          lastAssessed: "Jan 5, 2022",
          playlist: null,
          desc: "",
          lastScore: 20,
        },
        {
          id: 3062,
          lastAssessed: "Jan 5, 2022",
          playlist: 1,
          desc: "",
          lastScore: 20,
        },
        {
          id: 3061,
          lastAssessed: "Jan 4, 2022",
          playlist: null,
          desc: "",
          lastScore: 4,
        },
        {
          id: 3060,
          lastAssessed: "Jan 4, 2022",
          playlist: null,
          desc: "",
          lastScore: 4,
        },
        {
          id: 3059,
          lastAssessed: "Jan 3, 2022",
          playlist: null,
          desc: "Délai ECG SCA",
          lastScore: 4,
        },
        {
          id: 3058,
          lastAssessed: "Jan 3, 2022",
          playlist: null,
          desc: "",
          lastScore: 4,
        },
        {
          id: 3057,
          lastAssessed: "Jan 3, 2022",
          playlist: null,
          desc: "",
          lastScore: 4,
        },
      ],
    },
    {
      title: "Playlist 5",
      num_questions: 15,
      color: "orange",
      questions: [
        {
          id: 3066,
          lastAssessed: "Jan 6, 2022",
          playlist: null,
          desc: "",
          lastScore: 4,
        },
        {
          id: 3065,
          lastAssessed: "Jan 6, 2022",
          playlist: null,
          desc: "Épidémiologie",
          lastScore: 10,
        },
        {
          id: 3064,
          lastAssessed: "Jan 6, 2022",
          playlist: null,
          desc: "Prise en charge de la dissection aortique",
          lastScore: 4,
        },
        {
          id: 3063,
          lastAssessed: "Jan 5, 2022",
          playlist: null,
          desc: "",
          lastScore: 20,
        },
        {
          id: 3062,
          lastAssessed: "Jan 5, 2022",
          playlist: 1,
          desc: "",
          lastScore: 20,
        },
        {
          id: 3061,
          lastAssessed: "Jan 4, 2022",
          playlist: null,
          desc: "",
          lastScore: 4,
        },
        {
          id: 3060,
          lastAssessed: "Jan 4, 2022",
          playlist: null,
          desc: "",
          lastScore: 4,
        },
        {
          id: 3059,
          lastAssessed: "Jan 3, 2022",
          playlist: null,
          desc: "Délai ECG SCA",
          lastScore: 4,
        },
        {
          id: 3058,
          lastAssessed: "Jan 3, 2022",
          playlist: null,
          desc: "",
          lastScore: 4,
        },
        {
          id: 3057,
          lastAssessed: "Jan 3, 2022",
          playlist: null,
          desc: "",
          lastScore: 4,
        },
      ],
    },
  ];
  return (
    <>
      <div className="inline-block min-w-full py-2 align-middle">
        <div className="flex flex-col gap-4">
          {playlists.map((playlist, idx) => (
            <Playlist key={idx} playlist={playlist}/>
          ))}
        </div>
      </div>
    </>
  );
}

export default Playlists;
