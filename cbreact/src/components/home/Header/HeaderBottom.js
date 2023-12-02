import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import {FaPlus, FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { paginationItems } from "../../../constants";
import { classes } from "../cbreact/classes.js";

const HeaderBottom = () => {
  const products = useSelector((state) => state.orebiReducer.products);
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();

  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  }

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (ref.current.contains(e.target)) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, [show, ref]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filtered = classes.filter((item) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );


    setFilteredProducts(filtered);
  }, [searchQuery]);

  const sortedFilteredProducts = filteredProducts.sort((a, b) => {
    const [prefixA, numericA] = a.productName.match(/([^\d]+)(\d+.*)/).slice(1);
    const [prefixB, numericB] = b.productName.match(/([^\d]+)(\d+.*)/).slice(1);

    // Compare the prefix first
    const prefixComparison = prefixA.localeCompare(prefixB);
    if (prefixComparison !== 0) {
      return prefixComparison;
    }

    // Compare the numeric part as both number and string
    const numericComparison = parseInt(numericA, 10) - parseInt(numericB, 10);
    if (numericComparison !== 0) {
      return numericComparison;
    }

    return numericA.localeCompare(numericB);
  });

  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">

          {!showForm ? (
            <div className="mx-auto relative w-full lg:w-[600px] h-[50px] justify-center text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
              <input
                className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
                type="text"
                onChange={handleSearch}
                value={searchQuery}
                placeholder="Search for classes here"
              />
              <FaSearch className="w-5 h-5" />
              {searchQuery && (
                <div
                  className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}
                >
                  {searchQuery &&
                    sortedFilteredProducts.map((item) => (
                      <div
                        onClick={() =>
                          navigate(
                            `/product/${item.productName
                              .toLowerCase()
                              .split(" ")
                              .join("")}`,
                            {
                              state: {
                                item: item,
                              },
                            }
                          ) &
                          setShowSearchBar(true) &
                          setSearchQuery("")
                        }
                        key={item._id}
                        className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3"
                      >
                        <img className="w-24" src={item.img} alt="productImg" />
                        <div className="flex flex-col gap-1">
                          <p className="font-semibold text-lg">
                            {item.productName}
                          </p>
                          <p className="text-xs">{item.des}</p>
                          <p className="text-sm">
                            Price:{" "}
                            <span className="text-primeColor font-semibold">
                              ${item.price}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ) : (
            <div className= "w-full flex justify-start items-center gap-5">
              <div className="w-[400px] h-[50px] justify-center text-base text-PrimeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
                <input
                  className="flex-1 h-full w-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
                  type="text"
                  onChange={handleSearch}
                  value={searchQuery}
                  placeholder="What class are you posting for?"
                />
                <FaSearch className="w-5 h-5" />
                
              </div>
              
              <div className="w-[200px] h-[50px] justify-center text-base text-PrimeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
                <input
                  className="flex-1 h-full w-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
                  type="text"
                  onChange={handleSearch}
                  value={searchQuery}
                  placeholder="Asking Price"
                />
                <MdAttachMoney className="w-5 h-5" />
                
              </div>

              <button className="w-[80px] h-[30px]  bg-primeColor hover: bg-black hover: text-white cursor-pointer text-white text-[14px]">
                Confirm
              </button>

              <button className="w-[80px] h-[30px]  bg-primeColor hover: bg-black hover: text-white cursor-pointer text-white text-[14px]"
                      onClick={toggleForm}
              >
                Cancel
              </button>

              {/* <button

                  className={`${
                    checked
                      ? "bg-primeColor hover:bg-black hover:text-white cursor-pointer"
                      : "bg-gray-500 hover:bg-gray-500 hover:text-gray-200 cursor-none"
                  } w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
                >
                  Create Account
                </button>
              */}

              



            </div>
          )}


          <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
            
              <div onClick={toggleForm}v>
                <FaPlus />
              </div>
           
            

            <Link to="/profile">
              <div onClick={() => setShowUser(!showUser)} className="flex">
                <FaUser />
              </div>
            </Link>
            
            {/* {showUser && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-6 left-0 z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6"
              >
                <Link to="/signin">
                  <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Login
                  </li>
                </Link>
                <Link onClick={() => setShowUser(false)} to="/signup">
                  <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Sign Up
                  </li>
                </Link>
                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                  Profile
                </li>
                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer">
                  Others
                </li>
              </motion.ul>
            )} */}
           

            <Link to="/cart">
              <div className="relative">
                <FaShoppingCart />
                <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
                  {products.length > 0 ? products.length : 0}
                </span>
              </div>
            </Link>
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;
