interface NpcTypes {
  date_inquire: string;
  date_shop_next_update: string;
  shop: NpcShopTypes[];
  shop_tab_count: number;
  error?: { name: string };
}

interface NpcShopTypes {
  tab_name: string;
  item?: NpcItemsTypes[];
}

interface NpcItemsTypes {
  image_url: string;
  item_count: number;
  item_display_name: string;
  item_option: ItemOptionTypes[];
  limit_type: string | null;
  limit_value: number | null;
  price: { price_type: string; price_value: number }[];
}
