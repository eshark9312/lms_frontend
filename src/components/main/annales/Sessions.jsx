import { Link } from "react-router-dom";
import { ProgressBar } from "../../common/ProgressBar";
import Pagination from "../Pagination";
import Search from "../Search";
import Filter from "../Filter";
import {  PlusIcon} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import useAuthHttpClient from "../../../hooks/useAuthHttpClient";
import { useAuth } from "../../../providers/authProvider";
import Session from "./Session"
import { Spinner } from "../../icons/Spinner";

export default function Sessions() {
  const { user } = useAuth();
  const authHttpClient = useAuthHttpClient();
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openNewSessionModal, setOpenNewSessionModal] = useState(false);
  const [openEditSessionModal, setOpenEditSessionModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await authHttpClient.get(`/session/`);
        setSessions(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSessions();
  }, []);

  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-8 -mb-8 px-4 sm:px-6 lg:px-8 py-8 bg-gray-50">
      {isLoading ? (
        <div
          role="status"
          className="h-[70vh] pb-20 flex justify-center items-center"
        >
          <Spinner />
        </div>
      ) : (<div className="inline-block min-w-full align-middle">
        <div className="flex justify-between">
        </div>
        {sessions.map((session, index) => (
          <Session
            index={index}
            session={session}
            editAction={() => {
              setSelectedSession(session);
              setOpenEditSessionModal(true);
            }}
          />
        ))}
      </div>)}
    </div>
  );
}
