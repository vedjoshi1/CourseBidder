import { Box, Input, Button, VStack } from "@chakra-ui/react";
import { useState } from "react";
const axios = require("axios");

const Login = () => {
  // State for username and password
  const [usrnm, setUsername] = useState("");
  const [pswd, setPassword] = useState("");

  // Function to handle login button click
  const handleLoginClick = async () => {

    console.log("LOGIN CLICKED")
    try {
      const apiUrl = 'http://localhost:3001/login'; // Update with your actual API endpoint
      const userData = {
        username: usrnm,
        password: pswd, // Replace with the desired password
     
      };
  
      const response = await axios.post(apiUrl, userData);
      console.log(response)
      console.log(response.data.message); 

      //check if response status is 201. If so, redirect. If not, then make changes as you will. 

    }catch (error) {
      console.error('Error logging in user:', error.response ? error.response.data : error.message);
    }

  };

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} boxShadow="md">
      <VStack>
        <Input
          placeholder="Username"
          mb={3}
          value={usrnm}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          mb={3}
          value={pswd}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Box tp={100} bp={10}>
          Sign up.
        </Box>
        <Button colorScheme="blue" size="md" width="full" onClick={handleLoginClick}>
          Login
        </Button>
      </VStack>
    </Box>
  );
};

export default Login;
