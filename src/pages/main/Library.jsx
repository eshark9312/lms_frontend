import React, { useState } from "react";
import Tabs from "../../components/main/Tabs";
import { BuildingOfficeIcon, CreditCardIcon } from "@heroicons/react/20/solid";
import Matieres from "../../components/main/library/Matieres";
import Breadcrumb from "../../components/main/Breadcrumb";
import Items from "../../components/main/library/Items";

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

  return (
    <div>
      <div className="-mt-4 mb-6">
        <Breadcrumb />
      </div>
      <div className="flex justify-between">
        <div className="text-3xl font-bold">Library</div>
        <div className="flex gap-4 -my-2">
          <div className="text-xl text-primary-600">
            36 <div className="text-sm text-gray-500">Matières disponibles</div>
          </div>
          <div className="text-xl text-primary-600">
            365 <div className="text-sm text-gray-500">items disponibles</div>
          </div>
        </div>
      </div>
      <Tabs tabs={tabs} setCurrentTab={setCurrentTab} />
      {tabs.find((tab) => tab.current).name === "Matières" ? (
        <Matieres />
      ) : (
       <Items />
      )}
    </div>
  );
}

export default Library;
