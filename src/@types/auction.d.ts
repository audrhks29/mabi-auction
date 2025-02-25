import { ObjectId } from "mongodb";

interface AuctionSearchFormTypes {
  inputText: string;
}

interface ItemCategoryStateTypes {
  category: string | null;
  detailCategory: string | null;
}
declare global {
  interface ItemListsTypes {
    _id?: ObjectId;
    item_name: string;
    item_display_name: string;
    item_count: number;
    auction_price_per_unit: number;
    date_auction_expire: string;
    item_option: ItemOptionTypes[];
  }
}

interface ItemOptionTypes {
  option_type: string | undefined;
  option_sub_type: string | undefined;
  option_value: string | string[] | undefined;
  option_value2: string | undefined;
  option_desc: string | string[] | undefined;
}

interface ItemCategoryTypes {
  category: null;
  detailCategory: null;
}

interface ExtendedItemOptionTypes extends ItemOptionTypes {
  id: number;
  type: string;
  isDisplay: boolean;
}
