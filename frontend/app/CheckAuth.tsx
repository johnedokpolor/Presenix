"use client";

import { useEffect } from "react";
import useStore from "@/store/store";

import { ReactNode } from "react";

export function CheckAuthProvider({
  children,
  ...props
}: {
  children: ReactNode;
}) {
  const {
    CheckAuth,

    isCheckingAuth,
  } = useStore();

  useEffect(() => {
    // Call your custom function here
    CheckAuth();
  }, [CheckAuth]);

  return (
    <main {...props}>
      <div>
        {isCheckingAuth ? (
          <div className="flex items-center justify-center h-screen">
            <p className="text-lg">Checking authentication...</p>
          </div>
        ) : (
          children
        )}
      </div>
    </main>
  );
}
