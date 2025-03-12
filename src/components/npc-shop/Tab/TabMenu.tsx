type PropsTypes = {
  data: NpcTypes;
  tabNumber: number;
  setTabNumber: React.Dispatch<React.SetStateAction<number>>;
};

export default function TabMenu({ data, tabNumber, setTabNumber }: PropsTypes) {
  return (
    <ul className="flex w-full flex-wrap relative p-3 pb-0">
      {data &&
        data?.shop?.map((shop: NpcShopTypes, index: number) => (
          <li
            key={index}
            className={`py-1 px-3 bg-base-100 hover:bg-base-200 border border-neutral-content dark:border-opacity-10 cursor-pointer min-w-fit rounded-t-lg ${index === tabNumber ? "border border-b-0 bg-base-200" : ""}`}
            onClick={() => setTabNumber(index)}>
            {shop.tab_name}
          </li>
        ))}
      <div className="divider m-0 p-0 absolute left-0 w-full bottom-0 h-0 -z-10"></div>
    </ul>
  );
}
