import React, { useState, useEffect } from "react";
import Card from "./Components/Card";

import "./App.css";

const constData = [
  { data: 1 },
  { data: 2 },
  { data: 3 },
  { data: 4 },
  { data: 5 },
  { data: 6 },
];

const App = () => {
  const [cards, setCards] = useState([]);
  const [totalMoves, setTotalMoves] = useState(0);
  const [totalPairs, setTotalPairs] = useState(0);
  const [choiceOne, setChoiceOne] = useState(0);
  const [choiceTwo, setChoiceTwo] = useState(0);

  const shuffleCards = () => {
    const shuffle = [...constData, ...constData]
      .sort(() => Math.random() - 0.5)
      .map((c) => {
        return { ...c, isFlipped: false, id: Math.random() * 0.5 };
      });

    setCards(shuffle);
    setTotalMoves(0);
    setTotalPairs(0);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    //Correct Pair
    if (choiceOne !== 0 && choiceTwo !== 0 && choiceOne === choiceTwo) {
      setTotalPairs(totalPairs + 1);
      setChoiceOne(0);
      setChoiceTwo(0);
      setTotalMoves(totalMoves + 1);
      console.log("CORRECT");
    } else if (totalPairs === 6) {
      setTimeout(() => {
        setCards(
          cards.map((c) => {
            return { ...c, isFlipped: false };
          })
        );

        shuffleCards();
      }, 1200);
    }

    //Incorrect Pair
    else if (choiceOne !== 0 && choiceTwo !== 0) {
      setTimeout(() => {
        setCards(
          cards.map((c) => {
            return c.isFlipped === true &&
              (c.data === choiceOne || c.data === choiceTwo)
              ? { ...c, isFlipped: false }
              : c;
          })
        );
      }, 500);

      setChoiceOne(0);
      setChoiceTwo(0);
      setTotalMoves(totalMoves + 1);
    }
  }, [choiceOne, choiceTwo, totalPairs]);

  const cardClick = (data, id, flipped) => {
    //If card is not flipped
    if (!flipped) {
      if (choiceOne === 0) setChoiceOne(data);
      else setChoiceTwo(data);

      //Update the flip state
      const updateData = cards.map((c) => {
        return c.id === id ? { ...c, isFlipped: true } : c;
      });

      setCards(updateData);
    }
  };

  return (
    <div>
      <div className="menu">
        <h3>Total Moves : {totalMoves}</h3>
        <h3>Pairs Found : {totalPairs}</h3>
        <button
          onClick={() => {
            shuffleCards();
          }}
          className="button"
        >
          {" "}
          Reset{" "}
        </button>
      </div>
      <div className="card-grid">
        {cards.map((c) => {
          return (
            <Card
              key={c.id}
              data={c.data}
              id={c.id}
              flipped={c.isFlipped}
              cardClick={cardClick}
            />
          );
        })}
      </div>
      <footer>
        <p className="footer">Copyright © 2022 , Asaad Abbasi</p>
      </footer>
    </div>
  );
};

export default App;
