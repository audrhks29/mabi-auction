import TabLists from "./TabLists";
import TabMenu from "./TabMenu";

type PropsTypes = {
  data: NpcTypes;
  tabNumber: number;
  setTabNumber: React.Dispatch<React.SetStateAction<number>>;
};

export default function TabIndex({ data, tabNumber, setTabNumber }: PropsTypes) {
  return (
    <article className="w-full">
      <TabMenu data={data} tabNumber={tabNumber} setTabNumber={setTabNumber} />
      <TabLists data={data} tabNumber={tabNumber} />
    </article>
  );
}
