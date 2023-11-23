const axios = require('axios');

const registerUser = async (userData) => {
  try {
    const response = await axios.post('http://localhost:3000/auth/register', userData); //Check whether this is a valid way to make a POST request
    if (response.status === 200) { //Purpose of triple equals???
      console.log('User registered successfully!');
    } else {
      console.error('Registration failed:', response.data);
    }
  } catch (error) {
    console.error('Error registering user:', error);
  }
};

const userData = {
  username: 'test_user',
  email: 'joedibs@yahoo.com',
  password: 'bruinBEAR'
};

registerUser(userData);


