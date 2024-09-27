import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchBox() {
  return (
    <section>
      <div className="flex gap-2">
        <Input type="text" placeholder="아이템 이름을 입력하세요." />
        <Button>찾기</Button>
      </div>
      <div>
        <Button>검색 초기화</Button>
      </div>
    </section>
  );
}
