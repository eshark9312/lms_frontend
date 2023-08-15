import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import useAuthHttpClient from "../../../hooks/useAuthHttpClient";
import { Spinner } from "../../icons/Spinner";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function AddNewCardSlide({ open, setOpen, setCards }) {
  const authHttpClient = useAuthHttpClient();
  const [isUploading, setIsUploading] = useState(false);
  const [card, setCard] = useState({});

  useEffect(()=>{
    setCard({
      name: "",
      def: "",
      title: "",
      content: "",
      instruction: "",
      image: "",
      image_desc: "",
    })
  },[])
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await authHttpClient.get(`/item/`);
        setItems(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  }, []);
  const handleSubmit = async (e) => {
    setIsUploading(true);
    try {
      const response = await authHttpClient.post("/card", {
        ...card,
        items: selectedItems.map((item) => item._id),
      });
      setIsUploading(false);
      setOpen(false);
      setCards((cards)=>[
        ...cards,
        {
          _id: response.data.data.id,
          ...card,
          items: selectedItems,
        },
      ]);
    } catch (error) {
      setIsUploading(false);
      console.log(error);
    }
  };
  const convert = (e) => {
    if (e.target.files[0].size > 2000000) {
      console.log("File too large");
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setCard({
        ...card,
        image: reader.result,
      });
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };
  const [selectedItems, setSelectedItems] = useState([]);

  const [query, setQuery] = useState("");
  const filteredItems =
    query === ""
      ? items
      : items.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-800 bg-opacity-90 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="leading-6 text-gray-900 font-extrabold text-lg">
                          <input
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                            value={card.name}
                            onChange={(e) => {
                              setCard((card) => ({
                                ...card,
                                name: e.target.value,
                              }));
                            }}
                          />
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-2 flex-1 px-4 sm:px-6">
                      <div className="text-sm">
                        <Combobox
                          as="div"
                          value={selectedItems}
                          onChange={setSelectedItems}
                          multiple
                        >
                          <Combobox.Label className="text-left block text-sm font-medium leading-6 text-gray-900">
                            Select Items
                          </Combobox.Label>

                          {selectedItems.length > 0 && (
                            <div className="flex gap-2 flex-wrap my-2">
                              {selectedItems.map((item) => (
                                <div
                                  className="px-2  hover:text-red-900 hover:border-red-900 hover:cursor-pointer min-w-fit border border-gray-400 rounded-md text-[12px]"
                                  onClick={() =>
                                    setSelectedItems(
                                      selectedItems.filter(
                                        (selectedItem) =>
                                          selectedItem._id !== item._id
                                      )
                                    )
                                  }
                                >
                                  {item.item_number}. {item.name}
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="relative mt-2">
                            <Combobox.Input
                              placeholder="search items..."
                              className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                              onChange={(event) => setQuery(event.target.value)}
                              // displayValue={(items) => { return items.map((item) => item.name).join(", "); }}
                            />
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                              <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </Combobox.Button>

                            {filteredItems.length > 0 && (
                              <Combobox.Options className="absolute z-50 mt-1 max-h-52 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {filteredItems.map((matiere) => (
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
                                              active
                                                ? "text-white"
                                                : "text-primary-600"
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
                        <div className="mt-2 first:focus:border-primary-600">
                          <textarea
                            placeholder="Definition"
                            className="w-full min-h-[64px] border rounded-md border-gray-300 focus:border-primary-600"
                            value={card.def}
                            onChange={(e) => {
                              setCard((card) => ({
                                ...card,
                                def: e.target.value,
                              }));
                            }}
                          ></textarea>
                        </div>
                      </div>
                      {/* Separator */}
                      <div
                        className="my-6 block h-px w-full bg-gray-900/10"
                        aria-hidden="true"
                      />
                      <div className="font-bold text-gray-500">
                        <input
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                          value={card.title}
                          placeholder="Title"
                          onChange={(e) => {
                            setCard((card) => ({
                              ...card,
                              title: e.target.value,
                            }));
                          }}
                        />
                      </div>
                      <div className="text-sm text-gray-500">
                        <div className="mt-2 first:focus:border-primary-600">
                          <textarea
                            placeholder="Content"
                            className="w-full min-h-[64px] border rounded-md border-gray-300 focus:border-primary-600"
                            value={card.content}
                            onChange={(e) => {
                              setCard((card) => ({
                                ...card,
                                content: e.target.value,
                              }));
                            }}
                          ></textarea>
                        </div>
                      </div>
                      <div className="my-4 p-4 rounded bg-gray-100 text-sm text-gray-500 font-extrabold">
                        <div className="first:focus:border-primary-600">
                          <textarea
                            className="w-full min-h-[64px] border rounded-md bg-transparent border-gray-300 focus:border-primary-600"
                            value={card.instruction}
                            onChange={(e) => {
                              setCard((card) => ({
                                ...card,
                                instruction: e.target.value,
                              }));
                            }}
                          ></textarea>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 justify-center items-center">
                        {card.image ? (
                          <img
                            className="mt-2 flex justify-center items-center rounded-lg border border-dashed border-gray-900/25 w-full"
                            alt="CardImage"
                            src={card.image}
                          />
                        ) : (
                          <div className="mt-2 flex justify-center items-center rounded-lg border border-dashed border-gray-900/25 h-32 w-full">
                            <PhotoIcon
                              className="mx-auto h-12 w-12 text-gray-300"
                              aria-hidden="true"
                            />
                          </div>
                        )}
                        <div className="flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative h-fit cursor-pointer rounded-md bg-white font-semibold text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:text-primary-500 px-2"
                          >
                            <span>Upload an image file</span>
                            <input
                              accept="image/*"
                              onChange={convert}
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                            />
                          </label>
                        </div>
                      </div>
                      <i className="text-gray-500">
                        <input
                          type="text"
                          className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                          value={card.image_desc}
                          placeholder="image description"
                          onChange={(e) => {
                            setCard((card) => ({
                              ...card,
                              image_desc: e.target.value,
                            }));
                          }}
                        />
                      </i>
                      <div className="mt-4 flex flex-row-reverse">
                        <button
                          onClick={() => {
                            handleSubmit();
                          }}
                          type="button"
                          className="click-action inline-flex justify-between border border-gray-300 items-center gap-x-1.5 rounded-md bg-primary-600 text-white px-2.5 py-1.5 text-sm font-semibol focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:outline-primary-600"
                        >
                          {isUploading && <Spinner small />}Add Card
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default AddNewCardSlide;
