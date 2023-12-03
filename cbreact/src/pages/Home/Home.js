import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "../../components/home/Products/Product";
import { useLocation } from "react-router-dom";

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

  const handleButtonClick = () => {
    // Handle button click, you can customize this based on your requirements
    console.log('Button clicked');
  };

  return (
    <div>
      <h1>Shop Page</h1>
      {itemID ? (
        <div>
          <p>Item ID: {itemID}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10 mx-8">
            {/* Display individual listings with buttons */}
            {apiData && apiData.map((item, index) => (
              <div key={index} className="mt-5">
                <p>Email: {item.email}</p>
                <p>Department ID: {item.departmentId}</p>
                <p>Price: {item.price}</p>
                <p>Is Sold: {item.isSold ? 'Yes' : 'No'}</p>
                <p>Time Posted: {item.timePosted}</p>
                <button onClick={handleButtonClick}>Click me</button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <p>No Item ID available</p>
        </div>
      )}
    </div>
  );
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
          {/* Add your other sections here */}
        </>
      )}
    </div>
  );
};

export default Home;
