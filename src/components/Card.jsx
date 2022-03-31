import { useState, useEffect } from "react";

const Card = ({
  card,
  displayPosition,
  commitMove,
  setCardSelected,
  zIndexState: [highestZ, setHighestZ],
  toggleTapped,
  snapMode,
  shadowMode,
  snap,
  ...props
}) => {
  const [isDragging, setDragging] = useState(false);
  const [dragPoint, setDragPoint] = useState({ x: 0, y: 0 });
  const [z, setZ] = useState(1);

  const position = {
    x: displayPosition && displayPosition.x ? displayPosition.x - dragPoint.x : card.x,
    y: displayPosition && displayPosition.y ? displayPosition.y - dragPoint.y : card.y
  };

  const snappedPosition = {
    x: snap(position.x, 20),
    y: snap(position.y, 22)
  }

  useEffect(() => {
    setDragPoint({ x: 0, y: 0 });
    setDragging(false);
  }, [card.x, card.y]);

  const startDragging = (e) => {
    e.preventDefault();
    setDragPoint({
      x: e.nativeEvent.offsetX - e.currentTarget.clientWidth / 2,
      y: e.nativeEvent.offsetY - e.currentTarget.clientHeight / 2
    });
    setDragging(true);
    setCardSelected(true);
    setZ(highestZ + 1);
    setHighestZ(highestZ + 1);
  };

  const stopDragging = (e) => {
    e.preventDefault();
    if (isDragging) {
      commitMove({
        x: position.x,
        y: position.y
      });
      setDragging(false);
    }
  };
  
  return (<>
    <div
      className="card"
      style={{
        background: "white",
        left: snapMode ? snappedPosition.x : position.x,
        top: snapMode ? snappedPosition.y : position.y,
        transform: "translate(-50%, -50%)",
        zIndex: z,
        rotate: card.tapped ? "0turn" : "0turn"
      }}
      onMouseDown={startDragging}
      onMouseUp={stopDragging}
      onDoubleClick={toggleTapped}
    >
      <h1>{card.title}</h1>
    </div>
    {shadowMode ? <div
      className="card"
      style={{
        background: "rgba(50,50,50,0.5)",
        border: "none",
        left: snappedPosition.x,
        top: snappedPosition.y,
        transform: "translate(-50%, -50%)",
        zIndex: 0,
        rotate: card.tapped ? "0turn" : "0turn"
      }}
    ></div>: null}
  </>);
};

export default Card;
