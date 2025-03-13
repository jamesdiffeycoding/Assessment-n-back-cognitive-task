import { useRef, useState } from "react";
import { getLetters, RESPONSE_VALUES, summariseScores } from "./utils";

const listConfig = {
  length: 20,
  minMatches: 4,
  maxMatches: 8,
  percentMatches: 0.3,
};

const displayConfig = {
  showMS: 500,
  hideMS: 2500,
};

function App() {
  const [letters, setLetters] = useState(getLetters(listConfig));

  const [letterIndex, setLetterIndex] = useState(0);

  const initialResponses = new Array(listConfig.length).fill("");
  const [responses, setResponses] = useState(initialResponses);

  const [displayLetter, setDisplayLetter] = useState(false);
  const [start, setStart] = useState(false);

  function startGame() {
    setStart(true);
    setLetterIndex(0);
    iterateLetters();
  }

  const intervalRef = useRef<number | null>(null); // interval must persist between renders

  function iterateLetters() {
    let i = 0;
    intervalRef.current = setInterval(() => {
      if (i == listConfig.length) {
        endGame();
        clearInterval(intervalRef.current || undefined);
        return;
      }
      setLetterIndex(i);
      setDisplayLetter(true);
      setTimeout(() => {
        setDisplayLetter(false);
      }, displayConfig.showMS);
      i++;
    }, displayConfig.hideMS);
  }

  function resetGame() {
    setLetters(getLetters(listConfig));
    setLetterIndex(0);
    setResponses(initialResponses);
    setDisplayLetter(false);
    setStart(false);
    clearInterval(intervalRef.current || undefined);
  }

  function endGame() {
    console.log("end game");
  }

  function handleResponse() {
    if (letterIndex <= 1 || responses[letterIndex]) return;
    if (
      letters.lettersList[letterIndex] == letters.lettersList[letterIndex - 2]
    ) {
      setResponses((prev) => {
        const updatedResponses = [...prev];
        updatedResponses[letterIndex] = RESPONSE_VALUES.correct;
        return updatedResponses;
      });
    } else {
      setResponses((prev) => {
        const updatedResponses = [...prev];
        updatedResponses[letterIndex] = RESPONSE_VALUES.error;
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
            Click the gray game box below when you see the same letter as the
            letter two letters before. E.g. the sequence "hello" has no matches,
            while in the sequence "ababab" every letter after the second is a
            match.
          </p>
        </div>
        <div>
          {start ? (
            <button className="btn reset-btn" onClick={() => resetGame()}>
              Reset game
            </button>
          ) : (
            <button className="btn start-btn" onClick={() => startGame()}>
              Get started{" "}
            </button>
          )}
        </div>
        <button className="game" onClick={() => handleResponse()}>
          <p className="game-letter">
            {" "}
            {displayLetter
              ? letters.lettersList[letterIndex]
              : start
              ? ""
              : "-"}
          </p>
          {letterIndex == listConfig.length - 1 &&
            "Well done, your score is below"}
        </button>
        <div>
          <p>Incorrect guesses: {summariseScores(responses).error}</p>
          <p>
            Correct guesses: {summariseScores(responses).correct} out of{" "}
            {letters.totalMatches}
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
