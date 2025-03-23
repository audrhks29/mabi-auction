import { LoaderCircle, RefreshCcw, Wrench } from "lucide-react";

export function ErrorData({ error, cn }: { error: { name: string }; cn?: string }) {
  if (error?.name === "OPENAPI00009")
    return (
      <Container
        icon={<RefreshCcw size={40} />}
        text="API 서버에서 데이터를 갱신중입니다. 잠시후에 새로고침 해주시기 바랍니다."
        cn={cn}
      />
    );

  if (error?.name === "OPENAPI00010") return <Container icon={<Wrench size={40} />} text="게임서버가 점검중입니다." />;
}

export function FetchingData({ cn }: { cn?: string }) {
  return (
    <Container icon={<LoaderCircle size={40} className="animate-spin" />} text="데이터를 불러오는중입니다." cn={cn} />
  );
}

import { ServerCrash } from "lucide-react";

export function NonData({ cn, text }: { cn?: string; text?: string }) {
  return <Container icon={<ServerCrash size={40} />} text={text ? text : "검색된 결과가 없습니다."} cn={cn} />;
}

function Container({ icon, text, cn }: { icon: any; text: string; cn?: string }) {
  return (
    <div className={`w-full flex flex-col gap-3 text-[12px] md:text-[14px] justify-center items-center ${cn}`}>
      <div>{icon}</div>
      <div>{text}</div>
    </div>
  );
}
