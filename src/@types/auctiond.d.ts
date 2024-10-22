interface AuctionSearchFormTypes {
  inputText: string;
}

interface ItemCategoryStateType {
  category: string | null;
  detailCategory: string | null;
}

interface ItemListsTypes {
  item_name: string;
  item_display_name: string;
  item_count: number;
  auction_price_per_unit: number;
  date_auction_expire: string;
  item_option: [
    {
      option_type: string;
      option_sub_type: string;
      option_value: string;
      option_value2: string;
      option_desc: string;
    },
  ];
}

interface ItemCategoryTypes {
  category: null;
  detailCategory: null;
}
