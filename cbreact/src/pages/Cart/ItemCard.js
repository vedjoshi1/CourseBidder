import React from "react";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useState } from "react";
import {
  deleteItem,
  decreaseQuantity,
  increaseQuantity,
} from "../../redux/orebiSlice";

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

const ItemCard = ({ item }) => {
  const [isRemoved, setRemoved] = useState(false);

  const handleRemoveItem = async () => {
    try {
      // Make an API request to remove the item from the database
      console.log(item._id)
      await axios.post("/removeListing", { listingId: item._id.toString() });
      // Dispatch the action to remove the item from the Redux store
      console.log("Removed the class")
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
        <h1 className="font-titleFont font-semibold">{item.departmentId}</h1>
      </div>
      <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
        <div className="flex w-1/3 items-center text-lg font-semibold">
          ${item.price}
        </div>
        <div className="w-1/3 flex items-center justify-center gap-6 text-lg">
          <button
            // An onclick function should go here
            className="py-2 px-6 bg-green-700 text-white font-semibold uppercase mb-4 hover:bg-green-800 duration-300"
          >
            {item.isSold ? (
              <p className="text-white font-semibold">Sold</p>
            ) : (
              <p className="text-white font-semibold">Still Listed</p>
            )}
          </button>
        </div>
        <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
          <p>{getFormattedTime(item.timePosted)}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
