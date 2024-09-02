import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { RiCloseCircleLine, RiEdit2Fill } from "react-icons/ri";

const Card = ({
  id,
  title,
  description,
  style,
  onDelete,
  onEdit,
  index,
  moveCard,
}) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: "CARD",
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className="card"
      style={{ ...style, opacity: isDragging ? 0.5 : 1 }}
    >
      <button className="delete-btn" onClick={onDelete}>
        <RiCloseCircleLine />
      </button>
      <button className="edit-btn" onClick={onEdit}>
        <RiEdit2Fill />
      </button>
      <h3>{title}</h3>
      <p>{description}</p>
      <button>Vezi mai mult</button>
    </div>
  );
};

export default Card;
