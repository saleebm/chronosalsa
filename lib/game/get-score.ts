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
  const score = 1000 * Math.pow(0.5, guessDistance / 6.42)
  return Math.round(score)
}
