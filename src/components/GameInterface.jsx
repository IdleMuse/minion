import React from "react";

const GameInterface = ({ children, ...props }) => {
  return (
    <main {...props}>
      <header></header>
      <section className="board">{children}</section>
      <footer></footer>
    </main>
  );
};

export default GameInterface;
