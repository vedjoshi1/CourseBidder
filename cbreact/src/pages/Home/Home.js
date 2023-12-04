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


const data = [
  {
    id: 'data-0',
    x1: 329.39,
    x2: 391.29,
    y1: 443.28,
    y2: 153.9,
  },
  {
    id: 'data-1',
    x1: 96.94,
    x2: 139.6,
    y1: 110.5,
    y2: 217.8,
  },
  {
    id: 'data-2',
    x1: 336.35,
    x2: 282.34,
    y1: 175.23,
    y2: 286.32,
  },
  {
    id: 'data-3',
    x1: 159.44,
    x2: 384.85,
    y1: 195.97,
    y2: 325.12,
  },
  {
    id: 'data-4',
    x1: 188.86,
    x2: 182.27,
    y1: 351.77,
    y2: 144.58,
  },
  {
    id: 'data-5',
    x1: 143.86,
    x2: 360.22,
    y1: 43.253,
    y2: 146.51,
  },
  {
    id: 'data-6',
    x1: 202.02,
    x2: 209.5,
    y1: 376.34,
    y2: 309.69,
  },
  {
    id: 'data-7',
    x1: 384.41,
    x2: 258.93,
    y1: 31.514,
    y2: 236.38,
  },
  {
    id: 'data-8',
    x1: 256.76,
    x2: 70.571,
    y1: 231.31,
    y2: 440.72,
  },
  {
    id: 'data-9',
    x1: 143.79,
    x2: 419.02,
    y1: 108.04,
    y2: 20.29,
  },
  {
    id: 'data-10',
    x1: 103.48,
    x2: 15.886,
    y1: 321.77,
    y2: 484.17,
  },
  {
    id: 'data-11',
    x1: 272.39,
    x2: 189.03,
    y1: 120.18,
    y2: 54.962,
  },
  {
    id: 'data-12',
    x1: 23.57,
    x2: 456.4,
    y1: 366.2,
    y2: 418.5,
  },
  {
    id: 'data-13',
    x1: 219.73,
    x2: 235.96,
    y1: 451.45,
    y2: 181.32,
  },
  {
    id: 'data-14',
    x1: 54.99,
    x2: 434.5,
    y1: 294.8,
    y2: 440.9,
  },
  {
    id: 'data-15',
    x1: 134.13,
    x2: 383.8,
    y1: 121.83,
    y2: 273.52,
  },
  {
    id: 'data-16',
    x1: 12.7,
    x2: 270.8,
    y1: 287.7,
    y2: 346.7,
  },
  {
    id: 'data-17',
    x1: 176.51,
    x2: 119.17,
    y1: 134.06,
    y2: 74.528,
  },
  {
    id: 'data-18',
    x1: 65.05,
    x2: 78.93,
    y1: 104.5,
    y2: 150.9,
  },
  {
    id: 'data-19',
    x1: 162.25,
    x2: 63.707,
    y1: 413.07,
    y2: 26.483,
  },
  {
    id: 'data-20',
    x1: 68.88,
    x2: 150.8,
    y1: 74.68,
    y2: 333.2,
  },
  {
    id: 'data-21',
    x1: 95.29,
    x2: 329.1,
    y1: 360.6,
    y2: 422.0,
  },
  {
    id: 'data-22',
    x1: 390.62,
    x2: 10.01,
    y1: 330.72,
    y2: 488.06,
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

    // Convert the price frequency object to an array of objects with index as id
    for (const [price, frequency] of Object.entries(priceFrequency)) {
    frequencyArray.push({
      id: frequencyArray.length.toString(), // Use index as id
      x: parseFloat(price), // Convert the price back to a number
      y: frequency,
    });
    }

    console.log(frequencyArray);




    return (
      <div className="flex flex-col">
        <Breadcrumbs title={itemID} />

        <div className="flex md:flex-row">
          <div className="w-full md:w-3/5 md:mr-8">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
              <Items currentItems={apiData} itemID={itemID} />
            </div>
          </div>

          <div className="w-full md:w-2/5">
            <ScatterChart
              width={600}
              height={300}
              series={[
                {
                  label: 'Series B',
                  data: frequencyArray.map((v) => ({ x: v.y, y: v.x, id: v.id })),
                },
              ]}
            />

            <div>
              Average is {avg}
            </div>
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
