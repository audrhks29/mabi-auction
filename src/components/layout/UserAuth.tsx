"use client";

import React from "react";

import LoginPopover from "./LoginPopover";
import LogoutPopover from "./LogoutPopover";

import { useUserData } from "@/hooks/auth/useUserData";

export default function UserAuth() {
  const { data: userData } = useUserData();

  return <React.Fragment>{!userData ? <LoginPopover /> : <LogoutPopover />}</React.Fragment>;
}
