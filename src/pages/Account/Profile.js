import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProfileCard from "./ProfileCard";


function getProfile() {
  return fetch('/getuser', {
    method: 'POST',
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

  function checkPassword(email, password) {
    return fetch('/checkpassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response =>  response.json())
    .then(profileData => profileData)
    .catch(error => console.error('Error fetching password:', error));


  }

  function updateProfile(fullname, email, password) {
    return fetch('/getuser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname, email, password })
    })
    .then(response =>  response.json())
    .then(profileData => profileData)
    .catch(error => console.error('Error fetching profile:', error));
  }


const Profile = () => {
     // ============= Initial State Start here =============
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  // ============= Initial State End here ===============
  // ============= Error Msg Start here =================
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  // ============= Error Msg End here ===================
  const [successMsg, setSuccessMsg] = useState("");
  // ============= Event Handler Start here =============
  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  // ============= Event Handler End here ===============
  // ================= Email Validation start here =============
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };
  // ================= Email Validation End here ===============

  // Fetch profile data when the component mounts
  useEffect(() => {
    getProfile().then(profileData => {
      if (profileData) {
        setClientName(profileData.user.fullName || "Not logged in.");
        setEmail(profileData.user.email || "Not logged in.");
      }
      else
      {
        window.location.pathname = '/signin'
      }
    });
  }, []);

  const handleSignUp = (e) => {
    e.preventDefault();
    if (checked) {
      if (!clientName) {
        setErrClientName("Enter your name");
      }
      if (!email) {
        setErrEmail("Enter your email");
      } else {
        if (!EmailValidation(email)) {
          setErrEmail("Enter a Valid email");
        }
      }
      if (!password) {
        setErrPassword("Must type in a password");
      } else {
        // if (password.length < 6) {
        //   setErrPassword("Passwords must be at least 6 characters");
        // }

        checkPassword(email, password).then(profileData => {

            console.log(profileData)
              if(!profileData.correct)
              {
                setSuccessMsg("")
                setErrPassword("Incorrect Password.")
              }
              else
              {
                setSuccessMsg(
                  `Successfully updated profile.`
                );

                updateProfile(clientName, email, password)

              }
            
        });

        
      }

      // ============== Getting the value ==============

        
        
        }
  };

  
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Profile Settings" />
      <div className="flex">
        <div className="w-[60%]">
          <div className= 'flex max-w-container justify-center'>
      <form className="w-full lgl:w-[500px] h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                Edit your account information
              </h1>
              <div className="flex flex-col gap-3">
                {/* client name */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Full Name
                  </p>
                  <input
                    onChange={handleName}
                    value={clientName}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="eg. John Doe"
                  />
                  {errClientName && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errClientName}
                    </p>
                  )}
                </div>
                {/* Email */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Email
                  </p>
                  <input
                    onChange={handleEmail}
                    value={email}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    placeholder="john@workemail.com"
                  />
                  {errEmail && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errEmail}
                    </p>
                  )}
                </div>
                {/* Password */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Password
                  </p>
                  <input
                    onChange={handlePassword}
                    value={password}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="Confirm Password"
                  />
                  {errPassword && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPassword}
                    </p>
                  )}
                </div>
                {/* Checkbox */}
                <div className="flex items-start mdl:items-center gap-2">
                  <input
                    onChange={() => setChecked(!checked)}
                    className="w-4 h-4 mt-1 mdl:mt-0 cursor-pointer"
                    type="checkbox"
                  />
                  <p className="text-sm text-primeColor">
                    I agree to the Course Bidder{" "}
                    <span className="text-blue-500">Terms of Service </span>and{" "}
                    <span className="text-blue-500">Privacy Policy</span>.
                  </p>
                </div>
                <button
                  onClick={handleSignUp}
                  className={`${
                    checked
                      ? "bg-primeColor hover:bg-black hover:text-white cursor-pointer"
                      : "bg-gray-500 hover:bg-gray-500 hover:text-gray-200 cursor-none"
                  } w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
                >
                  Edit Profile
                </button>
                  <p>
                  {successMsg}
                  </p>
              
              </div>
            </div>
          </form>
          </div>
        </div>
        <div className="flex w-[40%] items-start justify-center">
          <div className="flex flex-col max-h-container mt-10">
            <ProfileCard nameProp={clientName} emailProp={email} />
          </div>
          
        </div>

      </div>


  
    </div>
  );
};

export default Profile;