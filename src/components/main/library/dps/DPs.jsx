import { Link } from "react-router-dom";
import Search from "../../Search";
import Filter from "../../Filter";
import {
  ArrowDownIcon,
  Bars3Icon,
  ChevronDownIcon,
  ChevronUpIcon,
  MinusIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import useAuthHttpClient from "../../../../hooks/useAuthHttpClient";
import { useAuth } from "../../../../providers/authProvider";
import Modal from "../../../common/Modal";
import { Spinner } from "../../../icons/Spinner";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox, Switch } from "@headlessui/react";
import QuestionForm from "./QuestionForm";

const questionTypes = [
  { type: "Basic question", n: 5, modelType: "MultiChoice" },
  { type: "QROC", n: 3, modelType: "ShortAnswer" },
  { type: "Long question", n: 12, modelType: "MultiChoice" },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function DPs() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const authHttpClient = useAuthHttpClient();
  const [openNewItemModal, setOpenNewDPModal] = useState(false);
  const [openEditItemModal, setOpenEditItemModal] = useState(false);
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [dps, setDps] = useState([]);
  const [selectedDp, setSelectedDp] = useState(null);

  useEffect(() => {
    const fetchDPs = async () => {
      try {
        const response = await authHttpClient.get("/dp");
        setDps(response.data.data);
        // setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDPs();
  }, []);

  const createDP = ()=>{
    var win = window.open("/addDP/", '_blank');
    win.focus();
  }
  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-8 -mb-8 px-4 sm:px-6 lg:px-8 py-8 bg-gray-50">
      {user.role === "admin" && (
        <>
          <div className="inline-block min-w-full align-middle">
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => {
                  createDP();
                }}
                className="click-action inline-flex justify-between border-2 border-gray-300 items-center gap-x-1.5 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold hover:text-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:outline-primary-600"
              >
                <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                Add New DP
              </button>
              <div className="flex items-center space-x-2">
                <Search />
                <Filter />
              </div>
            </div>
            <table className="my-4 min-w-full divide-y divide-gray-300 rounded-lg border-2 border-gray-400">
              <thead className="divide-y divide-gray-200 bg-white rounded">
                <tr>
                  <th
                    scope="col"
                    className="min-w-[80px] py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 flex items-center gap-2"
                  >
                    <div>ID</div>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Session
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Matiere
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Item
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Delete</span>
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Test</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {dps.map((dp) => (
                  <tr key={dp._id} className="even:bg-gray-50">
                    <td className="font-extrabold py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6 gap-2">
                      {dp.dp_number}
                    </td>
                    <td className=" px-3 py-4 text-sm text-gray-500 w-1/4 whitespace-nowrap  max-w-xs flex-auto truncate ">
                      {dp.desc}
                    </td>
                    <td className=" px-3 py-4 text-sm text-gray-500">
                      {dp.session_id?.name}
                    </td>
                    <td className=" px-3 py-4 text-sm text-gray-500">
                      {dp.matiere_id.name}
                    </td>
                    <td className=" px-3 py-4 text-sm text-gray-500">
                      {dp.item_id && `${dp.item_id.item_number}. ${dp.item_id.name}`}
                    </td>
                    <td className="relative  py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <Link
                        href="#"
                        onClick={() => {
                          setSelectedDp(dp);
                          setOpenDeleteConfirmModal(true);
                        }}
                        className="text-red-600 hover:text-primary-900"
                      >
                        <TrashIcon className="w-5 h-5 stroke-2" />
                      </Link>
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
                ))}
              </tbody>
            </table>
          </div>
          {/* <AddNewDPModal /> */}
          {/* <EditItemModal /> */}
          <DeleteConformModal />
        </>
      )}
    </div>
  );

  function AddNewDPModal() {
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const [sessionQuery, setSessionQuery] = useState("");
    const filteredSessions =
      sessionQuery === ""
        ? sessions
        : sessions.filter((session) => {
            return session.name
              .toLowerCase()
              .includes(sessionQuery.toLowerCase());
          });
    useEffect(() => {
      const fetchSessions = async () => {
        try {
          const response = await authHttpClient.get(`/session/`);
          setSessions(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchSessions();
    }, []);

    const [matieres, setMatieres] = useState([]);
    const [selectedMatiere, setSelectedMatiere] = useState(null);
    const [matiereQuery, setMatiereQuery] = useState("");
    const filteredMatieres =
      matiereQuery === ""
        ? matieres
        : matieres.filter((matiere) => {
            return matiere.name
              .toLowerCase()
              .includes(matiereQuery.toLowerCase());
          });
    useEffect(() => {
      const fetchMatieres = async () => {
        try {
          const response = await authHttpClient.get(`/matiere/`);
          setMatieres(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchMatieres();
    }, []);

    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [itemQuery, setItemQuery] = useState("");
    const filteredItems =
      itemQuery === ""
        ? items
        : items.filter((item) => {
            return item.name.toLowerCase().includes(itemQuery.toLowerCase());
          });
    useEffect(() => {
      const fetchItems = async () => {
        try {
          const response = await authHttpClient.post(`/item/filter/`, {
            matiere_id: selectedMatiere._id,
          });
          setItems(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
      if (selectedMatiere) fetchItems();
    }, [selectedMatiere]);

    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [tagQuery, setTagQuery] = useState("");
    const filteredTags =
      tagQuery === ""
        ? tags
        : tags.filter((tag) => {
            return tag.name.toLowerCase().includes(tagQuery.toLowerCase());
          });
    useEffect(() => {
      const fetchTags = async () => {
        try {
          const response = await authHttpClient.get(`/tag/`);
          setTags(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchTags();
    }, []);

    const [cards, setCards] = useState([]);
    useEffect(() => {
      const fetchCards = async () => {
        try {
          const response = await authHttpClient.get(`/card/`);
          setCards(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchCards();
    }, []);

    const [isUploading, setIsUploading] = useState(false);
    const [newDP, setNewDP] = useState({});
    const [idx, setIdx] = useState(0);
    const [n_questions, setN_questions] = useState(5);
    const [selectedQuestion, setSelectedQuestion] = useState({
      type: "Basic question",
      question: "",
      answers: Array(5).fill({
        choice: "",
        desc: "",
        answer: false,
      }),
      comment: "",
      cards: [],
    });
    const changeQuestionForm = (question) => {
      setNewDP({
        ...newDP,
        questions: [
          ...newDP.questions.slice(0, idx),
          question,
          ...newDP.questions.slice(idx + 1),
        ],
      });
      setSelectedQuestion({ ...question });
    };

    useEffect(() => {
      if (n_questions > idx) return;
      setIdx(n_questions - 1);
      setSelectedQuestion(newDP.questions[n_questions - 1]);
    }, [n_questions, idx]);

    useEffect(() => {
      setNewDP(() => ({
        matiere_id: "",
        item_id: "",
        tags: [],
        desc: "",
        questions: Array(5).fill({
          type: "Basic question",
          question: "",
          answers: Array(5).fill({
            choice: "",
            desc: "",
            answer: false,
          }),
          comment: "",
          cards: [],
        }),
      }));
    }, []);

    useEffect(() => {
      // if(selectedMatiere && selectedItem && selectedTags.length)
      setNewDP((newDP) => ({
        ...newDP,
        session_id: selectedSession?._id,
        matiere_id: selectedMatiere?._id,
        item_id: selectedItem?._id,
        tags: selectedTags.map((tag) => tag._id),
      }));
    }, [selectedMatiere, selectedItem, selectedTags, selectedSession]);

    const increaseQuestions = () => {
      const temp_DP = { ...newDP };
      temp_DP.questions.push({
        type: "Basic question",
        question: "",
        answers: Array(5).fill({
          choice: "",
          desc: "",
          answer: false,
        }),
        comment: "",
        cards: [],
      });
      setNewDP(temp_DP);
      setN_questions(n_questions + 1);
    };

    const decreaseQuestions = () => {
      if (newDP.questions.length < 2) return;
      const temp_DP = { ...newDP };
      temp_DP.questions.pop();
      setNewDP(temp_DP);
      setN_questions(n_questions - 1);
    };
    
    const handleSubmit = async (e) => {
      setIsUploading(true);
      const temp_DP = { ...newDP };
      temp_DP.questions = temp_DP.questions.map((question) => ({
        ...question,
        type: questionTypes.find(({ type }) => type === question.type)
          .modelType,
      }));
      try {
        const response = await authHttpClient.post("/dp/", temp_DP);
        setIsUploading(false);
        setOpenNewDPModal(false);
        // console.log(response.data.data);
        setDps([
          ...dps,
          {
            ...newDP,
            dp_number: response.data.data.dp_number,
            _id: response.data.data._id,
            matiere_id: selectedMatiere,
            item_id: selectedItem,
            session_id: selectedSession,
            tags: selectedTags,
          },
        ]);
      } catch (error) {
        setIsUploading(false);
        console.log(error);
      }
    };
    // console.log(newDP);
    return (
      <Modal open={openNewItemModal} setOpen={setOpenNewDPModal}>
        <div className="p-10 border-2 border-gray-500 rounded-lg bg-white sm:w-[900px]">
          <div className="text-xl flex justify-center font-bold">Create DP</div><div className="grid grid-cols-1 sm:grid-cols-2 my-2 gap-2">
            {/*   select session   */}
            <Combobox
              as="div"
              value={selectedSession}
              onChange={setSelectedSession}
            >
              <Combobox.Label className="text-left block text-sm font-medium leading-6 text-gray-900">
                Select Session
              </Combobox.Label>
              <div className="relative mt-2">
                <Combobox.Input
                  className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  onChange={(event) => setSessionQuery(event.target.value)}
                  displayValue={(session) => session?.name}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                  />
                </Combobox.Button>

                {filteredSessions.length > 0 && (
                  <Combobox.Options className="absolute z-50 mt-1 max-h-52 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredSessions.map((session) => (
                      <Combobox.Option
                        key={session._id}
                        value={session}
                        className={({ active }) =>
                          classNames(
                            "relative cursor-default select-none py-2 pl-3 pr-9",
                            active
                              ? "bg-primary-600 text-white"
                              : "text-gray-900"
                          )
                        }
                      >
                        {({ active, selected }) => (
                          <>
                            <div className="flex items-center">
                              <span
                                className={classNames(
                                  "ml-3 truncate",
                                  selected && "font-semibold"
                                )}
                              >
                                {session.name}
                              </span>
                            </div>

                            {selected && (
                              <span
                                className={classNames(
                                  "absolute inset-y-0 right-0 flex items-center pr-4",
                                  active ? "text-white" : "text-primary-600"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}
              </div>
            </Combobox>
            </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 my-2 gap-2">
            {/*   select matiere   */}
            <Combobox
              as="div"
              value={selectedMatiere}
              onChange={setSelectedMatiere}
            >
              <Combobox.Label className="text-left block text-sm font-medium leading-6 text-gray-900">
                Select Matiere
              </Combobox.Label>
              <div className="relative mt-2">
                <Combobox.Input
                  className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  onChange={(event) => setMatiereQuery(event.target.value)}
                  displayValue={(matiere) => matiere?.name}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>

                {filteredMatieres.length > 0 && (
                  <Combobox.Options className="absolute z-50 mt-1 max-h-52 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredMatieres.map((matiere) => (
                      <Combobox.Option
                        key={matiere._id}
                        value={matiere}
                        className={({ active }) =>
                          classNames(
                            "relative cursor-default select-none py-2 pl-3 pr-9",
                            active
                              ? "bg-primary-600 text-white"
                              : "text-gray-900"
                          )
                        }
                      >
                        {({ active, selected }) => (
                          <>
                            <div className="flex items-center">
                              <img
                                src={matiere.image}
                                alt={matiere.name}
                                className="h-6 w-6 flex-shrink-0 rounded-full"
                              />
                              <span
                                className={classNames(
                                  "ml-3 truncate",
                                  selected && "font-semibold"
                                )}
                              >
                                {matiere.name}
                              </span>
                            </div>

                            {selected && (
                              <span
                                className={classNames(
                                  "absolute inset-y-0 right-0 flex items-center pr-4",
                                  active ? "text-white" : "text-primary-600"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}
              </div>
            </Combobox>
            {/*   select item    */}
            <Combobox as="div" value={selectedItem} onChange={setSelectedItem}>
              <Combobox.Label className="text-left block text-sm font-medium leading-6 text-gray-900">
                Select Item
              </Combobox.Label>
              <div className="relative mt-2">
                <Combobox.Input
                  className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  onChange={(event) => setItemQuery(event.target.value)}
                  displayValue={(item) => item?.name}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>

                {filteredItems.length > 0 && (
                  <Combobox.Options className="absolute z-50 mt-1 max-h-52 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredItems.map((item) => (
                      <Combobox.Option
                        key={item._id}
                        value={item}
                        className={({ active }) =>
                          classNames(
                            "relative cursor-default select-none py-2 pl-3 pr-9",
                            active
                              ? "bg-primary-600 text-white"
                              : "text-gray-900"
                          )
                        }
                      >
                        {({ active, selected }) => (
                          <>
                            <div className="flex items-center">
                              <span
                                className={classNames(
                                  "ml-3 truncate",
                                  selected && "font-semibold"
                                )}
                              >
                                {item.name}
                              </span>
                            </div>

                            {selected && (
                              <span
                                className={classNames(
                                  "absolute inset-y-0 right-0 flex items-center pr-4",
                                  active ? "text-white" : "text-primary-600"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}
              </div>
            </Combobox>
          </div>
          {/*   select tags   */}
          <Combobox
            as="div"
            value={selectedTags}
            onChange={setSelectedTags}
            multiple
          >
            <Combobox.Label className="text-left block text-sm font-medium leading-6 text-gray-900">
              Select Tags
            </Combobox.Label>
            <div className="flex gap-2">
              <div className="relative mt-2 max-w-fit">
                <Combobox.Input
                  className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  onChange={(event) => setTagQuery(event.target.value)}
                  // displayValue={(items) => { return items.map((item) => item.name).join(", "); }}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>

                {filteredTags.length > 0 && (
                  <Combobox.Options className="absolute z-50 mt-1 max-h-52 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredTags.map((tag) => (
                      <Combobox.Option
                        key={tag._id}
                        value={tag}
                        className={({ active }) =>
                          classNames(
                            "relative cursor-default select-none py-2 pl-3 pr-9",
                            active
                              ? "bg-primary-600 text-white"
                              : "text-gray-900"
                          )
                        }
                      >
                        {({ active, selected }) => (
                          <>
                            <div className="flex items-center">
                              <span
                                className={classNames(
                                  "ml-3 truncate",
                                  selected && "font-semibold"
                                )}
                              >
                                {tag.name}
                              </span>
                            </div>

                            {selected && (
                              <span
                                className={classNames(
                                  "absolute inset-y-0 right-0 flex items-center pr-4",
                                  active ? "text-white" : "text-primary-600"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}
              </div>
              <div className="mt-1.5 flex-1 rounded-lg border-dashed border-2 border-gray-200 p-2">
                <div className="flex gap-2 flex-wrap ">
                  {selectedTags.map((tag) => (
                    <div
                      className="px-2  hover:text-red-900 hover:border-red-900 hover:cursor-pointer min-w-fit border border-gray-400 rounded-md text-[12px]"
                      onClick={() =>
                        setSelectedTags(
                          selectedTags.filter(
                            (selectedTag) => selectedTag._id !== tag._id
                          )
                        )
                      }
                    >
                      {tag.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Combobox>
          <label className="mt-4 text-left block text font-bold leading-6 text-gray-900">
            Description
          </label>
          <textarea
            type="text"
            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
            value={newDP.desc}
            placeholder="Type the DP here..."
            onChange={(e) => {
              const tempDP = { ...newDP };
              tempDP.desc = e.target.value;
              setNewDP(tempDP);
            }}
          />
          <label className="mt-4 text-left block text font-bold leading-6 text-gray-900">
            Number of questions
          </label>
          <div className="mt-2 max-w-fit flex items-center rounded-lg border border-gray-300 shadow-sm text-sm font-bold divide-x divide-gray-300">
            <div
              className="flex items-center min-w-fit p-2 border-gray-300 hover:cursor-pointer hover:bg-gray-100 rounded-l-lg"
              onClick={() => decreaseQuestions()}
            >
              <MinusIcon className="h-5" />
            </div>
            <div className="flex items-center min-w-fit px-4 py-2 border-gray-300 hover:cursor-pointer hover:bg-gray-100">
              {n_questions}
            </div>
            <div
              className="flex items-center min-w-fit p-2 border-gray-300 hover:cursor-pointer hover:bg-gray-100 rounded-r-lg"
              onClick={() => increaseQuestions()}
            >
              <PlusIcon className="h-5" />
            </div>
          </div>
          {newDP.questions && (
            <div className="isolate inline-flex py-4 flex-wrap gap-2">
              {newDP.questions.map((_, i) => (
                <div
                  className={classNames(
                    "hover:cursor-pointer relative inline-flex items-center justify-center w-11 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300",
                    idx === i && "bg-primary-600 text-white"
                  )}
                  onClick={() => {
                    setIdx(i);
                    setSelectedQuestion(newDP.questions[i]);
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          )}
          <div className="h-[1px] bg-gray-300 my-4 -mx-10" />
          <label className="mt-4 text-left block text font-bold leading-6 text-gray-900">
            Question {idx + 1}
          </label>
          {selectedQuestion && (
            <QuestionForm
              selectedQuestion={selectedQuestion}
              setSelectedQuestion={changeQuestionForm}
              cards={cards}
            />
          )}

          <div className="mt-12 m-4 flex flex-row-reverse">
            <button
              onClick={() => {
                handleSubmit();
              }}
              type="button"
              className="click-action inline-flex justify-between border border-gray-300 items-center gap-x-1.5 rounded-md bg-primary-600 text-white px-2.5 py-1.5 text-sm font-semibol focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:outline-primary-600"
            >
              {isUploading && <Spinner small />}Upload DP
            </button>
          </div>
        </div>
      </Modal>
    );
  }
  
  function DeleteConformModal(){
    const [deleting, setDeleting] = useState(false);
    const handleSubmit = async (e) => {
      setDeleting(true);
      try {
        await authHttpClient.delete(
          `/dp/${selectedDp._id}`
        );
        setDeleting(false);
        setOpenDeleteConfirmModal(false);
        setDps((questions) =>{
          return questions.filter((item) => 
            item._id !== selectedDp._id
          );
        });
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <Modal open={openDeleteConfirmModal} setOpen={setOpenDeleteConfirmModal}>
        <div className="mt-20 p-6 border-2 border-gray-500 rounded-lg bg-white sm:w-[400px]">
          <label
            htmlFor="matiere"
            className="block text-sm font-medium leading-6 text-gray-900 text-left"
          >
            Do you really want to delete this DP?
          </label>
          <div className="mt-4 flex flex-row-reverse">
            <button
              onClick={() => {
                handleSubmit();
              }}
              type="button"
              className="click-action inline-flex justify-between border border-gray-300 items-center gap-x-1.5 rounded-md bg-red-600 text-white px-2.5 py-1.5 text-sm font-semibol focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:outline-primary-600"
            >
              {deleting && <Spinner small />} Delete
            </button>
          </div>
        </div>
      </Modal>
    );
  }

}
