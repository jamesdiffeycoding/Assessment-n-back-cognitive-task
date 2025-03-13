export function summariseScores(responses: string[]) {
  return {
    correct: responses.reduce((accum, value) => {
      if (value === RESPONSE_VALUES.correct) {
        accum++;
      }
      return accum;
    }, 0),
    error: responses.reduce((accum, value) => {
      if (value === RESPONSE_VALUES.error) {
        accum++;
      }
      return accum;
    }, 0),
  };
}

export function getLetters({
  length,
  minMatches,
  maxMatches,
  percentMatches,
}: {
  length: number;
  minMatches: number;
  maxMatches: number;
  percentMatches: number;
}) {
  const lettersList: string[] = [];
  let totalMatches = 0;
  while (totalMatches < minMatches || totalMatches > maxMatches) {
    totalMatches = 0; // reset total matches to 0 until correct value given
    for (let i = 0; i < length; i++) {
      if (i <= 1) {
        lettersList.push(getRandomLetter());
        continue;
      }
      if (matchProbability(percentMatches)) {
        lettersList.push(lettersList[i - 2]);
        totalMatches += 1;
      } else {
        let randomLetter = getRandomLetter();
        while (randomLetter === lettersList[i - 2]) {
          randomLetter = getRandomLetter(); // ensure random letter is not a match
        }
        lettersList.push(randomLetter);
      }
    }
  }
  return { lettersList, totalMatches };
}

function getRandomLetter() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet[Math.floor(Math.random() * 26)];
}

function matchProbability(percent: number) {
  return Math.random() < percent;
}

export const RESPONSE_VALUES = {
  correct: "correct",
  error: "error",
};
