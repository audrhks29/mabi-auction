export default function Title({ title }: { title: string }) {
  return (
    <p className={`text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] font-bold`}>
      {title ? (
        <span>{title}</span>
      ) : (
        <span className="skeleton text-base-300 text-opacity-0">데이터 제목 스켈레톤 공간 입니다.</span>
      )}
    </p>
  );
}
