import npcLists from "@/assets/npc/npcLists.json";
const channelLists = Array.from({ length: 15 }, (_, i) => i + 1);

export default function SelectOptions({
  setNpcName,
  setChannel,
}: {
  setNpcName: React.Dispatch<React.SetStateAction<string>>;
  setChannel: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex gap-3">
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

      <select
        className="select select-bordered text-[12px] md:text-[14px]"
        onChange={e => setStateFunction(e.target.value)}>
        {optionLists.map(list => (
          <option key={list} value={list}>
            {list}
          </option>
        ))}
      </select>
    </div>
  );
}
