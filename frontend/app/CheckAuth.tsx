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
    student,
    lecturer,
    // isAuthenticated,
    // isCheckingAuth,
    error,
  } = useStore();

  // useEffect(() => {
  //   console.log("Checking auth...");
  //   CheckAuth();
  // }, []);
  const pathname = usePathname();

  useEffect(() => {
    console.log("App changed to:", pathname);
    // Call your custom function here
    CheckAuth();
  }, [pathname]);
  console.log(error);

  console.log("user", lecturer || student);
  return <main {...props}>{children}</main>;
}
