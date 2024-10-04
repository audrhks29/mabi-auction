"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import useUserDataStore from "@/store/userData-store";

import LoginPopover from "./LoginPopover";

import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import LogoutPopover from "./LogoutPopover";

export default function UserAuth({ accessToken }: { accessToken: RequestCookie | undefined }) {
  const { userData, deleteUserData, setUserData } = useUserDataStore();
  const route = useRouter();

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

  return <>{!userData ? <LoginPopover /> : <LogoutPopover />}</>;
}
