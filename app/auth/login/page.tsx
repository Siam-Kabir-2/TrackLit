import DarkModeToggle from "@/components/animations/DarkModeToggle";
import { LoginForm } from "@/components/AuthForms/login-form";
import Image from "next/image";

export default function LoginPage() {
  
  return (
    <>
      <nav className="flex items-center justify-between w-full p-4 ">
        <div className="flex items-center space-x-2">
          <Image
            src="/tracklit.svg"
            alt="TrackLit Logo"
            width={40}
            height={40}
            className="block"
          />
          <span className="text-[27px] font-bold text-gray-900 dark:text-white">
            TrackLit
          </span>
        </div>
        <DarkModeToggle />
      </nav>
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-8">
        <div className="w-full max-w-sm md:max-w-3xl">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
