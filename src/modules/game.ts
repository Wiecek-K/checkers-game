import { Board, GameModules } from "./board";
export class CheckersGame {
  board: Board;
  constructor(modules: GameModules) {
    this.board = modules.board;
  }

  init() {
    this.board.initBoard();
  }
}
