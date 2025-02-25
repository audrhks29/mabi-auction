export default function NeedLogin() {
  return (
    <div className="relative flex justify-center items-center min-h-[150px]">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-[14px]">
        로그인이 필요합니다.
      </div>
      <div className="relative w-24 h-24 animate-spin rounded-full bg-gradient-to-r from-card to-primary">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-primary-foreground rounded-full"></div>
      </div>
    </div>
  );
}
