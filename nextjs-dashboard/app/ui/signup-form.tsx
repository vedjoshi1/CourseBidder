'use client'
import { useState, SyntheticEvent } from 'react'; // Import SyntheticEvent
import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';

// Define prop types for SignUpPage component
interface SignUpPageProps {
    onSignUp: () => void; // Define onLogin prop as a function that takes no arguments and returns void
  }

export default function SignUpPage({ onSignUp }:SignUpPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = (e: SyntheticEvent) => {
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

    onSignUp();
  };

  // Add onChange handlers to update state on input change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form className="space-y-3" onSubmit={handleSignUp} action="/dashboard">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please sign up to continue.
        </h1>
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
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="flex h-8 items-end space-x-1"></div>
      </div>
      {/* Error message */}
      {error && (
        <div className="text-red-500 mt-2">
          <ExclamationCircleIcon className="inline w-4 h-4 mr-1" />
          {error}
        </div>
      )}
      <div className="flex items-center justify-end mt-6">
        <Button type="submit"> {/* Add type="submit" to the Button component */}
          <span>Sign Up</span>
          <ArrowRightIcon className="w-5 md:w-6" />
        </Button>
      </div>
    </form>
  );
}