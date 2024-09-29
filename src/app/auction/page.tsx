import Auction from "@/components/auction/auction/Auction";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuctionPage() {
  return (
    <main className="inner">
      <Card className="pt-6">
        <CardContent>
          <Tabs defaultValue="auction" className="mb-3">
            <TabsList>
              <TabsTrigger value="auction">경매장</TabsTrigger>
              <TabsTrigger value="favorites">즐겨찾기</TabsTrigger>
              <TabsTrigger value="myauctions">내 경매</TabsTrigger>
            </TabsList>

            <TabsContent value="auction" className="border p-3 rounded-sm">
              <Auction />
            </TabsContent>

            <TabsContent value="favorites" className="border p-3 rounded-sm"></TabsContent>
            <TabsContent value="myauctions" className="border p-3 rounded-sm"></TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  );
}
