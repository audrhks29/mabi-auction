import ItemCategories from "./ItemCategories";

import { Card, CardContent } from "@/components/ui/card";

export default function SideBarCategory() {
  return (
    <Card className="hidden md:block overflow-y-auto">
      <CardContent>
        <ItemCategories cn="h-[655px]" />
      </CardContent>
    </Card>
  );
}
