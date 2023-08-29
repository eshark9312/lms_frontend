import React, { useEffect, useState } from "react";
import {
  ArrowLeftOnRectangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import HomeIcon from "../icons/HomeIcon";
import LibraryIcon from "../icons/LibraryIcon";
import AnnalesIcon from "../icons/AnnalesIcon";
import PlannerIcon from "../icons/PlannerIcon";
import PlaylistIcon from "../icons/PlaylistIcon";
import ToolboxIcon from "../icons/ToolboxIcon";
import SettingsIcon from "../icons/SettingsIcon";
import SupportIcon from "../icons/SupportIcon";
import { Link, NavLink } from "react-router-dom";
import Search from "./GlobalSearch";
import { useAuth } from "../../providers/authProvider";
import useAuthHttpClient from "../../hooks/useAuthHttpClient";
import NewQuickAccessModal from "./NewQuickAccessModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Sidebar() {
  const { user, signout } = useAuth();
  const authHttpClient = useAuthHttpClient();
  const [openNewQuickAccess, setOpenNewQuickAccess] = useState(false);
  const [quickAccessItems, setQuickAccessItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchQuickAccess = async () => {
      setIsLoading(true);
      try {
        const response = await authHttpClient.post(
          `/quickaccess/sidebar/filter`,
          {
            user_id: user._id,
          }
        );
        setQuickAccessItems(response.data.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };
    fetchQuickAccess();
  }, []);
  const navigation =
    user.role === "admin"
      ? [
          { name: "Home", href: "/", icon: HomeIcon },
          { name: "Users", href: "/users/", icon: ToolboxIcon },
          { name: "Library", href: "/library/", icon: LibraryIcon },
          { name: "Analytics", href: "/analytics/", icon: AnnalesIcon },
          { name: "Reports", href: "/reports/", icon: PlannerIcon },
        ]
      : [
          { name: "Home", href: "/", icon: HomeIcon },
          { name: "Library", href: "/library/", icon: LibraryIcon },
          { name: "Annales", href: "/annales/", icon: AnnalesIcon },
          { name: "Planner", href: "/planner/", icon: PlannerIcon },
          { name: "Playlists", href: "/playlists/", icon: PlaylistIcon },
          { name: "Toolbox", href: "/toolbox/", icon: ToolboxIcon },
        ];

  const SidebarQuickAccessItem = ({ id, itemType, matiere_or_item_id }) => {
    const [item, setItem] = useState();
    const [itemImage, setItemImage] = useState();
    const endpoint = itemType === "Matiere" ? "matiere" : "item";
    useEffect(() => {
      const fetchItem = async () => {
        try {
          const response = await authHttpClient.get(
            `/${endpoint}/${matiere_or_item_id}`
          );
          setItem(response.data.data);
          if (response.data.data.image)
            setItemImage(response.data.data.image); // item
          else {
            console.log(itemType);
            const matiere_id = response.data.data.matiere_id;
            const parentMatiere = await authHttpClient.get(
              `/matiere/${matiere_id}`
            );
            setItemImage(parentMatiere.data.data.image);
          }
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      fetchItem();
    }, [endpoint, matiere_or_item_id]);

    const remove = async () => {
      try {
        await authHttpClient.delete(`/quickaccess/sidebar/${id}`);
        setQuickAccessItems((_) => _.filter((_item) => _item._id !== id));
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <div className="flex w-full group relative items-center rounded-md hover:text-primary-600 hover:bg-gray-50">
        <NavLink
          to={`/library/${endpoint}/${matiere_or_item_id}`}
          className={({ isActive }) =>
            classNames(
              isActive ? "bg-gray-50 text-primary-600" : "text-gray-700 ",
              "flex-1 truncate px-2 text-sm flex gap-x-3 p-2 leading-6 font-semibold click-action justify-between items-center"
            )
          }
        >
          <img
            src={itemImage}
            alt={item?.name}
            className="h-6 w-6 flex-shrink-0 rounded-full"
          />
          <div className="flex-1 max-w-full truncate ">
            {item &&
              (itemType === "Matiere"
                ? item.name
                : `${item.item_number}. ${item.name}`)}
          </div>
        </NavLink>
        <div
          onClick={(e) => {
            e.stopPropagation();
            remove();
          }}
          className="hidden group-hover:block right-2 hover:text-red-600 px-2"
        >
          <XMarkIcon className="w-4 h-4" />
        </div>
      </div>
    );
  };

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
      <div className="flex h-16 shrink-0 items-center">
        <img
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=primary&shade=600"
          alt="Your Company"
        />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul className="flex flex-1 flex-col gap-y-7">
          <li>
            <Search />
          </li>
          <li>
            <ul className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? "bg-gray-50 text-primary-600"
                          : "text-gray-700 hover:text-primary-600 hover:bg-gray-50",
                        "group flex gap-x-3 rounded-md p-2 leading-6 font-semibold click-action"
                      )
                    }
                  >
                    <div
                      className="text-inherit group-hover:text-inherit h-6 w-6 shrink-0"
                      aria-hidden="true"
                    >
                      <item.icon />
                    </div>
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
          {user.role === "user" && (
            <li>
              <div className="text-sm font-semibold leading-6 text-gray-500">
                QUICK ACCESS
              </div>
              <ul className="-mx-2 mt-2 space-y-1">
                {quickAccessItems.map((item, index) => (
                  <li>
                    <SidebarQuickAccessItem
                      key={index}
                      id={item._id}
                      itemType={item.MatiereOrItem}
                      matiere_or_item_id={item.matiere_or_item_id}
                    />
                  </li>
                ))}
                <li>
                  <Link
                    onClick={() => {
                      setOpenNewQuickAccess(true);
                    }}
                    className="group flex items-center gap-x-3 rounded-md p-2 leading-6 font-semibold hover:text-primary-600 hover:bg-gray-50 border-gray-500 hover:border-primary-600 text-gray-600 click-action"
                  >
                    <div className="h-8 w-8 grounded flex justify-center items-center border-2 border-inherit rounded border-dashed text-[22px] pb-[1px]">
                      +
                    </div>
                    Add an item
                  </Link>
                </li>
              </ul>
            </li>
          )}
          <li className="mt-auto mb-8">
            <ul className="-mx-2 space-y-1">
              <li>
                <Link className="text-gray-700 hover:text-primary-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 leading-6 font-semibold click-action">
                  <div
                    className="text-gray-500 group-hover:text-primary-600 h-6 w-6 shrink-0"
                    aria-hidden="true"
                  >
                    <SupportIcon />
                  </div>
                  Support
                </Link>
              </li>
              <li>
                <Link className="text-gray-700 hover:text-primary-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 leading-6 font-semibold click-action">
                  <div
                    className="text-gray-500 group-hover:text-primary-600 h-6 w-6 shrink-0"
                    aria-hidden="true"
                  >
                    <SettingsIcon />
                  </div>
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => {
                    signout();
                  }}
                  className="text-gray-700 hover:text-primary-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 leading-6 font-semibold click-action"
                >
                  <div
                    className="text-gray-500 group-hover:text-primary-600 h-6 w-6 shrink-0"
                    aria-hidden="true"
                  >
                    <ArrowLeftOnRectangleIcon className="w-6 h-6" />
                  </div>
                  Log out
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <NewQuickAccessModal
        open={openNewQuickAccess}
        setOpen={setOpenNewQuickAccess}
        isSidebar
        setQuickAccessItems={setQuickAccessItems}
      />
    </div>
  );
}

export default Sidebar;
