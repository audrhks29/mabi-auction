function convertToRemainingTime(isoString: string) {
  const targetTime = new Date(isoString);
  const currentTime = new Date();

  const remainingTime = targetTime - currentTime;

  const hoursRemaining = Math.floor(remainingTime / (1000 * 60 * 60));
  const minutesRemaining = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));

  if (hoursRemaining > 0) {
    return `${hoursRemaining}시간`;
  } else {
    return `${minutesRemaining}분`;
  }
}

export default convertToRemainingTime;
