import { Link } from "react-router-dom";
import Search from "../../Search";
import Filter from "../../Filter";
import {
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
import { useQuiz } from "../../../../hooks/useQuiz";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Questions() {
  const {setOpenTakeTestModal} = useQuiz();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const authHttpClient = useAuthHttpClient();
  const [openNewItemModal, setOpenNewQuestionModal] = useState(false);
  const [openEditItemModal, setOpenEditItemModal] = useState(false);
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await authHttpClient.get("/question");
        setQuestions(response.data.data.filter(question=> !!question.matiere_id));
        console.log(response.data.data);
        // setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-8 -mb-8 px-4 sm:px-6 lg:px-8 py-8 bg-gray-50">
      {user.role === "admin" && (
        <>
          <div className="inline-block min-w-full align-middle">
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => {
                  setOpenNewQuestionModal(true);
                }}
                className="click-action inline-flex justify-between border-2 border-gray-300 items-center gap-x-1.5 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold hover:text-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:outline-primary-600"
              >
                <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                Add New Question
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
                    Matiere
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Item
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Cards
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Tags
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
                {questions.map((question) => (
                  <tr key={question._id} className="even:bg-gray-50">
                    <td className="font-extrabold py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6 flex questions-center gap-2">
                      {question.question_number}
                    </td>
                    <td className=" px-3 py-4 text-sm text-gray-500">
                      {question.matiere_id?.name}
                    </td>
                    <td className=" px-3 py-4 text-sm text-gray-500">
                      { question.item_id && `${question.item_id?.item_number}. ${question.item_id?.name}`}
                    </td>
                    <td className=" px-3 py-1 text-sm text-gray-500">
                      <div className="flex flex-wrap">
                        {question.cards.map((card) => (
                          <div
                            key={card._id}
                            className="px-2 m-1 max-w-fit border border-gray-400 rounded-md text-[12px]"
                          >
                            {card.name}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className=" px-3 py-1 text-sm text-gray-500 ">
                      <div className="flex flex-wrap">
                        {question.tags.map((tag) => (
                          <div
                            key={tag._id}
                            className="px-2 m-1 max-w-fit border border-gray-400 rounded-md text-[12px]"
                          >
                            {tag.name}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="relative  py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <Link
                        href="#"
                        onClick={() => {
                          setSelectedQuestion(question);
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
                        onClick={() => {setOpenTakeTestModal(true)}}
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
          <AddNewItemModal />
          {/* <EditItemModal /> */}
          <DeleteConformModal />
        </>
      )}
    </div>
  );

  function AddNewItemModal() {
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
          const response = await authHttpClient.get(`/Matiere/`);
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
    const [selectedCards, setSelectedCards] = useState([]);
    const [cardQuery, setCardQuery] = useState("");
    const filteredCards =
      cardQuery === ""
        ? cards
        : cards.filter((card) => {
            return card.name.toLowerCase().includes(cardQuery.toLowerCase());
          });
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
    const [newQuestion, setNewQuestion] = useState({});
    useEffect(() => {
      setNewQuestion({
        // question_number: "",
        question: "",
        answers: Array(5).fill({
          choice: "",
          desc: "",
          answer: false,
        }),
        comment: "",
        matiere_id: "",
        item_id: "",
        tags: [],
        cards: [],
      });
    }, []);
    const [n_choices, setN_choices] = useState(5);
    const [questionTypes, setQuestionTypes] = useState([
      {
        type: "Basic question",
        selected: true,
        n: 5,
        modelType: "MultiChoice",
      },
      { type: "QROC", selected: false, n: 3, modelType: "ShortAnswer" },
      {
        type: "Long question",
        selected: false,
        n: 12,
        modelType: "MultiChoice",
      },
    ]);

    useEffect(() => {
      setNewQuestion((newQuestion) => {
        return {
          ...newQuestion,
          matiere_id: selectedMatiere?._id,
          item_id: selectedItem?._id,
          tags: selectedTags.map((tag) => tag._id),
          cards: selectedCards.map((card) => card._id),
          question_number: 0,
        };
      });
    }, [selectedMatiere, selectedItem, selectedTags, selectedCards]);

    const changeType = ({ type, selected, n }) => {
      if (selected) return;
      setN_choices(n);
      setNewQuestion((question) => ({
        ...question,
        answers: Array(n).fill(
          type === "Basic question" || type === "Long question"
            ? {
                choice: "",
                desc: "",
                answer: false,
              }
            : ""
        ),
      }));
      setQuestionTypes((questionTypes) => {
        return questionTypes.map((questionType) => ({
          ...questionType,
          selected: questionType.type === type,
        }));
      });
    };
    const plusN_choices = () => {
      const temp_question = newQuestion;
      temp_question.answers.push(
        questionTypes.find((_) => _.selected).type === "Basic question" ||
          questionTypes.find((_) => _.selected).type === "Long question"
          ? {
              choice: "",
              desc: "",
              answer: false,
            }
          : ""
      );
      setNewQuestion(temp_question);
      setN_choices(n_choices + 1);
    };
    const minusN_choices = () => {
      if (n_choices < 2) return;
      setN_choices(n_choices - 1);
      const temp_question = newQuestion;
      temp_question.answers.pop();
      setNewQuestion(temp_question);
    };
    const handleSubmit = async (e) => {
      setIsUploading(true);
      try {
        const response = await authHttpClient.post("/question/", {
          question: newQuestion,
          type: questionTypes.find((_) => _.selected).modelType,
        });
        setIsUploading(false);
        setOpenNewQuestionModal(false);
        console.log(response.data.data);
        setQuestions([
          ...questions,
          {
            ...newQuestion,
            _id: response.data.data._id,
            matiere_id: selectedMatiere,
            item_id: selectedItem,
            cards: selectedCards,
            tags: selectedTags,
          },
        ]);
      } catch (error) {
        setIsUploading(false);
        console.log(error);
      }
    };

    return (
      <Modal open={openNewItemModal} setOpen={setOpenNewQuestionModal}>
        <div className="p-10 border-2 border-gray-500 rounded-lg bg-white sm:w-[900px]">
          <div className="text-xl flex justify-center font-bold">Create QI</div>
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
            Question
          </label>
          <div className="mt-2 flex flex-wrap justify-between items-center gap-2">
            {/* question type */}
            <div className="flex rounded-lg border border-gray-300 shadow-sm text-sm font-bold divide-x divide-gray-300">
              {questionTypes.map(({ type, selected, n }) => (
                <div
                  onClick={() => changeType({ type, selected, n })}
                  className="flex gap-2 items-center min-w-fit px-4 py-2 border-gray-300 hover:cursor-pointer hover:bg-gray-100"
                >
                  <div
                    className={classNames(
                      `w-4 h-4 rounded-full border-2 border-gray-400`,
                      selected && "bg-gray-400"
                    )}
                  />
                  {type}
                </div>
              ))}
            </div>
            {/* number of answers */}
            <div className="flex items-center gap-2">
              <div className="text-center max-w-fit">Number of answers</div>
              <div className="flex items-center rounded-lg border border-gray-300 shadow-sm text-sm font-bold divide-x divide-gray-300">
                <div
                  className="flex items-center min-w-fit p-2 border-gray-300 hover:cursor-pointer hover:bg-gray-100 rounded-l-lg"
                  onClick={() => minusN_choices()}
                >
                  <MinusIcon className="h-5" />
                </div>
                <div className="flex items-center min-w-fit px-4 py-2 border-gray-300 hover:cursor-pointer hover:bg-gray-100">
                  {n_choices}
                </div>
                <div
                  className="flex items-center min-w-fit p-2 border-gray-300 hover:cursor-pointer hover:bg-gray-100 rounded-r-lg"
                  onClick={() => plusN_choices()}
                >
                  <PlusIcon className="h-5" />
                </div>
              </div>
            </div>
          </div>
          <div className="my-2 flex gap-2">
            <textarea
              type="text"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
              value={newQuestion.question}
              placeholder="Type the question here..."
              onChange={(e) => {
                setNewQuestion(() => ({
                  ...newQuestion,
                  question: e.target.value,
                }));
              }}
            />
          </div>
          {/* <div className="h-[1px] bg-gray-300 my-4 -mx-6"/> */}
          {/* answers */}
          {(questionTypes.find((_) => _.selected).type === "Basic question" ||
            questionTypes.find((_) => _.selected).type === "Long question") && (
            <div className="text-left my-2 ml-2 flex flex-col gap-2 text-sm">
              {newQuestion.answers?.map(({ choice, desc, answer }, index) => (
                <div key={index} className="mt-2 w-full">
                  Proposition {String.fromCharCode("A".charCodeAt(0) + index)}
                  <div className="flex gap-2">
                    <div className="mt-2.5">
                      <input
                        type="checkbox"
                        checked={answer}
                        className="h-5 w-5 mx-2 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                        onChange={(e) => {
                          setNewQuestion({
                            ...newQuestion,
                            answers: newQuestion.answers.map((_, _i) => {
                              if (_i === index) {
                                return {
                                  ..._,
                                  answer: e.target.checked,
                                };
                              }
                              return _;
                            }),
                          });
                        }}
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 my-1">
                      <div>
                        <input
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                          type="text"
                          value={choice}
                          onChange={(e) => {
                            setNewQuestion({
                              ...newQuestion,
                              answers: newQuestion.answers.map((_, _i) => {
                                if (_i === index) {
                                  return {
                                    ..._,
                                    choice: e.target.value,
                                  };
                                }
                                return _;
                              }),
                            });
                          }}
                        />
                      </div>
                      <div>
                        <textarea
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 bg-gray-100"
                          type="text"
                          value={desc}
                          onChange={(e) => {
                            setNewQuestion({
                              ...newQuestion,
                              answers: newQuestion.answers.map((_, _i) => {
                                if (_i === index)
                                  return {
                                    ..._,
                                    desc: e.target.value,
                                  };
                                return _;
                              }),
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {questionTypes.find((_) => _.selected).type === "QROC" && (
            <div className="my-2 text-left text-sm">
              Answer
              <div className="my-2 grid grid-cols-3 gap-2">
                {newQuestion.answers?.map((answer, index) => (
                  <div key={index} className="min-w-fit">
                    <input
                      className="w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      type="text"
                      value={answer}
                      onChange={(e) => {
                        setNewQuestion({
                          ...newQuestion,
                          answers: newQuestion.answers.map((_, _i) => {
                            if (_i === index) return e.target.value;
                            return _;
                          }),
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          <label className="mt-2 text-left block text-sm font-medium leading-6 text-gray-900">
            Commentaire
          </label>
          <div className="my-2 flex gap-2">
            <textarea
              type="text"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 bg-gray-100"
              value={newQuestion.comment}
              onChange={(e) => {
                setNewQuestion(() => ({
                  ...newQuestion,
                  comment: e.target.value,
                }));
              }}
            />
          </div>
          <Combobox
            as="div"
            value={selectedCards}
            onChange={setSelectedCards}
            multiple
          >
            <Combobox.Label className="text-left block text-sm font-medium leading-6 text-gray-900">
              Select Cards
            </Combobox.Label>
            <div className="flex gap-2">
              <div className="relative mt-2 max-w-fit">
                <Combobox.Input
                  className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  onChange={(event) => setCardQuery(event.target.value)}
                  // displayValue={(items) => { return items.map((item) => item.name).join(", "); }}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>

                {filteredCards.length > 0 && (
                  <Combobox.Options className="absolute z-50 mt-1 max-h-52 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredCards.map((card) => (
                      <Combobox.Option
                        key={card._id}
                        value={card}
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
                                {card.name}
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
                  {selectedCards.map((card) => (
                    <div
                      className="px-2  hover:text-red-900 hover:border-red-900 hover:cursor-pointer min-w-fit border border-gray-400 rounded-md text-[12px]"
                      onClick={() =>
                        setSelectedCards(
                          selectedCards.filter(
                            (selectedCard) => selectedCard._id !== card._id
                          )
                        )
                      }
                    >
                      {card.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Combobox>

          <div className="mt-12 m-4 flex flex-row-reverse">
            <button
              onClick={() => {
                handleSubmit();
              }}
              type="button"
              className="click-action inline-flex justify-between border border-gray-300 items-center gap-x-1.5 rounded-md bg-primary-600 text-white px-2.5 py-1.5 text-sm font-semibol focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:outline-primary-600"
            >
              {isUploading && <Spinner small />}Upload QI
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
          `/question/${selectedQuestion._id}`
        );
        setDeleting(false);
        setOpenDeleteConfirmModal(false);
        setQuestions((questions) =>{
          return questions.filter((item) => 
            item._id !== selectedQuestion._id
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
            Do you really want to delete this question?
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
