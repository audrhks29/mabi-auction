import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

type PropsTypes = {
  data: NpcTypes;
  tabNumber: number;
  setTabNumber: React.Dispatch<React.SetStateAction<number>>;
};

export default function TabMenu({ data, tabNumber, setTabNumber }: PropsTypes) {
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const tabRef = useRef<HTMLUListElement>(null);
  const listRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const container = tabRef.current;
    if (!container) return;

    checkScrollPosition();

    const handleScroll = () => {
      checkScrollPosition();
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTabs = (direction: "left" | "right") => {
    const container = tabRef.current;
    if (!container) return;

    const scrollAmount = 150; // 한 번에 스크롤할 px 양

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const checkScrollPosition = () => {
    const container = tabRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    setIsAtStart(scrollLeft <= 0);
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
  };

  return (
    <div className="flex w-full border-b gap-1">
      <Button
        disabled={isAtStart === true}
        variant="outline"
        className="w-3 border-b-0"
        onClick={() => scrollTabs("left")}>
        ◀
      </Button>

      <ul className="flex w-full relative pb-0 overflow-hidden" ref={tabRef}>
        {data &&
          data?.shop?.map((shop: NpcShopTypes, index: number) => (
            <li
              key={index}
              ref={el => {
                listRef.current[index] = el;
              }}
              className={`py-1 px-3 border border-b-0 cursor-pointer min-w-fit rounded-t-lg ${index !== tabNumber ? "text-primary/50" : ""}`}
              onClick={() => setTabNumber(index)}>
              {shop.tab_name}
            </li>
          ))}
      </ul>

      <Button
        disabled={isAtEnd === true}
        variant="outline"
        className="w-3 border-b-0"
        onClick={() => scrollTabs("right")}>
        ▶
      </Button>
    </div>
  );
}
