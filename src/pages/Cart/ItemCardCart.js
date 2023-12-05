import React, { useState, useEffect } from "react";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteItem } from "../../redux/cartSlice";

const ItemCard = ({ item, uniqueIdentifier }) => {
  const [isRemoved, setRemoved] = useState(false);
  const [buyButtonText, setBuyButtonText] = useState("Buy");
  const [isItemSold, setIsItemSold] = useState(false);
  const itemID = item.itemID;

  const dispatch = useDispatch();

  useEffect(() => {
    // Check if the item is sold when the component mounts
    checkItemSoldStatus();
  }, []); // Empty dependency array to run the effect only once

  const checkItemSoldStatus = async () => {
    try {
      const apiUrl = 'http://localhost:3001/isitemsold';
      const response = await axios.post(apiUrl, { email: item.email, id: item.itemID });
      setIsItemSold(response.data.isSold);
      if (response.data.isSold) {
        setBuyButtonText("Sold");
      }
    } catch (error) {
      console.error("Error checking if item is sold:", error);
    }
  };

  const markItemSold = async () => {
    try {
      const apiUrl = 'http://localhost:3001/markitemsold';
      const response = await axios.post(apiUrl, { email: item.email, id: item.itemID });
      setBuyButtonText("Sold");
      setIsItemSold(true);
      alert("Class purchase successful!\nClass Name: " + item.itemID + "\nYour information has been sent to the seller, who will contact you directly.");
    } catch (error) {
      alert("Class purchase unsuccessful");
    }
  };

  const handleBuyClick = async () => {
    if (!isItemSold) {
      try {
        const valid = await markItemSold();
      } catch (error) {
        alert("Item purchase unsuccessful");
      }
    }
  };

  const handleRemoveItem = () => {
    console.log('Removing Item with ID:', uniqueIdentifier);
    dispatch(deleteItem(uniqueIdentifier));
  };

  if (isRemoved) {
    return null;
  }

  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-2">
      <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
        <ImCross
          onClick={handleRemoveItem}
          className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
        />
        <p>{itemID}</p>
      </div>
      <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
        <div className="flex w-1/3 items-center text-lg font-semibold">
          ${item.price}
        </div>
        <div className="w-2/3 flex items-center justify-left gap-6 text-lg">
          <button
            className={`py-4 px-20 ${isItemSold ? 'bg-red-500' : 'bg-green-700'} text-white font-semibold uppercase mb-4 hover:bg-green-800 duration-300`}
            onClick={handleBuyClick}
            disabled={isItemSold}
          >
            <p className="text-white font-semibold">{buyButtonText}</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;