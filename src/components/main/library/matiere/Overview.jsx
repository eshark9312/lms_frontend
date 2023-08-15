import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

import PieChart from "../../PieChart";
import Search from "../../Search";
import Filter from "../../Filter";
import { ProgressBar } from "../../../common/ProgressBar";
import Pagination from "../../Pagination";
import { Spinner } from "../../../icons/Spinner";
import useAuthHttpClient from "../../../../hooks/useAuthHttpClient";
import { useAuth } from "../../../../providers/authProvider";

function Overview({ matiere }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authHttpClient = useAuthHttpClient();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await authHttpClient.post(`/item/filter/`, {
          matiere_id: matiere._id,
        });
        setItems(response.data.data);
        console.log(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  }, []);

  // const items = [
  //   {
  //     title: "152. Endocardite infectieuse",
  //     status: "Fait",
  //     questions: "24 questions",
  //     progressRate: 60,
  //   },
  //   {
  //     title: "153. Surveillance des porteurs de prothèses valvulaires",
  //     status: "Fait",
  //     questions: "24 questions",
  //     progressRate: 60,
  //   },
  //   {
  //     title: "230. Douleur thoracique aiguë",
  //     status: "Fait",
  //     questions: "24 questions",
  //     progressRate: 60,
  //   },
  //   {
  //     title: "231. Électrocardiogramme : indications et interprétations",
  //     status: "Fait",
  //     questions: "24 questions",
  //     progressRate: 60,
  //   },
  //   {
  //     title: "232. Fibrillation atriale",
  //     status: "Fait",
  //     questions: "24 questions",
  //     progressRate: 60,
  //   },
  //   {
  //     title: "233. Valvulopathies",
  //     status: "Fait",
  //     questions: "24 questions",
  //     progressRate: 60,
  //   },
  //   {
  //     title: "234. Insuffisance cardiaque",
  //     status: "Fait",
  //     questions: "24 questions",
  //     progressRate: 60,
  //   },
  // ];

  if (isLoading)
    return (
      <div className="-mx-4 sm:-mx-6 lg:-mx-8 -mb-8 px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 h-[70vh] flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <>
      <div className="inline-block min-w-full py-2 align-middle">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg  divide-y-2 divide-gray-200">
          <div className="p-6 bg-white text-xl font-extrabold">
            Liste des items
          </div>
          <div className="p-4 bg-white flex justify-between">
            <Search />
            <Filter />
          </div>
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="divide-y divide-gray-200 bg-white">
              <tr>
                <th
                  scope="col"
                  className="w-1/3 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Number of questions
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Progress rate
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {items.map((item) => (
                <tr key={item._id}>
                  <td className="whitespace-wrap font-extrabold py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6 hover:text-primary-600 hover:cursor-pointer click-action">
                    <Link to={`/library/item/${item._id}`}>
                      {item.item_number}. {item.name}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {item.status}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {item.n_questions} questions
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <ProgressBar item={item} />
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <Link
                      to="/quiz"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <PencilSquareIcon className="w-5 h-5 stroke-2" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination />
        </div>
      </div>
      <div className="mt-8 grid md:grid-cols-2 gap-8 bg-gray-50">
        {/* statistics card */}
        <StatisticsChart matiere={matiere} />
      </div>
    </>
  );
}
const StatisticsChart = ({ matiere }) => {
  const [successRate, setSuccessRate] = useState(null);
  const [progressRate, setProgressRate] = useState(0);

  const authHttpClient = useAuthHttpClient();
  const { user } = useAuth();
  useEffect(() => {
    const getSuccessRate = async () => {
      try {
        const response = await authHttpClient.post(`/progress/matiere/filter`, {
          user_id: user._id,
          matiere_id: matiere._id,
        });
        console.log(response);
        setSuccessRate(response.data.data[0]?.success_rate);
        setProgressRate(response.data.data[0]?.progress_rate);
      } catch (error) {
        console.log(error);
      }
    };
    getSuccessRate();
  }, []);

  return (
    <>
      <div className="rounded-2xl bg-white p-6 relative">
        <div className="absolute top-4 right-4 text-gray-500 hover:cursor-pointer group-hover:text-primary-600">
          <EllipsisVerticalIcon className="w-6 h-6" />
        </div>
        <div>
          <PieChart
            data={
              successRate
                ? [
                    successRate.excellent,
                    successRate.good,
                    successRate.average,
                    successRate.poor,
                  ]
                : [0, 0, 0, 1]
            }
            color={["#7F56D9", "#9E77ED", "#B692F6", "#D6BBFB", "#EAECF0"]}
          />
        </div>
        <div className="py-4">How you answer?</div>
        <div className="text-green-500 text-4xl font-extrabold">
          {successRate
            ? Math.round(
                ((successRate.excellent + successRate.good) * 100) /
                  (successRate.excellent +
                    successRate.good +
                    successRate.average +
                    successRate.poor)
              )
            : 0}
          % success
        </div>
      </div>
      <div className="rounded-2xl bg-white p-6 relative">
        <div className="absolute top-4 right-4 text-gray-500 hover:cursor-pointer group-hover:text-primary-600">
          <EllipsisVerticalIcon className="w-6 h-6" />
        </div>
        <div>
          <PieChart
            data={
              progressRate
                ? [progressRate, matiere.n_questions - progressRate]
                : [0, 1]
            }
            color={["#475467", "#F2F4F7"]}
          />
        </div>
        <div className="py-4">Progress rate</div>
        <div className="text-green-500 text-4xl font-extrabold">
          {progressRate && matiere.n_questions
            ? Math.round((progressRate * 100) / matiere.n_questions)
            : 0}
          % done
        </div>
      </div>
    </>
  );
};

export default Overview;
