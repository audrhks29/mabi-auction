import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="inner">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>업데이트 내역</CardTitle>
        </CardHeader>
        <CardContent className="text-[14px]">
          <section>1. 0000년 00월 00일</section>
        </CardContent>
      </Card>
    </main>
  );
}
