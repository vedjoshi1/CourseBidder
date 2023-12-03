import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";
import { useDispatch } from "react-redux";
import ItemCard from "../Cart/ItemCard";
import axios from 'axios';

const Shop = () => {
  const [apiData, setApiData] = useState([]);
  const [removingAll, setRemovingAll] = useState(false);

  const removeAllListings = async() => {
    try {
      const apiUrl = "/removeListings";
      const response = await axios.post(apiUrl);

      if (response.status === 201){
        setRemovingAll(true);
        console.log("Successfully removed")
      }

    } catch(error) {
      console.error("Error in removing listings");

    }
  };




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

  

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="My Course Listings" />
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
                <ItemCard item={item} />
              </div>
            ))}

            
          </div>

          <button
            onClick={removeAllListings}
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
          >
            Remove All Listings
          </button>




      </div>
    </div>
  );
};

export default Shop;