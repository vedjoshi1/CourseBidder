import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { useDispatch } from "react-redux";
import ItemCard from "../Cart/ItemCardListings";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { emptyListings } from "../../assets/images/index";

import axios from 'axios';

function getListings() {
  return fetch('/numlistings', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
  })
  .then(response =>  response.json())
  .then(profileData => profileData)
  .catch(error => console.error('Error fetching password:', error));


}

const Shop = () => {
  const [apiData, setApiData] = useState([]);
  const [removingAll, setRemovingAll] = useState(false);
  const [numListings, setNumListings] = useState(0)

  // const removeAllListings = async() => {
  //   try {
  //     const apiUrl = "/removeListings";
  //     const response = await axios.post(apiUrl);

  //     if (response.status === 201){
  //       setRemovingAll(true);
  //       console.log("Successfully removed")
  //     }

  //   } catch(error) {
  //     console.error("Error in removing listings");

  //   }
  // };


  useEffect(() => {
    getListings().then(profileData => {
      if(profileData)
      {
        setNumListings(profileData.num)
        console.log("Number",profileData.num)
      }
    });
  }, []);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/getListingsFromUser`);
        setApiData(response.data.data);
      } catch (error) {
        console.error('Error fetching listings:', error);
        // Handle error if needed
      }
    };

    fetchData();
  },[removingAll]); 

  const handleButtonClick = (item) => {
    // Handle button click for the specific item
    console.log('Button clicked for:', item);
  };

  const handleRemoveListing = () => {
    setNumListings(prev => prev - 1);
  };

  

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="My Course Listings" />
      {numListings > 0 ? (
      <div className="pb-20">
        {/* Display individual listings with buttons
        {apiData.map((item, index) => (
          <div key={index} className="mt-5">
            <p>Email: {item.email}</p>
            <p>Department ID: {item.departmentId}</p>
            <p>Price: {item.price}</p>
            <p>Is Sold: {item.isSold ? 'Yes' : 'No'}</p>
            <p>Time Posted: {item.timePosted}</p>
            <button onClick={() => handleButtonClick(item)}>Click me</button>
          </div>
        ))}

        <button
          className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
        >
          Remove All Listings
        </button> */}

         <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Class Name</h2>
            <h2>Price</h2>
            <h2>Status</h2>
            <h2>Time Posted</h2>
          </div>
          <div className="mt-5">
            {apiData.map((item) => (
              <div key={item._id}>
                <ItemCard item={item} onRemovingListing={handleRemoveListing} />
              </div>
            ))}

            
          </div>

          {/* <button
            onClick={removeAllListings}
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
          >
            Remove All Listings
          </button> */}




      </div>

      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyListings}
              alt="emptyListings"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              No current listings.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Click the + icon above to list your first class!
            </p>
            <Link to="/">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Continue Searching
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Shop;