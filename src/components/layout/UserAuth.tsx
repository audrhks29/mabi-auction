"use client";

import React, { useEffect } from "react";

import useUserDataStore from "@/store/userData-store";

import LoginPopover from "./LoginPopover";
import LogoutPopover from "./LogoutPopover";

import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export default function UserAuth({ accessToken }: { accessToken: RequestCookie | undefined }) {
  const { userData, setUserData } = useUserDataStore();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/auth/userData", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const resData = await res.json();

        if (resData.userData) {
          setUserData(resData.userData);
        } else if (resData.error) {
          console.error(resData.error);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (accessToken) {
      fetchUserData();
    }
  }, [accessToken, setUserData]);

  return <React.Fragment>{!userData ? <LoginPopover /> : <LogoutPopover />}</React.Fragment>;
}
