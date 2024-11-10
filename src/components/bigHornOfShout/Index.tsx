"use client";

import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import BigHornOfShoutLists from "@/components/bigHornOfShout/BigHornOfShoutLists";
import SearchBox from "@/components/bigHornOfShout/SearchBox";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function BigHornOfShoutIndex() {
  const { handleSubmit, register, getValues, setValue, watch } = useForm<HornSearchFormTypes>();

  const server = watch("serverType");
  const encodeServer = encodeURI(server as string);

  const { data, isFetching } = useQuery({
    queryKey: [encodeServer],
    queryFn: async () => {
      if (server !== undefined) {
        const response = await fetch(`/api/bighornofshout?server=${encodeServer}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch item lists");
        }
        return response.json();
      }
    },
    select: data => {
      return data.horn_bugle_world_history;
    },
  });

  return (
    <Card>
      <CardContent className="flex gap-6 flex-col justify-center items-center">
        <SearchBox
          data={data}
          handleSubmit={handleSubmit}
          register={register}
          getValues={getValues}
          setValue={setValue}
        />
        <Separator />
        <BigHornOfShoutLists data={data} getValues={getValues} isFetching={isFetching} />
      </CardContent>
    </Card>
  );
}
