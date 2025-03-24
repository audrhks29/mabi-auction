import { FetchingData, NonData } from "@/components/shared/DataState";

export default function Rank({ rank }: { rank: HallOfFameTypes[] }) {
  return (
    <article>
      <h4 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-bold">랭크</h4>

      <div className="divider m-0 p-0 before:bg-primary after:bg-primary h-1"></div>

      <Container rank={rank} />
    </article>
  );
}

function Container({ rank }: { rank: HallOfFameTypes[] }) {
  if (!rank) return <FetchingData cn="h-[500px]" />;
  if (rank.length === 0) return <NonData cn="h-[500px]" text="랭킹정보가 없습니다." />;
  return <Table rank={rank} />;
}
function Table({ rank }: { rank: HallOfFameTypes[] }) {
  return (
    <div className="max-h-[500px] overflow-auto">
      <table className="table w-full text-center">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
        </colgroup>

        <thead className="h-11">
          <tr>
            <th>랭킹</th>
            <th>닉네임</th>
            <th>달성시간</th>
            <th>좋아요</th>
          </tr>
        </thead>

        <tbody>
          {rank.map((hall, index) => (
            <tr key={index} className="h-9 hover:bg-base-200 cursor-pointer">
              <td className="font-bold">{hall.rank}</td>
              <td className="text-left font-bold">
                [{hall.server_name}] {hall.character_name}
              </td>
              <td>{hall.complete_time} </td>
              <td>{hall.like_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
