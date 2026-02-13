import Board from "./Board.js";
import Controller from "./Controller.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");

  const board = new Board(container);
  board.createBoard();

  const controller = new Controller(board);
  controller.init();
});
