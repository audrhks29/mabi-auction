import Auction from "@/components/auction/auction/Auction";
import Developing from "@/components/shared/Developing";

export default function AuctionIndex() {
  return (
    <section className="pt-6">
      <div role="tablist" className="tabs tabs-lifted">
        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="경매장" defaultChecked />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <Auction />
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="즐겨찾기" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <Developing />
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="내 경매" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <Developing />
        </div>
      </div>
    </section>
  );
}
