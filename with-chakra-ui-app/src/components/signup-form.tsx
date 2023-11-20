'use client'
import { useState, SyntheticEvent } from 'react'; // Import SyntheticEvent
import { Box, Input, Button, VStack } from "@chakra-ui/react";
import axios from 'axios';
import Link from 'next/link';

// Define prop types for SignUpPage component
interface SignUpPageProps {
    onSignUp: () => void; // Define onLogin prop as a function that takes no arguments and returns void
  }

export default function SignUpPage({ onSignUp }:SignUpPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e: SyntheticEvent) => {
    e.preventDefault();

    // Perform email and password validation
    if (email === '' || password === '') {
      setError('Please enter both email and password.');
      return;
    }

    if (!email.endsWith('.edu')) {
      setError('Email must end with .edu.');
      return;
    }

    try {
      // Make a POST request to the signup API endpoint
      const response = await axios.post('/api/signupbackend', { username: email, password });

      console.log(response.data); // Handle success

      // If the signup is successful, you can navigate to another page
      onSignUp();
    } catch (error) {
      console.error('Error signing up:', error); // Handle error
    }
  };

  // Add onChange handlers to update state on input change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form className="space-y-3" onSubmit={handleSignUp} action="/search">
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        boxShadow="md"
      >
        <VStack>
          <h1><strong>Please sign up to continue.</strong></h1>
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <input
                  value={email}
                  onChange={handleEmailChange}
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  value={password}
                  onChange={handlePasswordChange}
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  minLength={6}
                />
              </div>
            </div>
          </div>
          <div className="flex h-8 items-end space-x-1"></div>
        </VStack>
        <VStack>
          {/* Error message */}
          {error && (
            <div className="text-red-500 mt-2">
              {error}
            </div>
          )}
          {/* Sign Up button */}
          <div className="flex items-center justify-end mt-6">
            <Button type="submit" colorScheme="blue" size="md" width="full">
              <span>Sign Up</span>
            </Button>
          </div>
        </VStack>
      </Box>
    </form>
  );
}