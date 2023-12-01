// page.tsx
'use client'
// Import necessary modules/components
import AcmeLogo from '@/app/ui/acme-logo';
import SignUpPage from '@/app/ui/signup-form'
import { useRouter } from 'next/navigation'; // Import the useRouter hook

export default function SignUp() {

  const router = useRouter();

  const handleSignUp = () => {
    // Navigate to the dashboard page or perform other actions
    console.log('Sign up successful! Navigate to the dashboard.');
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
        <SignUpPage onSignUp={handleSignUp} />
      </div>
    </main>
  );
}
