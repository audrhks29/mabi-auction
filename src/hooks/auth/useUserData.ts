import { useQuery } from "@tanstack/react-query";
const key = ["user"];
export const useUserData = () => {
  const { data, refetch } = useQuery({
    queryKey: key,
    queryFn: async () => {
      const res = await fetch("/api/auth/userData", {
        credentials: "include",
      });

      if (!res.ok) return null;

      const data = await res.json();

      return data.userData;
    },
  });
  return { data, refetch };
};
