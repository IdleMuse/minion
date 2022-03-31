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

  const [snapMode, setSnapMode] = useState(false);
  const [shadowMode, setShadowMode] = useState(false);
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
          snapMode={snapMode}
          shadowMode={shadowMode}
          snap={snap}
        />
      ))}
      <footer>
        <div className="buttonGroup">
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
            setSnapMode((mode) => !mode);
          }}
        >
          Snap when dragging: {snapMode ? "Yes" : "No"}
        </button>
        <button
          onClick={() => {
            setSnapMode(false);
            setShadowMode((mode) => !mode)
          }}
        >
          Show shadow when dragging: {shadowMode ? "Yes" : "No"}
        </button>
        </div>
        <label>v{process.env.REACT_APP_VERSION}</label>
      </footer>
    </div>
  );
};

export default PlayArea;
