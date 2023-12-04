import React, { useState, useEffect, use } from "react";
import axios from "axios";
import Product from "../../components/home/Products/Product";
import { useLocation } from "react-router-dom";
import { Breadcrumb } from "@chakra-ui/react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { FaShoppingCart } from "react-icons/fa";
import { art } from "../../assets/images"
import Image from "../../components/designLayouts/Image"
import { useDispatch } from 'react-redux';

import { addToCart, updateItemID } from '../../redux/cartSlice';
import { ItemCard } from '../Cart/ItemCardCart';
import { BarChart } from '@mui/x-charts/BarChart';
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box, ThemeProvider, createTheme } from '@mui/system';
import { Scatterplot } from "./Scatterplot";

const scat_data = [
  {
    x: 2,
    y: 4,
  },
  {
    x: 3,
    y: 5,
  },
  {
    x: 1,
    y: 2,
  },
  {
    x: 4,
    y: 8,
  },
  {
    x: 7,
    y: 8,
  },
  {
    x: 9,
    y: 9,
  },
  {
    x: 6,
    y: 8,
  },
  {
    x: 5,
    y: 4,
  },
  {
    x: 7,
    y: 5,
  },
  {
    x: 8,
    y: 9,
  },
  {
    x: 6,
    y: 9,
  },
  {
    x: 3,
    y: 6,
  },
  {
    x: 2,
    y: 1,
  },
];


function EachListing ({ _id, email, price, time, itemID }) {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");


  const handleAddToCart = () => {
    //dispatch(addToCart(email, price, time));
    dispatch(updateItemID(itemID));
    const item = { _id, email, price, time, itemID };
    dispatch(addToCart(item));
  };
  return (
  <div className="w-full relative group">
    <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] px-4">
      <button className="text-[#767676] flex items-center" onClick={handleAddToCart}>
        <FaShoppingCart />
        <span className="ml-2">{message}</span> 
      </button>
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

function Items({ currentItems, itemID }) {
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
              itemID={itemID}
            />
          </div>
        )
      }
    </>
  )
}

function sortByPrice(items) {
  return items.slice().sort((a, b) => a.price - b.price);
}

const ShopPage = ({ itemID }) => {
  let [apiData, setApiData] = useState(null);

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

    apiData = sortByPrice(apiData);



    console.log("I'm right here now!")

    const priceFrequency = {};

    let sum = 0;

    // Iterate through the JSON array
    for (let i = 0; i < apiData.length; i++) {
      const item = apiData[i];
      const price = item.price;

      sum = sum + price;
      // Check if the price is already in the frequency object, if not, initialize it to 1, else increment
      priceFrequency[price] = (priceFrequency[price] || 0) + 1;
    }

    const avg = sum / apiData.length;

    const frequencyArray = [];
    const x_dat = []
    const y_dat = []

    // Convert the price frequency object to an array of objects with index as id
    for (const [price, frequency] of Object.entries(priceFrequency)) {
      frequencyArray.push({
        x: parseFloat(price),
        y: frequency, // Convert the price back to a number
        
      });

      x_dat.push(frequency)
      y_dat.push(price)




    }

    console.log("freq arrayy", frequencyArray);

    console.log("This is my data!!!", scat_data)

    const customData = [
      {
          x: 2,
          y: 4,
        },
        {
          x: 3,
          y: 5,
        },
    ]

    console.log("small set", customData)


    console.log("Seems like I get here!")
    return (
      <div className="flex flex-col">
  <Breadcrumbs title={itemID} undercard="Items Sorted From Lowest to Highest"/>

  <div className="md:flex md:space-x-8">
    <div className="flex-shrink-0 w-full md:w-3/5 max-h-screen overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
        <Items currentItems={apiData} itemID={itemID} />
      </div>
    </div>

    <div className="flex-shrink-0 w-full md:w-2/5 mt-[-60px]">
      <div className="flex pl-10">
        <Scatterplot width={600} height={600} data={frequencyArray} />
      </div>
      
      
      {/* <ScatterChart

        
      
        sx={{
          //change left yAxis label styles
         "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel":{
          strokeWidth:"0.7",
          stroke:"#D2D7D3"
         },
         // change all labels fontFamily shown on both xAxis and yAxis
         "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel":{
             fontFamily: "DM Sans",
          },
          // change bottom label styles
          "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel":{
              strokeWidth:"0.5",
              stroke:"#D2D7D3"
           },
            // bottomAxis Line Styles
           "& .MuiChartsAxis-bottom .MuiChartsAxis-line":{
            stroke:"#D2D7D3",
            strokeWidth:"0.7"
           },
           //leftAxis Line Styles
           "& .MuiChartsAxis-left .MuiChartsAxis-line":{
            stroke:"#D2D7D3",
            strokeWidth:"0.7"
           }
        }}

        width={400}
        height={400}
        series={[
          {
            data: frequencyArray.map((v) => ({ x: v.y, y: v.x, id: v.id })),
            color: "#2774af",
          },
        ]}

      /> */}

        <h2 className="text-lg text-primeColor font-bold text-center italic">
          CURRENT AVERAGE PRICE: {avg}
        </h2>
    </div>
    
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
    <div className="w-full pl-8 pr-4">
           

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
