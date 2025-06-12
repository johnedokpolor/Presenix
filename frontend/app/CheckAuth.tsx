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
  const { CheckAuth, user, isCheckingAuth } = useStore();

  useEffect(() => {
    // Call your custom function here.
    console.log("Checking Auth..");
    CheckAuth();
  }, [CheckAuth]);
  console.log("isCheckingAuth", isCheckingAuth);
  console.log("user", user);

  return (
    <main {...props}>
      <div>
        {isCheckingAuth ? (
          <div className="flex items-center justify-center h-screen">
            <p className="text-lg">Checking authentication.....</p>
          </div>
        ) : (
          children
        )}
      </div>
    </main>
  );
}
