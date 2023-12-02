import React from "react";
import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";
import { useState, useEffect } from "react";
import Product from "../../components/home/Products/Product";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "animate.css/animate.min.css"; // Import Animate.css for animations

// About Us Section Component
const AboutUsSection = () => (
  <div className="text-center mt-8">
    <h2 className="font-bold text-3xl mb-4">About Us</h2>
    <p className="font-normal text-lg mx-auto" style={{ marginLeft: '50px', marginRight: '50px' }}>CourseBidder, a groundbreaking application tailored exclusively for UCLA students, is set to revolutionize the course transaction experience. CourseBidder introduces a user-friendly marketplace where Bruins can seamlessly buy and sell academic courses in a secure environment. The platform boasts an intuitive interface showcasing available courses, a robust database for secure transactions, and comprehensive search capabilities, ensuring a smooth and transparent experience for users. W
        Designed to enhance the academic journey for UCLA students, CourseBidder fosters a sense of community through its innovative features. The platform's real-time communication functionality, powered by Socket.io, facilitates seamless interactions between buyers and sellers. Founded in late 2023 by Atij Mahesh, Kareem Dibs, Anish Pal, Ved Joshi, and Vikram Ramesh, CourseBidder promises to redefine how UCLA students approach course selection and registration, contributing to an overall positive and enriching academic experience.</p>
  </div>
);

// How It Works Section Component
const HowItWorksSection = () => (
  <div className="text-center mt-8">
    <h2 className="font-bold text-3xl mb-4">How It Works</h2>
    <p className="font-normal text-lg mx-auto" style={{ marginLeft: '50px', marginRight: '50px' }}>CourseBidder works as a buying and selling site, where users can create an account, log in, and begin to buy and sell class seats. Users can view their listings (classes they intend to sell) or search up classes that others are selling. With CourseBidder, users can now seek the classes they want, use their extra units to make more money, or see how valuable certain courses are at UCLA. So create your account today to start securing your classes or making money!</p>
  </div>
);

// Feedback Section Component
const FeedbackSection = () => (
  <div className="text-center mt-8">
    <h2 className="font-bold text-3xl mb-4">Feedback</h2>
    <p className="font-normal text-lg mb-8">Have questions or feedback? Contact us at <a href="mailto:coursebidder@gmail.com" className="text-blue-500">coursebidder@gmail.com</a></p>
    <a href="https://github.com/vedjoshi1/CourseBidder" target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white px-4 py-2 rounded-md inline-block">GitHub Repo</a>
  </div>
);

// Shop Page Component
const ShopPage = ({ itemID }) => {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (itemID) {
          const response = await axios.get(`http://localhost:3001/getListings?departmentId=${encodeURI(itemID)}`, { withCredentials: true })
          setApiData(response.data);
          console.log(apiData);
        }
      } catch (error) {
        console.error('API call error:', error);
      }
    };

    fetchData();

  }, [itemID]);

  return (
    <div>
      <h1>Shop Page</h1>
      {itemID ? (
        <div>
          <p>Item ID: {itemID}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10 mx-8">
            <pre>{JSON.stringify(apiData, null, 2)}</pre>
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading effect with a delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full mx-auto">
      {itemID ? (
        <ShopPage itemID={itemID} />
      ) : (
        <>
          <AboutUsSection />
          <HowItWorksSection />
          <FeedbackSection />
        </>
      )}
    </div>
  );
};

export default Home;
