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
    // error,
  } = useStore();
  const user = student ? student : lecturer;

  const pathname = usePathname();

  useEffect(() => {
    console.log("App changed to:", pathname);
    // Call your custom function here
    CheckAuth();
  }, [pathname]);

  console.log(user);
  return <main {...props}>{children}</main>;
}
