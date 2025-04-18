import { useParams } from "next/navigation";

import npcLists from "@/assets/npc/npcLists.json";

import { serverMap } from "@/utils/serverMap";

type ParamsType = { server: string };

export default function Options({
  setNpcName,
  setChannel,
}: {
  setNpcName: React.Dispatch<React.SetStateAction<string>>;
  setChannel: React.Dispatch<React.SetStateAction<string>>;
}) {
  const params = useParams<ParamsType>();
  const serverName = serverMap[params.server] || "";

  // 채널 갯수
  const serverLength = serverName === "류트" ? 41 : serverName === "하프" ? 24 : 15;
  const channelLists = Array.from({ length: serverLength }, (_, i) => i + 1);

  return (
    <div className="w-full flex gap-3 justify-center items-center">
      <SelectArea selectTitle="NPC" setStateFunction={setNpcName} optionLists={npcLists} />
      <SelectArea selectTitle="채널" setStateFunction={setChannel} optionLists={channelLists} />
    </div>
  );
}

function SelectArea({
  selectTitle,
  setStateFunction,
  optionLists,
}: {
  selectTitle: string;
  setStateFunction: React.Dispatch<React.SetStateAction<string>>;
  optionLists: string[] | number[];
}) {
  return (
    <div className="flex gap-3 items-center">
      <p className="font-bold">{selectTitle}</p>

      <select className="w-[100px]" onChange={e => setStateFunction(e.target.value)}>
        {optionLists.map(list => (
          <option key={list} value={list}>
            {list}
          </option>
        ))}
      </select>
    </div>
  );
}
