import React from "react";
import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";
import BestSellers from "../../components/home/BestSellers/BestSellers";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import Sale from "../../components/home/Sale/Sale";
import SpecialOffers from "../../components/home/SpecialOffers/SpecialOffers";
import YearProduct from "../../components/home/YearProduct/YearProduct";

import { useState, useEffect } from "react";
import "animate.css/animate.min.css"; // Import Animate.css for animations

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading effect with a delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const AnimatedHeader = ({ text }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      // Trigger animation after the component is mounted
      setIsVisible(true);
    }, []);

    return (
      <h1 className={`font-bold text-3xl mb-4 animate__animated ${isVisible ? 'animate__fadeInUp' : ''}`}>
        {text}
      </h1>
    );
  };

  const renderAboutUs = () => (
    <div className="text-center mt-8">
      <AnimatedHeader text="What is CourseBidder?" />
      <p className="font-normal text-lg mx-auto" style={{ marginLeft: '50px', marginRight: '50px' }}>
        CourseBidder, a groundbreaking application tailored exclusively for UCLA students, is set to revolutionize the course transaction experience. CourseBidder introduces a user-friendly marketplace where Bruins can seamlessly buy and sell academic courses in a secure environment. The platform boasts an intuitive interface showcasing available courses, a robust database for secure transactions, and comprehensive search capabilities, ensuring a smooth and transparent experience for users. W
        Designed to enhance the academic journey for UCLA students, CourseBidder fosters a sense of community through its innovative features. The platform's real-time communication functionality, powered by Socket.io, facilitates seamless interactions between buyers and sellers. Founded in late 2023 by Atij Mahesh, Kareem Dibs, Anish Pal, Ved Joshi, and Vikram Ramesh, CourseBidder promises to redefine how UCLA students approach course selection and registration, contributing to an overall positive and enriching academic experience.
      </p>
    </div>
  );

  const renderHowItWorks = () => (
    <div className="text-center mt-8">
      <AnimatedHeader text="How It Works" />
      <p className="font-normal text-lg mx-auto" style={{ marginLeft: '50px', marginRight: '50px' }}>
        CourseBidder works as a buying and selling site, where users can create an account, log in, and begin to buy and sell class seats. Users can view their listings (classes they intend to sell) or search up classes that others are selling. With CourseBidder, users can now seek the classes they want, use their extra units to make more money, or see how valuable certain courses are at UCLA. So create your account today to start securing your classes or making money!
      </p>
    </div>
  );

  const renderFeedback = () => (
    <div className="text-center mt-8">
      <AnimatedHeader text="Feedback" />
      <p className="font-normal text-lg mb-8">
        Have questions or feedback? Contact us at <a href="mailto:coursebidder@gmail.com" className="text-blue-500">coursebidder@gmail.com</a>
      </p>
      <a href="https://github.com/vedjoshi1/CourseBidder" target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white px-4 py-2 rounded-md inline-block">GitHub Repo</a>
    </div>
  );

  return (
    <div className="w-full mx-auto">
      {renderAboutUs()}
      {renderHowItWorks()}
      {renderFeedback()}
    </div>
  );
};

export default Home;
