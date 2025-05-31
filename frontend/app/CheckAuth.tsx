"use client";

import { useEffect } from "react";
import useStore from "@/store/store";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export function CheckAuthProvider({
  children,
  ...props
}: {
  children: ReactNode;
}) {
  const {
    CheckAuth,
    // student,
    // lecturer,
    // isAuthenticated,
    // isCheckingAuth,
    // error,
  } = useStore();

  const pathname = usePathname();

  useEffect(() => {
    // Call your custom function here
    // CheckAuth();
  }, [CheckAuth]);

  return <main {...props}>{children}</main>;
}
