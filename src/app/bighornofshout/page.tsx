"use client";

import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import BigHornOfShoutLists from "@/components/bigHornOfShout/BigHornOfShoutLists";
import SearchBox from "@/components/bigHornOfShout/SearchBox";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function BigHornOfShoutPage() {
  const { handleSubmit, register, getValues, setValue, watch } = useForm<hornSearchFormTypes>();

  const server = watch("serverType");
  const encodeServer = encodeURI(server);

  const fetchHornLists = async () => {
    if (server) {
      const urlString = `https://open.api.nexon.com/mabinogi/v1/horn-bugle-world/history?server_name=${encodeServer}`;
      const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
      try {
        const headers: HeadersInit = API_KEY ? { "x-nxopen-api-key": API_KEY } : {};

        const res = await fetch(urlString, {
          headers,
        });

        const resData = await res.json();
        return resData;
      } catch (error) {
        console.error("An unexpected error happened:", error);
      }
    } else {
      return [];
    }
  };

  const { data, refetch, isLoading } = useQuery({
    queryKey: [encodeServer],
    queryFn: fetchHornLists,
    select: data => {
      return data.horn_bugle_world_history;
    },
  });

  return (
    <main className="inner">
      <Card>
        <CardContent className="flex gap-6 flex-col justify-center items-center">
          <SearchBox
            data={data}
            refetch={refetch}
            handleSubmit={handleSubmit}
            register={register}
            getValues={getValues}
            setValue={setValue}
          />
          <Separator />
          <BigHornOfShoutLists data={data} getValues={getValues} />
        </CardContent>
      </Card>
    </main>
  );
}
