/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface Option {
  id: string;
  label: string;
}

interface MainSelectProps {
  options: Option[];
  isMulti?: boolean;
  loading?: boolean;
  closeIcon?: React.ReactNode;
  arrowUp?: React.ReactNode;
  arrowDown?: React.ReactNode;
  itemsClassName?: string;
  badgeClassName?: string;
  disabled?: boolean;
  loader?: React.ReactNode;
  value: (data: any) => void;
  defaultValue?: Option | Option[] | undefined;
}

const MainSelect: React.FC<MainSelectProps> = ({
  options,
  isMulti = false,
  loading = false,
  closeIcon = <IoMdClose color="red" size={18} className="cursor-pointer" />,
  arrowUp = <ChevronDown className="rotate-180" />,
  arrowDown = <ChevronDown />,
  itemsClassName,
  badgeClassName,
  loader,
  value,
  defaultValue,
  disabled,
}) => {
  const [selectedItems, setSelectedItems] = useState<Option[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [openUpwards, setOpenUpwards] = useState<boolean>(false); // New state to track dropdown position
  const divRef = useRef<HTMLDivElement>(null);
  const handleSelect = (option: Option) => {
    if (isMulti) {
      setSelectedItems((prevSelected) => {
        const isAlreadySelected = prevSelected.some(
          (item) => item.id === option.id
        );
        const updatedSelectedItems = isAlreadySelected
          ? prevSelected.filter((item) => item.id !== option.id)
          : [...prevSelected, option];

        value(updatedSelectedItems); // Pass updated items to the parent component
        return updatedSelectedItems;
      });
    } else {
      setSelectedItems([option]);
      value(option as Option); // Pass single option for single-select mode
      setIsDropdownOpen(false);
    }
  };

  const handleRemoveItem = (id: string) => {
    setSelectedItems((prevSelected) => {
      const updatedSelectedItems = prevSelected.filter(
        (item) => item.id !== id
      );
      value(updatedSelectedItems); // Update the parent value on removal
      return updatedSelectedItems;
    });
  };
  const filteredOptions = options
    .filter(
      (option) =>
        !selectedItems.some((selectedItem) => selectedItem.id === option.id)
    )
    .filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

  useEffect(() => {
    if (defaultValue) {
      if (typeof defaultValue === "object" && isMulti === false) {
        return setSelectedItems([defaultValue]);
      } else {
        setSelectedItems([...defaultValue]);
      }
    }
  }, [defaultValue]);

  const handleClickOutside = (event: any) => {
    if (
      divRef.current &&
      !(divRef.current as HTMLElement).contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsDropdownOpen(!isDropdownOpen);

      // Calculate space above and below
      if (divRef.current) {
        const rect = divRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;

        setOpenUpwards(spaceBelow < 200 && spaceAbove > spaceBelow);
      }
    }
  };

  return (
    <div
      ref={divRef}
      className={`relative w-full min-h-10 ${
        disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
      }`}
    >
      {/* Selected Items */}
      <div
        className="flex justify-between items-center border border-gray-300 rounded p-2"
        onClick={toggleDropdown}
      >
        <div className="flex  flex-wrap max-h-[4rem] overflow-y-scroll no-scrollbar">
          {selectedItems.length > 0 ? (
            selectedItems.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "bg-gray-200 rounded-full flex items-center px-2 py-1 mr-2 mb-1 border border-slate-400",
                  badgeClassName
                )}
              >
                <span className="text-black-100">{item.label}</span>
                <button
                  className="ml-2 font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveItem(item.id);
                  }}
                >
                  {closeIcon}
                </button>
              </div>
            ))
          ) : (
            <span className="text-black">Select...</span>
          )}{" "}
        </div>
        <div>{isDropdownOpen ? arrowUp : arrowDown}</div>
      </div>

      {isDropdownOpen && (
        <div
          className={cn(
            "absolute w-full bg-white border border-gray-300 rounded shadow-lg z-[100]",
            openUpwards ? "bottom-full mb-2" : "mt-2"
          )}
        >
          {/* Search Input */}
          <input
            type="text"
            className="w-full p-2 border-b border-gray-300 focus:outline-none bg-white text-black"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Options */}
          <ul className="max-h-40 overflow-y-auto text-black bg-white border">
            {loading ? (
              <div className="w-full h-40 flex justify-center items-center">
                {loader ? (
                  loader
                ) : (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                )}
              </div>
            ) : filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.id}
                  className={cn(
                    "p-2 cursor-pointer hover:bg-blue-100",
                    itemsClassName
                  )}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MainSelect;
