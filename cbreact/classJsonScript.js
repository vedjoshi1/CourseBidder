

const axios = require('axios');
const fs = require('fs').promises;
const getPaginationItems = async () => {
    try {
      const apiUrl = 'http://localhost:3001/getClasses';
      const response = await axios.get(apiUrl);
    
  
      // Return the JSON string from the response
      return response.data;
    } catch (error) {
      console.error('Error getting items', error.response ? error.response.data : error.message);
      // Return null or some other value to indicate an error
      return null;
    }
  };
  
  
  function transformData(inputData) {
    // Initialize an empty array to store the transformed data
    const transformedData = [];

    // Loop through each object in the input data
    for (const item of inputData) {
        // Concatenate departmentId and name to create productName
        const productName = `${item.departmentId} ${item.name}`;

        // Create a new object with the desired format
        const transformedItem = {
            _id: item._id, // Assuming _id remains the same
            img: "/Users/vedjoshi/Desktop/CS35L/cb3/CourseBidder/cbreact/src/assets/images/emptyCart.png", // Assuming spfOne is a predefined variable or imported image
            productName: productName,
            price: "35.00", // Set your desired default value for price
            color: "Blank and White", // Set your desired default value for color
            badge: true, // Set your desired default value for badge
            des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
        };

        // Push the transformed item to the array
        transformedData.push(transformedItem);
    }

    // Convert the array to a JSON string with indentation
    const jsonString = JSON.stringify(transformedData, null, 2);

    return jsonString;
}

  
  
  
  
  
  
const exportString = async () => {
  try {
    const classList = await getPaginationItems();
    const paginationItems = transformData(classList);

    // Convert paginationItems to a JSON string
    const jsonString = JSON.stringify(paginationItems, null, 2);

    // Write the JSON string to a file named 'classes.json'
    await fs.writeFile('classes.json', jsonString, 'utf-8');

    // Return the paginationItems
    return paginationItems;
  } catch (error) {
    // Handle the error if needed
    console.error('Error exporting string:', error);
  }
};

// Call the exportString function
exportString();


