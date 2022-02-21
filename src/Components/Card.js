import React from "react";

const Card = ({ data, id, flipped, cardClick }) => {
  return (
    <div
      className="card"
      onClick={() => {
        cardClick(data, id, flipped);
      }}
    >
      <div className="content">
        <div className={flipped ? "back" : "front"}>{flipped ? data : ""}</div>
      </div>
    </div>
  );
};

export default Card;
