"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function OrientationGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPortrait, setIsPortrait] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkOrientation = () => {
      // Detects if we're in portrait mode
      const portrait =
        window.innerHeight > window.innerWidth && window.innerWidth < 1024;
      setIsPortrait(portrait);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  // Prevent hydration mismatch by not rendering conditionally until mounted
  if (!mounted) {
    return <>{children}</>;
  }

  if (isPortrait) {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-center p-8">
        <motion.div
          animate={{ rotate: [0, 90, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-6"
        >
          <svg
            className="w-20 h-20 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        </motion.div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 px-4 text-center">
          Поверни устройство
        </h2>
        <p className="text-gray-400 text-base sm:text-lg max-w-xs px-6 text-center">
          Чтобы играть правильно, переверни телефон в{" "}
          <b>горизонтальный режим</b>.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
