"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function LoadingIndicator() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  // Hide loading when route changes
  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  // Auto-hide loading after a reasonable timeout
  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 5000); // Auto-hide after 5 seconds

      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };

    // Intercept all internal link clicks
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="/"]');
      const button = target.closest('button[type="submit"]');

      if (link && !link.getAttribute("href")?.includes("#")) {
        const href = link.getAttribute("href");
        // Only show loading if it's a different page
        if (href && href !== pathname) {
          handleStart();
        }
      } else if (button) {
        handleStart();

        // Auto-hide loading after form submission completes
        // Listen for form submission completion
        const form = button.closest("form");
        if (form) {
          const handleFormSubmit = () => {
            setTimeout(() => {
              setIsLoading(false);
            }, 2000); // Hide after 2 seconds for form submissions
          };

          form.addEventListener("submit", handleFormSubmit, { once: true });
        }
      }
    };

    // Handle browser navigation
    const handlePopstate = () => handleStart();

    document.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", handlePopstate);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <>
      {/* Mobile: Cool floating design */}
      <div className="fixed top-20 right-4 md:hidden z-50">
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 rounded-full p-[2px] shadow-2xl animate-pulse">
          <div className="bg-white dark:bg-gray-900 rounded-full p-[6px] backdrop-blur-lg">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-5 h-5 border-2 border-purple-500 border-b-transparent rounded-full animate-spin animate-reverse opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Sleek glassmorphism design */}
      <div className="hidden md:block fixed top-4 right-4 z-50">
        <div className="relative group">
          {/* Glowing background */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 rounded-full opacity-75 group-hover:opacity-100 blur-sm animate-pulse"></div>

          {/* Main container */}
          <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-full p-2 border border-white/20 dark:border-gray-700/20 shadow-xl">
            <div className="relative w-6 h-6">
              {/* Outer ring */}
              <div className="absolute inset-0 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              {/* Inner ring */}
              <div className="absolute inset-1 border-2 border-purple-500 border-b-transparent rounded-full animate-spin animate-reverse"></div>
              {/* Center dot */}
              <div className="absolute inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping opacity-75"></div>
            </div>
          </div>

          {/* Floating particles */}
          <div className="absolute top-1 right-1 w-1 h-1 bg-blue-400 rounded-full animate-bounce"></div>
          <div
            className="absolute bottom-1 left-1 w-1 h-1 bg-purple-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>
      </div>
    </>
  );
}
