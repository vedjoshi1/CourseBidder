// page.tsx
'use client'
// Import necessary modules/components
import SignUpPage from "../components/signup-form"
import { Box, Input, Button, VStack, HStack } from "@chakra-ui/react";
import { useRouter } from 'next/navigation'; // Import the useRouter hook

export default function SignUp() {

  const router = useRouter();

  const handleSignUp = () => {
    // Navigate to the dashboard page or perform other actions
    console.log('Sign up successful! Navigate to the dashboard.');
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
            A college course marketplace like no other.
          </Box>
        </VStack>
        <SignUpPage onSignUp={handleSignUp}/>
      </HStack>
    </Box>
  );
}