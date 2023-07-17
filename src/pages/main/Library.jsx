import React, { useState } from "react";
import Tabs from "../../components/main/Tabs";
import {
  BuildingOfficeIcon,
  CreditCardIcon,
} from "@heroicons/react/20/solid";
import ProgressCircle from "../../components/common/ProgressCircle";
import Search from "../../components/main/Search";

function Library() {
  const [tabs, setTabs] = useState([
    { name: "Matières", icon: BuildingOfficeIcon, current: true },
    { name: "Items", icon: CreditCardIcon, current: false },
  ]);

  const setCurrentTab = (selectedTab) => {
    console.log(selectedTab);
    setTabs(
      tabs.map((tab) => {
        if (selectedTab === tab.name) tab.current = true;
        else tab.current = false;
        return tab;
      })
    );
  };

  const Cat = () => (
    <div className="border-2 rounded-lg min-h-[200px] bg-white p-6 hover:shadow-lg hover:shadow-gray-300 click-action">
      <div className="flex justify-between items-center">
        <div className="w-20 h-20 bg-gray-100 rounded-lg flex flex-col justify-end items-center">
          <img src="/assets/image/card3.svg" alt="card" />
        </div>
        <ProgressCircle r={36} percent={40} />
      </div>
      <div className="mt-4 py-2 text-2xl font-extrabold">Cardiologie</div>
      <div>23 items 278 questions</div>
    </div>
  );
  return (
    <div>
      <div className="text-3xl font-bold">Library</div>
      <Tabs tabs={tabs} setCurrentTab={setCurrentTab} />
      <div className="-mx-4 sm:-mx-6 lg:-mx-8 -mb-8 px-4 sm:px-6 lg:px-8 py-8 bg-gray-50">
        <div className="flex flex-row-reverse"><Search /></div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          <Cat />
          <Cat />
          <Cat />
          <Cat />
          <Cat />
          <Cat />
          <Cat />
          <Cat />
          <Cat />
          <Cat />
          <Cat />
          <Cat />
        </div>
      </div>
    </div>
  );
}

export default Library;
