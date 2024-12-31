import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="inner">
      <div className="card bg-base-200">
        <div className="card-body text-[14px]">
          <div className="card-title">
            <h2>업데이트 내역</h2>
          </div>
          <section>
            <article>
              <h3>
                1. 2024년 11월 10일 (v0.1.0) <div className="badge badge-primary">NEW</div>
              </h3>
              <p>- 베타 버전 릴리즈</p>
            </article>
          </section>
        </div>
      </div>
    </main>
  );
}
