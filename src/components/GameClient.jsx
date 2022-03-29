import React from "react";
import { Client } from "boardgame.io/react";
import { Local } from "boardgame.io/multiplayer";
import GameDefinition from "../gameobjects/GameDefinition";
import PlayArea from "./PlayArea";
import GameInterface from "./GameInterface";

const GameClient = ({ playerCount = 1, ...props }) => {
  const ClientComponent = Client({
    game: GameDefinition,
    board: PlayArea,
    numPlayers: playerCount,
    multiplayer: Local(),

    loading: undefined,
    debug: {
      collapseOnLoad: true,
      hideToggleButton: false
    }
  });

  return (
    <>
      <GameInterface>
        <ClientComponent playerID="0" key={0} {...props} />
      </GameInterface>
    </>
  );
};

export default GameClient;
