import React, { useEffect, useState } from "react";
import Tabs from "../../components/main/Tabs";
import Matieres from "../../components/main/library/matieres/Matieres";
import Breadcrumb from "../../components/main/Breadcrumb";
import Items from "../../components/main/library/items/Items";
import { BriefcaseIcon, ClipboardIcon, DocumentIcon, FolderIcon, Square3Stack3DIcon, TagIcon, RectangleGroupIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../providers/authProvider";
import Sessions from "../../components/main/library/sessions/Sessions";
import DPs from "../../components/main/library/dps/DPs";
import Questions from "../../components/main/library/questions/Questions";
import Cards from "../../components/main/library/cards/Cards";
import Tags from "../../components/main/library/tags/Tags";

function LibraryPage() {
  const {user} = useAuth()
  const [tabs, setTabs] = useState(user.role ==="admin" ? [
    { name: "Matières", icon: BriefcaseIcon, current: true },
    { name: "Items", icon: FolderIcon, current: false },
    { name: "Cards", icon: ClipboardIcon, current: false },
    { name: "Tags", icon: TagIcon, current: false },
    { name: "Sessions", icon: Square3Stack3DIcon, current: false },
    { name: "DPs", icon: RectangleGroupIcon, current: false },
    { name: "Questions", icon: DocumentIcon, current: false },
  ] :[
    { name: "Matières", icon: BriefcaseIcon, current: true },
    { name: "Items", icon: FolderIcon, current: false },
  ]);

  const setCurrentTab = (selectedTab) => {
    setTabs(
      tabs.map((tab) => {
        if (selectedTab === tab.name) tab.current = true;
        else tab.current = false;
        return tab;
      })
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pages = [
    { name: 'Library', href: '/library/', current: true },
  ]
  return (
    <div>
      <div className="-mt-4 mb-6">
        <Breadcrumb pages={pages}/>
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
      {tabs.find((tab) => tab.current).name === "Matières" && (<Matieres />)}
      {tabs.find((tab) => tab.current).name === "Items" && (<Items />)}
      {tabs.find((tab) => tab.current).name === "Cards" && (<Cards />)}
      {tabs.find((tab) => tab.current).name === "Tags" && (<Tags />)}
      {tabs.find((tab) => tab.current).name === "Sessions" && (<Sessions />)}
      {tabs.find((tab) => tab.current).name === "DPs" && (<DPs />)}
      {tabs.find((tab) => tab.current).name === "Questions" && (<Questions />)}
    </div>
  );
}

export default LibraryPage;
