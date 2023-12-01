import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [classes, setClasses] = useState([]);

  return (
    <div className="w-full mx-auto">
      {classes.length === 0 ? (
        <p>Loading classes...</p>
      ) : (
        <>
          {/* Render your components using the fetched classes */}
          {/* Example: */}
          {classes.map((classItem) => (
            <div key={classItem._id}>
              {/* Render class details here */}
              <p>{classItem.name}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Home;
