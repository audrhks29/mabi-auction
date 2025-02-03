import Link from "next/link";

import noticeList from "@/assets/notice.json";

export default function Home() {
  return (
    <main className="inner">
      <h3 className="text-[18px] text-center font-bold pb-6">업데이트 내역</h3>

      <table className="table">
        <thead className="text-center">
          <tr>
            <th className="w-[20px]">번호</th>
            <th className="w-[120px]">구분</th>
            <th>제목</th>
            <th className="w-[110px]">작성일</th>
          </tr>
        </thead>

        <tbody>
          {noticeList
            .slice()
            .sort((a, b) => b.id - a.id)
            .map(notice => (
              <tr key={notice.id} className="text-center hover h-[60px]">
                <td className="font-semibold">{notice.id}</td>
                <td>
                  <span className="badge badge-neutral">{notice.type}</span>
                </td>
                <td className="text-left hover:link font-semibold">
                  <Link href={`notice/${notice.id}`}>v{notice.version} 업데이트 내역</Link>
                </td>
                <td>{notice.date.replace(/(\d{4})년 (\d{1,2})월 (\d{1,2})일/, "$1.$2.$3")}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  );
}
