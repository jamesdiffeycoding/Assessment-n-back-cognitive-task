import { useRef, useState } from "react";
import { getLetters, RESPONSE_VALUES, summariseScores } from "../utils";

export default function Game() {
  const listConfig = {
    length: 10,
    minMatches: 4,
    maxMatches: 8,
    percentMatches: 0.3,
  };
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

  const iterateConfig = {
    showMS: 500,
    hideMS: 2500,
  };

  function iterateLetters() {
    let i = 0;
    intervalRef.current = setInterval(() => {
      setLetterIndex(i);
      if (i == listConfig.length) {
        clearInterval(intervalRef.current || undefined);
        return;
      }
      setDisplayLetter(true);
      setTimeout(() => {
        setDisplayLetter(false);
      }, iterateConfig.showMS);
      i++;
    }, iterateConfig.hideMS);
  }

  function resetGame() {
    setLetters(getLetters(listConfig));
    setLetterIndex(0);
    setResponses(initialResponses);
    setDisplayLetter(false);
    setStart(false);
    clearInterval(intervalRef.current || undefined);
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
    <>
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
      {letterIndex == listConfig.length ? (
        <button className="game">
          You scored {summariseScores(responses).correct} /{" "}
          {letters.totalMatches} with {summariseScores(responses).error}{" "}
          false-positive{summariseScores(responses).error !== 1 && "s"}.
        </button>
      ) : (
        <button className="game" onClick={() => handleResponse()}>
          <p className="game-letter">
            {displayLetter ? letters.lettersList[letterIndex] : !start && "-"}
          </p>
        </button>
      )}
    </>
  );
}
