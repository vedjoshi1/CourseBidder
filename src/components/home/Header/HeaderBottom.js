import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import {FaPlus, FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { classes } from "../../../classes";
import axios from "axios";
import { selectCartItems } from '../../../redux/cartSlice';

const HeaderBottom = () => {
  const products = useSelector(selectCartItems);
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();


  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
    setSearchQuery("");
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
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(true);


  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setDropdownVisible(true); // Show the dropdown again when user types
  };

  

  useEffect(() => {
    const filtered = classes.filter((classItem) => {
      // Assuming `departmentId` is the property in classes that you want to filter on
      return classItem.departmentId.toLowerCase().includes(searchQuery.toLowerCase());
    });

    setFilteredClasses(filtered);
  }, [searchQuery]);

  const [classSearchQuery, setClassSearchQuery] = useState('');
  const [askingPrice, setAskingPrice] = useState('');

  const handleClassSearch = (event) => {
    setClassSearchQuery(event.target.value);
  };

  const handleAskingPriceChange = (event) => {
    setAskingPrice(event.target.value);
  };

  const handleConfirm = () => {
    
     let data = {
      departmentId: searchQuery, 
      price: askingPrice
    }
    try{
      let response = axios.post("http://localhost:3001/makeListing", data, {withCredentials: true}).then(console.log("Successfully sent"))
      alert("Listing for " + data.departmentId + " Confirmed!");
      setSearchQuery("");
      toggleForm(false);
    }catch (error){
      alert("Listing for " + data.departmentId + " Failed!");
    }

  };
 
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
                value= {searchQuery}
                placeholder="Search for classes here"
              />
              <FaSearch className="w-5 h-5" />
              {searchQuery && (
                <div
                  className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}
                >
                  {searchQuery &&
                    filteredClasses.map((classItem) => (
                      <div
                        onClick={() => {
                          
                          navigate('/', {
                            state: {
                              itemID: classItem.departmentId,
                            },
                          });

                            setShowSearchBar(true); 
                            setSearchQuery("");
                        }}
                        key={classItem._id}
                        className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-1"
                      >
                        <div className="flex flex-col">
                          <p className="font-semibold text-lg ml-5">
                            {classItem.departmentId}
                          </p>
                          <p className="italic ml-5">
                            {classItem.name}
                          </p>
                         
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ) : (
              <div className="w-full flex justify-start items-center gap-5">
                  <div className="w-[400px] h-[50px] justify-center text-base text-PrimeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl relative">
                      <input
                          className="flex-1 h-full w-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
                          type="text"
                          onChange={handleSearch}
                          value={searchQuery}
                          placeholder="What class are you posting for?"
                      />
                      <FaSearch className="w-5 h-5" />
                      {searchQuery && dropdownVisible && (
                          <div 
                              style={{
                                  position: 'absolute',
                                  top: '100%', // Aligns right below the input box
                                  left: 0,
                                  width: '400px', // Same as the input box
                                  maxHeight: '384px', // Converted 96 from rem to px
                                  overflowY: 'scroll',
                                  backgroundColor: 'white',
                                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                                  zIndex: 50
                              }}
                          >
                              {filteredClasses.map((classItem) => (
                                  <div 
                                      onClick={() => {
                                          setSearchQuery(classItem.departmentId);
                                          setDropdownVisible(false); // Hide the dropdown
                                      }}
                                      key={classItem._id}
                                      className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-1"
                                      style={{ cursor: 'pointer' }}
                                  >
                                      <div className="flex flex-col">
                                          <p className="font-semibold text-lg ml-5">
                                              {classItem.departmentId}
                                          </p>
                                          <p className="italic ml-5">{classItem.name}</p>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      )}    
                  </div>
              <div className="w-[200px] h-[50px] justify-center text-base text-PrimeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
                <input
                  className="flex-1 h-full w-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
                  type="text"
                  onChange={handleAskingPriceChange}
                  value={askingPrice}
                  placeholder="Asking Price"
                />
                <MdAttachMoney className="w-5 h-5" />
                
              </div>

              <button className="w-[80px] h-[30px]  bg-primeColor hover: bg-black hover: text-white cursor-pointer text-white text-[14px]"
                      onClick={handleConfirm}
              >
                Confirm
              </button>

              <button className="w-[80px] h-[30px]  bg-primeColor hover: bg-black hover: text-white cursor-pointer text-white text-[14px]"
                      onClick={toggleForm}
              >
                Cancel
              </button>
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
