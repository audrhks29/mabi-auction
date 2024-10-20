// 날짜 한국시간으로 변환 함수
function convertToKoreanTime(isoString: string) {
  const date = new Date(isoString);

  // 날짜 포맷팅
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timeZone: "Asia/Seoul",
  };

  // 시간 포맷팅
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    timeZone: "Asia/Seoul",
  };

  const formattedDate = new Intl.DateTimeFormat("ko-KR", dateOptions).format(date);
  const formattedTime = new Intl.DateTimeFormat("ko-KR", timeOptions).format(date);

  return { formattedDate, formattedTime };
}
export default convertToKoreanTime; // 명명된 함수로 내보내기
