import Link from "next/link";

import noticeList from "@/assets/notice.json";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default async function NoticePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const noticeData = noticeList.find(notice => String(notice.id) === params.id);

  return (
    <main className="inner">
      <h3 className="text-[18px] font-bold pb-6">업데이트 내역</h3>

      <section>
        <div className="flex gap-3 items-center bg-card p-6">
          <Badge>{noticeData?.type}</Badge>
          <span className="font-bold">v{noticeData?.version} 업데이트 내역</span>
        </div>

        <p className="text-right my-2 pr-6 text-card-foreground/50">
          {noticeData?.date.replace(/(\d{4})년 (\d{1,2})월 (\d{1,2})일/, "$1.$2.$3")}
        </p>

        <Separator />

        <article className="p-6">
          {Object.entries(noticeData?.description as String[]).map(([key, value]) => (
            <p key={key}>- {value}</p>
          ))}
        </article>
      </section>

      <Separator />

      <Link href={"/"} className="block mt-3">
        <Button type="button">목록</Button>
      </Link>
    </main>
  );
}
