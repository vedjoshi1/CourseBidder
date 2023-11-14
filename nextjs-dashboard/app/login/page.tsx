// page.tsx
'use client'
// Import necessary modules/components
import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import the useRouter hook

export default function LoginPage() {

  const router = useRouter();

  const handleLogin = () => {
    // Navigate to the dashboard page or perform other actions
    console.log('Login successful! Navigate to the dashboard.');
    router.push('/dashboard');
  };

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <LoginForm onLogin={handleLogin} />
      </div>
    </main>
  );
}
