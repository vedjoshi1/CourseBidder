import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Image from "../../components/designLayouts/Image.js"
import {logo} from "../../assets/images";
import { MdAttachEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";



  fetch("http://localhost:3000/login", {
  method: "POST",
  body: JSON.stringify({
    username: "johndoe@gmail.com",
    password: "john"
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
});

  function getProfile() {
    return fetch('/getuser', {
      method: 'GET',
      credentials: 'include' 
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      return response.json();
    })
    .then(profileData => {
      return profileData;
    })
    .catch(error => {
      console.error('Error fetching profile:', error);
    });
  }

const ProfileCard = () => {

      // State variables to store profile data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Fetch profile data when the component mounts
  useEffect(() => {
    getProfile().then(profileData => {
      if (profileData) {
        setName(profileData.user.name || "Not logged in.")
        setEmail(profileData.user.email || "Not logged in.")
      }
    });
  }, []); // Empty dependency array means this runs once on mount

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
                4253013596
            </div>
            
        </div>


    );



}

export default ProfileCard; 