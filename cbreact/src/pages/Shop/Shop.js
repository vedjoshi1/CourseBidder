import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";
import { useDispatch } from "react-redux";
import axios from 'axios';
const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);

  };


  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const response = await axios.get(`/getListingsFromUser`);
      
        console.log(response.data);

        //This will log a JSON of all of the listings of the CURRENTLY LOGGED IN USER
      } catch (error) {
        console.error('Error fetching listings:', error);
        // Handle error if needed
      }
    };

    fetchData();
  }, []); 




  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="My Course Listings" />
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Class</h2>
            <h2>Asking Price</h2>
            <h2>Status</h2>
            <h2>Time Posted</h2>
          </div>
          <div className="mt-5">
            {/* {products.map((item) => (
              <div key={item._id}>
                <ItemCard item={item} />
              </div>
            ))} */}
          </div>

          <button
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
          >
            Remove All Listings
          </button>
        </div>    
    </div>
  );
};

export default Shop;
