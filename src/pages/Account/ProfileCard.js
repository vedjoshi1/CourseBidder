import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Image from "../../components/designLayouts/Image.js"
import {logo} from "../../assets/images";
import { MdAttachEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";


const ProfileCard = ( { nameProp, emailProp, phoneProp }) => {

      // State variables to store profile data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');

  // Fetch profile data when the component mounts
  useEffect(() => {
    setName(nameProp)
    setEmail(emailProp)
    setphoneNumber(phoneProp || "123-456-7890")

  }); // Empty dependency array means this runs once on mount

    return (
        <div className="flex flex-col w-[400px] h-[300px] bg-[#F5F5F3] justify-center items-center">
            <div>
              <Image className="w-80 object-cover" imgSrc={logo} />
            </div>
            <div className="text-[40px] text-primeColor font-bold mt-5">
                {name}
            </div>
            <MdAttachEmail />
            <div className=" font-normal text-lg m-1">
                {email}
            </div>

            <FaPhoneAlt />
            <div className="font-normal text-lg m-1">
                {phoneNumber}
            </div>
            
        </div>


    );



}

export default ProfileCard; 