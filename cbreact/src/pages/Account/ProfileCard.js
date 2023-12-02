import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Image from "../../components/designLayouts/Image.js"
import {logo} from "../../assets/images";
import { MdAttachEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";




const ProfileCard = () => {
    return (
        <div className="flex flex-col w-[400px] h-[300px] bg-[#F5F5F3] justify-center items-center">
            <div>
              <Image className="w-80 object-cover" imgSrc={logo} />
            </div>
            <div className="text-[40px] text-primeColor font-bold mt-5">
                Anish Pal
            </div>
            <MdAttachEmail />
            <div className=" font-normal text-lg m-1">
                anishmpal@gmail.com
            </div>

            <FaPhoneAlt />
            <div className="font-normal text-lg m-1">
                4253013596
            </div>
            
        </div>


    );



}

export default ProfileCard; 