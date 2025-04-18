import { ReactElement } from "react";

import TabLists from "./TabLists";
import TabMenu from "./TabMenu";
import { ErrorData, FetchingData } from "@/components/shared/DataState";

import { useNpcShopLists } from "@/hooks/npc-shop/useNpcShopLists";

type PropsTypes = {
  params: { server: string };
  npcName: string;
  channel: string;
  tabNumber: number;
  setTabNumber: React.Dispatch<React.SetStateAction<number>>;
};

export default function TabIndex({ params, npcName, channel, tabNumber, setTabNumber }: PropsTypes) {
  const { data, isFetching }: { data: NpcTypes; isFetching: boolean } = useNpcShopLists(params, npcName, channel);

  if (isFetching)
    return (
      <PreparingDataContainer>
        <FetchingData cn="h-[500px]" />
      </PreparingDataContainer>
    );

  if (data?.error?.name)
    return (
      <PreparingDataContainer>
        <ErrorData error={data.error} cn="h-[500px]" />
      </PreparingDataContainer>
    );

  return (
    <article className="w-full">
      <TabMenu data={data} tabNumber={tabNumber} setTabNumber={setTabNumber} />
      <TabLists data={data} tabNumber={tabNumber} />
    </article>
  );
}

function PreparingDataContainer({ children }: { children: ReactElement }) {
  return (
    <article className="w-full">
      <div className="w-full p-3 pb-0 h-[43px]"></div>
      {children}
    </article>
  );
}
