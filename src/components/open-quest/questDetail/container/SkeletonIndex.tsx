import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { FetchingData } from "@/components/shared/DataState";

export default function SkeletonIndex() {
  return (
    <section className="flex gap-10">
      <article className="hidden lg:w-[300px] lg:flex lg:flex-col gap-2 lg:flex-shrink-0">
        <Skeleton className="relative aspect-[9/6] w-full"></Skeleton>
        <Skeleton className="w-full h-[47px]"></Skeleton>
        <Skeleton className="w-full h-[51px]"></Skeleton>
      </article>

      <div className="flex flex-col gap-6 w-full">
        <article className="flex flex-col gap-2">
          <Skeleton className="w-[36px] h-[17px] sm:h-[19.5px]"></Skeleton>
          <Skeleton className="w-[360px] h-[27px] sm:h-[30px] md:text-[33px] lg:h-[36px] xl:h-[39px]"></Skeleton>
          <Skeleton className="w-[100px] h-[18px] sm:h-[21px]"></Skeleton>
        </article>

        <article>
          <h4 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-bold">미션</h4>
          <Separator className="mb-3" />
          <Skeleton className="h-[38px] h:text-[44px]"></Skeleton>
        </article>

        <article>
          <h4 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-bold">랭크</h4>
          <Separator className="mb-3" />
          <FetchingData cn="h-[300px]" />
        </article>
      </div>
    </section>
  );
}
