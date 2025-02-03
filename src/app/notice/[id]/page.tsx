import Link from "next/link";

import noticeList from "@/assets/notice.json";

export default function NoticePage({ params }: { params: { id: string } }) {
  const noticeData = noticeList.find(notice => String(notice.id) === params.id);

  return (
    <main className="inner">
      <h3 className="text-[18px] text-center font-bold pb-6">업데이트 내역</h3>

      <section>
        <div className="flex gap-3 items-center bg-base-300 p-6">
          <span className="badge badge-neutral">{noticeData?.type}</span>
          <span className="font-bold">v{noticeData?.version} 업데이트 내역</span>
        </div>

        <p className="text-right mt-2 pr-6 text-[14px]">
          {noticeData?.date.replace(/(\d{4})년 (\d{1,2})월 (\d{1,2})일/, "$1.$2.$3")}
        </p>

        <div className="divider my-2 p-0"></div>

        <article className="px-6 text-[14px]">
          {Object.entries(noticeData?.description as String[]).map(([key, value]) => (
            <p key={key}>- {value}</p>
          ))}
        </article>
      </section>

      <div className="divider my-2 p-0"></div>

      <Link href={"/"}>
        <button type="button" className="btn btn-neutral">
          목록
        </button>
      </Link>
    </main>
  );
}
