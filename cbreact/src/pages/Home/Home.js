import React, { useState, useEffect, use } from "react";
import axios from "axios";
import Product from "../../components/home/Products/Product";
import { useLocation } from "react-router-dom";
import { Breadcrumb } from "@chakra-ui/react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { FaShoppingCart } from "react-icons/fa";
import { art } from "../../assets/images"
import Image from "../../components/designLayouts/Image"

function EachListing ({ _id, email, price, time }) {
  return (
    <div className="w-full relative group">
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] px-4">
        <span className="text-[#767676]">
          <FaShoppingCart />
        </span>
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold">
            {email}
          </h2>
          <p className="text-[#767676] text-[14px]">${price}</p>
        </div>
        <div>
          <p className="text-[#767676] text-[14px]">{time}</p>
        </div>
      </div>
    </div>
  );

}

function Items({ currentItems }) {
  console.log(currentItems)
  return (
    <>
      {currentItems && 
        currentItems.map((item) =>
          <div key={item._id} className="W-full">
            <EachListing
              _id= {item._id}
              email= {item.email}
              price= {item.price}
              time= {item.timePosted}
            />
          </div>
        )
      }
    </>
  )
}
const ShopPage = ({ itemID }) => {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (itemID) {
          const response = await axios.get(`http://localhost:3001/getListings?departmentId=${encodeURI(itemID)}`, { withCredentials: true });
          setApiData(response.data.data);
          console.log(apiData);
        }
      } catch (error) {
        console.error('API call error:', error);
      }
    };

    fetchData();

  }, [itemID]);

  useEffect( () => {
    console.log(apiData);
  }, [apiData])

  let numberOfItems = apiData ? apiData.length : 0;

  console.log("The length is", numberOfItems)

  if (numberOfItems > 0){
    return (
      <div className="max-w-container mx-auto px-4">
        <Breadcrumbs title={itemID} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Items currentItems={apiData} />


        </div>
        



      </div>


    ); 
  } else {
    return (
      <div className="max-w-container px-4">
        <Breadcrumbs title={itemID} />
        <div className="text-[#767676] text-[18px]">
          No listings found for this particular class. Be the first to post one!
        </div>
        
      </div>
    )

  }

};

const Home = () => {
  const location = useLocation();
  const itemID = location.state ? location.state.itemID : undefined;

  return (
    <div className="w-full mx-auto">
      {itemID ? (
        <ShopPage itemID={itemID} />
      ) : (
        <>
          <div className="flex w-full justify-center">
            <div className="flex w-[80%]">
                <Image imgSrc={art} />
            </div>    
          </div>
            
        </>
      )}
    </div>
  );
};

export default Home;
