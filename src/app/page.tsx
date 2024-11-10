import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="inner">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>업데이트 내역</CardTitle>
        </CardHeader>
        <CardContent className="text-[14px]">
          <section>
            <article>
              <h2>1. 2024년 11월 10일 (v0.1.0)</h2>
              <p>- 베타 버전 릴리즈</p>
            </article>
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
