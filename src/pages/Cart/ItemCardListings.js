import React from "react";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  deleteItem,
  decreaseQuantity,
  increaseQuantity,
} from "../../redux/orebiSlice";
import { updateItemSoldStatus } from "../../redux/cartSlice";

const formatTime = (timeString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    
  };
  return new Date(timeString).toLocaleString("en-US", options);
};

const getFormattedTime = (timeString) => {
  return formatTime(timeString);
};

const ItemCard = ({ item, onRemovingListing}) => {
  const [isRemoved, setRemoved] = useState(false);
  const [buyButtonText, setBuyButtonText] = useState("Still Listed");
  const [isItemSold, setIsItemSold] = useState(false);


  useEffect(() => {
    // Check if the item is sold when the component mounts
    checkItemSoldStatus();
  }, []); // Empty dependency array to run the effect only once

  const checkItemSoldStatus = async () => {
    try {
      const apiUrl = 'http://localhost:3001/isitemsold';
      const response = await axios.post(apiUrl, { email: item.email, id: item.departmentId });
      setIsItemSold(response.data.isSold);
      if (response.data.isSold) {
        setBuyButtonText("Sold");
      }
    } catch (error) {
      console.error("Error checking if item is sold:", error);
    }
  };


  const handleRemoveItem = async () => {
    try {
      // Make an API request to remove the item from the database
      console.log(item._id)
      await axios.post("/removeListing", { listingId: item._id.toString() });
      // Dispatch the action to remove the item from the Redux store
      console.log("Removed the class")
      onRemovingListing();
      setRemoved(true);
    } catch (error) {
      console.error("Error removing item:", error);
      // Handle error if needed
    }
  };

  if (isRemoved){
    return null;
  }

  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-2">
      <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
        <ImCross
          onClick={handleRemoveItem}
          className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
        />
        <p>{item.departmentId}</p>
      </div>
      <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
        <div className="flex w-1/7 items-center text-lg font-semibold">
          ${item.price}
        </div>
        <div className="w-1/5 flex items-center justify-center gap-6 text-lg">
        <button
  className={`py-2 px-6 ${
    isItemSold ? 'bg-red-500' : 'bg-green-700'
  } text-white font-semibold uppercase mb-4 hover:${
    isItemSold ? 'bg-red-600' : 'bg-green-800'
  } duration-300`}
  disabled={isItemSold}
>
  <p className="text-white font-semibold">
    {isItemSold ? "Sold" : buyButtonText}
  </p>
</button>
        </div>
        <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
