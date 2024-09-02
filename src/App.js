import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CardList from "./components/CardList";
import Modal from "./components/Modal";
import "./App.css";

function App() {
  const [cards, setCards] = useState(() => {
    const savedCards = localStorage.getItem("cards");
    return savedCards ? JSON.parse(savedCards) : [];
  });

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(null);
  const [isDndEnabled, setIsDndEnabled] = useState(true);

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  const handleSaveCard = (card) => {
    const newCards = [...cards];
    if (
      isEditing &&
      currentCardIndex !== null &&
      currentCardIndex < newCards.length
    ) {
      newCards[currentCardIndex] = card;
    } else {
      newCards.push(card);
    }
    setCards(newCards);
    setShowModal(false);
    setIsEditing(false);
    setCurrentCardIndex(null);
  };

  const handleDeleteCard = (index) => {
    const newCards = [...cards];
    newCards.splice(index, 1);
    setCards(newCards);

    // If the currentCardIndex was the one deleted, reset it to null
    if (currentCardIndex !== null && currentCardIndex >= newCards.length) {
      setCurrentCardIndex(null);
    }
  };

  const handleAddCardClick = () => {
    setShowModal(true);
    setIsEditing(false);
    setCurrentCardIndex(null);
  };

  const handleEditCard = (index) => {
    setCurrentCardIndex(index);
    setIsEditing(true);
    setShowModal(true);
  };

  const moveCard = (dragIndex, hoverIndex) => {
    if (!isDndEnabled) return;

    const newCards = [...cards];
    const draggedCard = newCards[dragIndex];
    newCards.splice(dragIndex, 1);
    newCards.splice(hoverIndex, 0, draggedCard);
    setCards(newCards);

    // Update currentCardIndex if needed
    if (currentCardIndex === dragIndex) {
      setCurrentCardIndex(hoverIndex);
    }
  };

  const toggleDnd = () => {
    setIsDndEnabled(!isDndEnabled);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <CardList
          cards={cards}
          onAddCardClick={handleAddCardClick}
          onDeleteCard={handleDeleteCard}
          onEditCard={handleEditCard}
          moveCard={moveCard}
        />
        <Modal
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleSave={handleSaveCard}
          title={
            isEditing &&
            currentCardIndex !== null &&
            currentCardIndex < cards.length
              ? cards[currentCardIndex]?.title || ""
              : ""
          }
          description={
            isEditing &&
            currentCardIndex !== null &&
            currentCardIndex < cards.length
              ? cards[currentCardIndex]?.description || ""
              : ""
          }
          toggleDnd={toggleDnd}
          isDndEnabled={isDndEnabled}
        />
      </div>
    </DndProvider>
  );
}

export default App;
