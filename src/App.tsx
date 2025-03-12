import { useState } from "react";
import { getLetters, checkResponses, responseValues } from "./utils";

const noOfLetters = 20;
const probabilityOfMatch = 0.3;
const minNoOfMatches = 4;
const maxNoOfMatches = 8;
const initialResponses = new Array(noOfLetters).fill("");

function App() {
  const [letters, setLetters] = useState(
    getLetters(noOfLetters, probabilityOfMatch, minNoOfMatches, maxNoOfMatches)
  );
  const [lettersIndex, setLettersIndex] = useState(0);
  const [showLetter, setShowLetter] = useState(false);
  const [start, setStart] = useState(false);
  const [responses, setResponses] = useState(initialResponses);

  let interval: number;

  function startGame() {
    setStart(true);
    setLettersIndex(0);
    iterateLetters();
  }

  function iterateLetters() {
    let i = 0;
    interval = setInterval(() => {
      if (i == noOfLetters) {
        endGame();
        clearInterval(interval);
        return;
      }
      setLettersIndex(i);
      setShowLetter(true);
      setTimeout(() => {
        setShowLetter(false);
      }, 500);
      i++;
    }, 3000);
  }

  function resetGame() {
    setStart(false);
    setLetters(
      getLetters(
        noOfLetters,
        probabilityOfMatch,
        minNoOfMatches,
        maxNoOfMatches
      )
    );
    setLettersIndex(0);
    setShowLetter(false);
    setResponses(initialResponses);
    clearInterval(interval);
  }

  function endGame() {
    console.log("end game");
  }

  function matchPressed() {
    if (lettersIndex <= 1 || responses[lettersIndex]) return;
    console.log(responses[lettersIndex] ? "yes" : "no");
    console.log(responses);

    if (
      letters.lettersList[lettersIndex] == letters.lettersList[lettersIndex - 2]
    ) {
      setResponses((prev) => {
        const updatedResponses = [...prev];
        updatedResponses[lettersIndex] = responseValues.correct;
        return updatedResponses;
      });
    } else {
      setResponses((prev) => {
        const updatedResponses = [...prev];
        updatedResponses[lettersIndex] = responseValues.error;
        return updatedResponses;
      });
    }
  }

  return (
    <div className="full-page">
      <header>
        <h1>2-Back Cognitive Test</h1>
      </header>
      <section className="main-section">
        <div className="rules-section">
          <h2>Rules</h2>
          <p>
            Click the box below when you see the same letter as the letter two
            letters before. E.g. the sequence "hello" has no matches, while in
            the sequence "ababab" every letter after the second is a match.
          </p>
        </div>
        {!start ? (
          <button className="start-btn" onClick={() => startGame()}>
            Get started{" "}
          </button>
        ) : (
          <button className="game" onClick={() => matchPressed()}>
            <p className="game-item game-item-tag">Current letter:</p>
            <p className="game-item game-item-letter">
              {showLetter && letters.lettersList[lettersIndex]}
            </p>
          </button>
        )}
        <div>
          <p>Incorrect guesses: {checkResponses(responses).error}</p>
          <p>
            Correct guesses: {checkResponses(responses).correct} out of{" "}
            {letters.totalMatches}
          </p>
        </div>
        <button onClick={() => resetGame()}>Reset game</button>
      </section>
    </div>
  );
}

export default App;
