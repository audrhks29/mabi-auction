import Auction from "@/components/auction/Auction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";

export default function AuctionPage() {
  return (
    <main className="inner">
      <Card className="pt-6">
        <CardContent>
          <Tabs defaultValue="auction" className="mb-3">
            <TabsList>
              <TabsTrigger value="auction">경매장</TabsTrigger>
              <TabsTrigger value="favorites">즐겨찾기</TabsTrigger>
            </TabsList>

            <TabsContent value="auction" className="border p-3 rounded-sm">
              <Auction />
            </TabsContent>

            <TabsContent value="favorites" className="border p-3 rounded-sm"></TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  );
}
