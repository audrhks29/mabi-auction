import { LoaderCircle, RefreshCcw, Wrench } from "lucide-react";

export function ErrorData({ data }: { data: NpcTypes | HornTypes }) {
  if (data?.error?.name === "OPENAPI00009")
    return (
      <Container
        icon={<RefreshCcw size={40} />}
        text="API 서버에서 데이터를 갱신중입니다. 잠시후에 새로고침 해주시기 바랍니다."
      />
    );

  if (data?.error?.name === "OPENAPI00010")
    return <Container icon={<Wrench size={40} />} text="게임서버가 점검중입니다." />;
}

export function FetchingData() {
  return <Container icon={<LoaderCircle size={40} className="animate-spin" />} text="데이터를 불러오는중입니다." />;
}

function Container({ icon, text }: { icon: any; text: string }) {
  return (
    <div className="w-full h-[500px] bg-base-200 flex flex-col gap-3 justify-center items-center">
      <div>{icon}</div>
      <div>{text}</div>
    </div>
  );
}
