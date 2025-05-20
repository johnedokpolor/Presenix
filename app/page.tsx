"use client";
import { Button } from "@/components/ui/button";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { redirect } from "next/navigation";

const page = () => {
  useEffect(() => {
    redirect("/api/auth/login?post_login_redirect_url=/dashboard");
  }, []);
  return <div></div>;
};

export default page;
