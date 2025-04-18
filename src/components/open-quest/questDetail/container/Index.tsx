import { Clock } from "lucide-react";

import Count from "./Count";
import Tag from "./Tag";
import Title from "./Title";
import CreatorInfo from "./CreatorInfo";
import Mission from "./Mission";
import Rank from "./Rank";
import QuestImage from "./QuestImage";

export default function QuestDetailContainerIndex({ data }: { data: QuestDetailTypes }) {
  const match = data?.image_url?.match(/openquest\/([^/]+)$/);

  return (
    <section className="flex gap-10">
      <article className="hidden lg:w-[300px] lg:flex lg:flex-col gap-2 lg:flex-shrink-0">
        <QuestImage match={match} title={data?.title} cn="rounded-xl" />
        <Count challenger_count={data?.challenger_count} like_count={data?.like_count} />

        <div className="border-2 p-3 flex gap-2 justify-center items-center font-bold rounded-xl">
          <Clock />
          <span>도전기간 {data?.challenge_period}일</span>
        </div>
      </article>

      <div className="flex flex-col gap-6 w-full">
        <article className="flex flex-col gap-2">
          <Tag tag={data?.tags} />

          <Title title={data?.title} />

          <CreatorInfo name={data?.creator_character_name} server={data?.creator_server_name} />
        </article>

        <Mission mission={data?.mission} />
        <Rank rank={data?.hall_of_fame} />
      </div>
    </section>
  );
}
