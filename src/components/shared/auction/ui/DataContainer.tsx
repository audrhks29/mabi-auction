import { ErrorData, FetchingData, NonData } from "../../DataState";
import ItemLists from "./ItemLists";

export default function DataContainer({ data, isFetching }: { data: AuctionTypes; isFetching: boolean }) {
  if (isFetching) return <FetchingData cn="h-[460px] lg:h-auto" />;

  if (data?.error?.name) {
    return <ErrorData error={data.error} cn="h-[500px] lg:h-auto" />;
  }

  if (data?.auction_history?.length === 0 || !data) return <NonData cn="h-[500px] lg:h-auto" />;

  return <ItemLists data={data?.auction_item || data?.auction_history} />;
}
