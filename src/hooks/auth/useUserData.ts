import { useQuery } from "@tanstack/react-query";

export const useUserData = () => {
  const { data, refetch, isFetching } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("/api/auth/userData", {
        credentials: "include",
      });

      if (!res.ok) return null;

      const data = await res.json();

      return data.userData;
    },
    staleTime: 1000 * 6 * 5,
  });
  return { data, refetch, isFetching };
};
