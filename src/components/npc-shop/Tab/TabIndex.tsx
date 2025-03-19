import { LoaderCircle, RefreshCcw } from "lucide-react";

import TabLists from "./TabLists";
import TabMenu from "./TabMenu";

import { useNpcShopLists } from "@/hooks/npcShop/useNpcShopLists";

type PropsTypes = {
  params: { server: string };
  npcName: string;
  channel: string;
  tabNumber: number;
  setTabNumber: React.Dispatch<React.SetStateAction<number>>;
};

export default function TabIndex({ params, npcName, channel, tabNumber, setTabNumber }: PropsTypes) {
  const { data, isFetching } = useNpcShopLists(params, npcName, channel);

  if (data?.error?.name === "OPENAPI00009")
    return (
      <PreparingContainer
        icon={<RefreshCcw size={40} />}
        text="API 서버에서 데이터를 갱신중입니다. 잠시후에 새로고침 해주시기 바랍니다."
      />
    );

  if (isFetching)
    return (
      <PreparingContainer
        icon={<LoaderCircle size={40} className="animate-spin" />}
        text="데이터를 불러오는중입니다."
      />
    );

  return (
    <article className="w-full">
      <TabMenu data={data} tabNumber={tabNumber} setTabNumber={setTabNumber} />
      <TabLists data={data} tabNumber={tabNumber} />
    </article>
  );
}

function PreparingContainer({ icon, text }: { icon: any; text: string }) {
  return (
    <article className="w-full">
      <div className="w-full p-3 pb-0 h-[43px]"></div>
      <div className="w-full h-[500px] bg-base-200 flex flex-col gap-3 justify-center items-center">
        <div>{icon}</div>
        <div>{text}</div>
      </div>
    </article>
  );
}
