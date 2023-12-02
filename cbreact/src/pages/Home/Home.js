import React from "react";
import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";

import { useState, useEffect } from "react";
import Product from "../../components/home/Products/Product";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "animate.css/animate.min.css"; // Import Animate.css for animations


function Items({ currentItems }) {
  console.log("printing current items", currentItems);
  console.log(Array.isArray(currentItems));

  return (
    <>
      {Array.isArray(currentItems) &&
        currentItems.map((item) => (
          <div key={item.id} className="w-full">
            <Product
              _id={item.id}
              productName={item.email}
              price={item.price}
              color={item.color} // Add the color property if available in your data
            />
          </div>
        ))}
    </>
  );
}


const Home = () => {
  const mockData = [
    {
      email: 'pranavvarmaraja@gmail.com',
      departmentId: 'COM SCI 31',
      price: 23,
      isSold: false,
      timePosted: 'Sat Dec 02 2023 05:58:28 GMT-0800 (Pacific Standard Time)',
      id: '656b3803a54908d4a4b3ed4f'
    }
    // ... Repeat this pattern for additional items up to 25
  ];
  
  for (let i = 4; i <= 25; i++) {
    mockData.push({
      _id: `${i}`,
      productName: `Product ${i}`,
      price: Math.floor(Math.random() * 100) + 10, // Random price between 10 and 109
    });
  }
  
  // Usage in your component
  // <Items currentItems={mockData} />;
  


  const location = useLocation();
  const itemID = location.state ? location.state.itemID : undefined;
  const [apiData, setApiData] = useState(null);

  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (itemID) {
          const response = await axios.get(`http://localhost:3001/getListings?departmentId=${encodeURI(itemID)}`, {withCredentials: true})
          setApiData(response.data);
          console.log(apiData)
        }
      } catch (error) {
        console.error('API call error:', error);
      }
    };

    fetchData();
    
  }, [itemID]);

  console.log("I'm here")
  

  return (
    <div>
      <h1>Shop Page</h1>
      {itemID ? (
        <div>
          <p>Item ID: {itemID}</p>
          {/* {apiData && (
            <div> */}
              {/* Render content from API response */}
              {/* <p>{apiData.someProperty}</p>
            </div> */}
          {/* )} */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10 mx-8">
              <pre>{JSON.stringify(apiData, null, 2)}</pre>
          </div>
          {/* Other content for when itemID is defined */}
        </div>
      ) : (
        <div>
          <p>No Item ID available</p>
          {/* Other content for when itemID is undefined */}
        </div>
      )}
      {/* Other shop page content */}
    </div>
  );

};

export default Home;
