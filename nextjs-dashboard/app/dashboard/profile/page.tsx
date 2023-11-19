// pages/dashboard/profile.tsx
'use client'
import { useState } from 'react';
import { Button } from '@/app/ui/button';
import styles from '@/app/ui/profilepage.module.css';

export default function App(){


const [filebase64,setFileBase64] = useState<string>("")




function formSubmit(e: any) {
  e.preventDefault();
  console.log({filebase64})
  alert("here you'd submit the form using\n the filebase64 like any other field")
}


function convertFile(files: FileList|null) {
  if (files) {
    const fileRef = files[0] || ""
    const fileType: string= fileRef.type || ""
    console.log("This file upload is of type:",fileType)
    const reader = new FileReader()
    reader.readAsBinaryString(fileRef)
    reader.onload=(ev: any) => {
      setFileBase64(`data:${fileType};base64,${btoa(ev.target.result)}`)
    }
  }
}


  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '', // New fiel
  

  });
  


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Updated Profile:', formData);
  };
  
  return (  
    <div className={styles.container}>
    <form onSubmit={formSubmit}>
      <input type="file" onChange={(e) => convertFile(e.target.files)} />
      {filebase64 ? (
        <>
          <p>Succesfully updated profile picture.</p>
          {filebase64.indexOf("image/") > -1 && (
            <img
              src={filebase64}
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid black",
              }}
            />
          )}
        </>
      ) : (
        <div>
          {/* Display the blank circle here */}
          <div
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              backgroundColor: "transparent",
              border: "2px solid black",
            }}
          ></div>
        </div>
      )}
    </form>
      <h1 className={styles.heading}><strong>Profile Page</strong></h1>
      <form onSubmit={handleSubmit} className={styles.form}>

     
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phoneNumber" className={styles.label}>
            Phone Number:
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>
        <Button type="submit" className={styles.button}>
          Update Profile
        </Button>
      </form>
    </div>
  );

    }