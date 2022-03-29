import React, { useState } from "react";
import Card from "./Card";
import _ from "lodash";

const PlayArea = ({
  G: { cards },
  ctx,
  moves,
  events,
  reset,
  undo,
  redo,
  sendChatMessage,
  chatMessages,
  log,
  playerID,
  isActive,
  ...props
}) => {
  const [selectedCardPositions, setSelectedCardPositions] = useState({});
  const zIndexState = useState(1);

  const selectCard = (uuid) =>
    setSelectedCardPositions((currentSelectedCards) => ({
      ...currentSelectedCards,
      [uuid]: {}
    }));
  const deselectCard = (uuid) =>
    setSelectedCardPositions((currentSelectedCards) =>
      _.omit(currentSelectedCards, [uuid])
    );
  const setCardSelected = (uuid) => (doSelect) =>
    doSelect ? selectCard(uuid) : deselectCard(uuid);

  const [toggleMode, setToggleMode] = useState(false);
  const snap = (int, snap) => Math.round(int / snap) * snap;

  const onMouseMove = ({ nativeEvent: { x, y } }) => {
    setSelectedCardPositions((selectedCards) =>
      _.mapValues(selectedCards, (v) => ({
        x,
        y
      }))
    );
  };

  const commitMove = (uuid) => ({ x, y }) =>
    moves.moveCard(uuid, snap(x, 20), snap(y, 22));

  const onMouseUp = () => {
    setSelectedCardPositions({});
  };

  return (
    <div className="playArea" onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
      {cards.map((card) => (
        <Card
          card={card}
          key={card.uuid}
          displayPosition={selectedCardPositions[card.uuid]}
          commitMove={commitMove(card.uuid)}
          setCardSelected={setCardSelected(card.uuid)}
          toggleTapped={() => moves.toggleTapCard(card.uuid)}
          zIndexState={zIndexState}
          toggleMode={toggleMode}
          snap={snap}
        />
      ))}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px"
        }}
      >
        <button
          onClick={() => {
            undo();
          }}
        >
          Undo
        </button>
        <button
          onClick={() => {
            moves.spawnCard(
              100 + Math.random() * 100,
              100 + Math.random() * 100
            );
          }}
        >
          Draw Card
        </button>
        <button
          onClick={() => {
            setToggleMode((mode) => !mode);
          }}
        >
          Snap when dragging: {toggleMode ? "Yes" : "No"}
        </button>
      </div>
    </div>
  );
};

export default PlayArea;
