import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const useSubmitLogin = (route: AppRouterInstance) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UserLoginTypes) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const resData = await res.json();

      if (resData.error) {
        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
      }

      return resData.userData;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      route.push("/");
    },

    onError: error => {
      alert(error.message);
    },
  });
};
