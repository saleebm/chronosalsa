// given the year guessed and the actual year, return the score for that year by assessing the
// year's distance from the other year using an exponential function (the closer the year, the
// higher the score)
// A perfect score is 1000
export const getScore = (yearGuessed: number, actualYear: number): number => {
  const guessDistance = Math.abs(yearGuessed - actualYear)
  console.log(
    `guessed ${yearGuessed}, actual ${actualYear}, distance ${guessDistance}`,
  )
  if (guessDistance > 20) {
    return 0
  } else if (guessDistance === 0) {
    return 1000
  }
  // exponential function with a that returns 1000 when perfect and then decreases as the
  // distance increases, but slowly increasing the decrease amount as the distance increases
  // (so that the score doesn't decrease too quickly)
  const score =
    1000 * Math.pow(0.9, guessDistance) * Math.pow(1.1, guessDistance / 4.2)
  return Math.round(score)
}
