import { TurnOrder } from "boardgame.io/core";

const GameDefinition = {
  name: "Minion",
  minPlayers: 1,
  maxPlayers: 8,
  disableUndo: false,
  seed: undefined,

  setup: (ctx, setupData) => ({
    cards: [
      {
        title: "card1",
        x: 100,
        y: 100,
        tapped: false,
        uuid: crypto.randomUUID()
      },
      {
        title: "card2",
        x: 200,
        y: 100,
        tapped: false,
        uuid: crypto.randomUUID()
      }
    ]
  }),
  validateSetupData: (setupData, playerCount) => undefined,
  playerView: (G, ctx, playerId) => G,

  moves: {
    moveCard: {
      move: (G, ctx, uuid, x, y) => ({
        ...G,
        cards: G.cards.map((card) =>
          card.uuid === uuid ? { ...card, x, y } : card
        )
      }),
      undoable: true,
      redact: false,
      noLimit: true
    },
    spawnCard: {
      move: (G, ctx, x, y) => ({
        ...G,
        cards: [
          ...G.cards,
          {
            title: "newCard",
            x,
            y,
            uuid: crypto.randomUUID()
          }
        ]
      }),
      undoable: true,
      redact: false,
      noLimit: true
    },
    toggleTapCard: {
      move: (G, ctx, uuid) => ({
        ...G,
        cards: G.cards.map((card) =>
          card.uuid === uuid ? { ...card, tapped: !card.tapped } : card
        )
      }),
      undoable: true,
      redact: false,
      noLimit: true
    }
  },

  turn: {
    order: TurnOrder.DEFAULT,
    onBegin: (G, ctx) => G,
    onEnd: (G, ctx) => G,
    endIf: (G, ctx) => false,
    onMove: (G, ctx) => G,
    moveLimit: undefined,
    stages: {
      main: {
        moves: undefined,
        next: undefined
      }
    }
  },

  phases: {
    main: {
      onBegin: (G, ctx) => G,
      OnEnd: (G, ctx) => G,
      endIf: (G, ctx) => false,
      moves: undefined,
      turn: undefined
    }
  },

  endIf: (G, ctx) => false,
  onEnd: (G, ctx) => G
};

export default GameDefinition;
