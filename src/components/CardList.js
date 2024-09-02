import React from "react";
import Card from "./Card";

const CardList = ({
  cards,
  onAddCardClick,
  onDeleteCard,
  onEditCard,
  moveCard,
}) => {
  const rows = [];
  let rowCards = [];

  cards.forEach((card, index) => {
    rowCards.push(
      <Card
        key={card.id}
        id={card.id}
        title={card.title}
        description={card.description}
        style={{ margin: "0 10px" }}
        onDelete={() => onDeleteCard(index)}
        onEdit={() => onEditCard(index)}
        index={index}
        moveCard={moveCard}
      />
    );

    if ((index + 1) % 4 === 0) {
      rows.push(
        <div
          key={`row-${index}`}
          className="card-row"
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          {rowCards}
        </div>
      );
      rowCards = [];
    }
  });

  rows.push(
    <div
      key="final-row"
      className="card-row"
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
      }}
    >
      {rowCards}
      <div
        key="add-new-card"
        className="card add-new-card"
        onClick={onAddCardClick}
        style={{
          margin: "0 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <span style={{ fontSize: "2em", color: "#007bff" }}>+</span>
      </div>
    </div>
  );

  return <div>{rows}</div>;
};

export default CardList;
