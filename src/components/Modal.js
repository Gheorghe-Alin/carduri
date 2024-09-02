import React, { useState, useEffect } from "react";

const Modal = ({
  show,
  handleClose,
  handleSave,
  title: initialTitle,
  description: initialDescription,
  toggleDnd,
  isDndEnabled,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedOption, setSelectedOption] = useState("Test 1");

  useEffect(() => {
    if (show) {
      setTitle(initialTitle || "");
      setDescription(initialDescription || "");
    }
  }, [show, initialTitle, initialDescription]);

  const saveCard = () => {
    handleSave({ title, description, selectedOption });
    setTitle("");
    setDescription("");
    setSelectedOption("Test 1");
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <div className="form-group">
          <label>Titlu:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Descriere:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Categoria:</label>
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="Test 1">Test 1</option>
            <option value="Test 2">Test 2</option>
          </select>
        </div>
        <button className="modal-button save-btn" onClick={saveCard}>
          Salvează
        </button>
        <button className="modal-button toggle-dnd-btn" onClick={toggleDnd}>
          {isDndEnabled ? "Dezactivează DND" : "Activează DND"}
        </button>
      </div>
    </div>
  );
};

export default Modal;
