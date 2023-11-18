import {
  Link as ChakraLink,
  Text,
  Code,
  Input,
  Box,
  Button,
  HStack,
  VStack,
} from '@chakra-ui/react'
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'


import Link from "next/link"
import TableParent from "../components/Table"
import Layout from "../components/MainLayout"
import Login from "../components/login"
import LoginForm from "../components/login-form"
import { useRouter } from 'next/navigation';



const Index = () => {
  const router = useRouter();

  const handleLogin = () => {
    // Navigate to the dashboard page or perform other actions
    console.log('Login successful! Navigate to the dashboard.');
    router.push('/search');
  };
  
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      backgroundColor="#f4f4f4" // Adjust the alpha value for the background color
      zIndex="0" // Adjust the zIndex to ensure it covers other elements
    >
      <HStack>
        <VStack h="100%" w="40%">
          <Box w="100%" pl="20%" pt="40%" fontWeight={"bold"} fontSize={55}>
            Welcome to CourseBidder.
          </Box>
        </VStack>
        <LoginForm onLogin={handleLogin}/>
      </HStack>
    </Box>
  );


 

/*
 
*/

}

export default Index
