export function getLetters(
  numberOfLetters: number,
  probabilityOfMatch: number,
  minNoOfMatches: number,
  maxNoOfMatches: number
) {
  const lettersList: string[] = [];
  let totalMatches = 0;
  while (totalMatches < minNoOfMatches || totalMatches > maxNoOfMatches) {
    totalMatches = 0; // reset total matches to 0 until correct value given
    for (let i = 0; i < numberOfLetters; i++) {
      if (i <= 1) {
        lettersList.push(getRandomLetter());
        continue;
      }
      if (matchProbability(probabilityOfMatch)) {
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

function matchProbability(percent: number) {
  return Math.random() < percent;
}

function getRandomLetter() {
  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  return alphabet[Math.floor(Math.random() * 26)];
}

export const responseValues = {
  correct: "correct",
  error: "error",
};

export function checkResponses(responses: string[]) {
  return {
    correct: responses.reduce((accum, value) => {
      if (value === responseValues.correct) {
        accum++;
      }
      return accum;
    }, 0),
    error: responses.reduce((accum, value) => {
      if (value === responseValues.error) {
        accum++;
      }
      return accum;
    }, 0),
  };
}
