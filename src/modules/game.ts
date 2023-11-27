/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Board } from "./board";
import { Piece } from "./piece";
import { Player } from "./player";
import { CheckersDOMPrinter } from "./printer";

export class Game {
  _players: Player[] = [];

  _playersMinimum = 0;
  _playersLimit = 0;

  addPlayer(player: Player) {
    if (this._playersLimit <= this._players.length) {
      throw new Error("Too many players!");
    }
    this._players.push(player);
  }

  init() {
    if (
      this._players.length > this._playersLimit ||
      this._players.length < this._playersMinimum
    ) {
      console.log(this._players.length);
      console.log(this._playersLimit);
      console.log(this._playersMinimum);

      this._players.forEach((player) => {
        console.log(player);
      });
      throw new Error("Players number problem!");
    }
  }

  move() {
    console.log("MOVE!!!");
  }
}
export class CheckersGame extends Game {
  _playersMinimum = 2;
  _playersLimit = 2;

  #board: Board;
  #printer: CheckersDOMPrinter;
  #moves = [];

  constructor({
    board,
    printer,
  }: {
    board: Board;
    printer: CheckersDOMPrinter;
  }) {
    super();

    this.#board = board;
    this.#printer = printer;
  }

  init() {
    super.init();
    this.#board.init();

    this.#printer.init({ boardData: this.#board.fieldsList });
  }

  static getStartingPositionForBlack(
    columnsCount = 10,
    rowsCount = 4,
  ): Record<string, Piece> {
    const coords: Record<string, Piece> = {};
    for (let i = 0; i < rowsCount; i++) {
      for (let j = 0; j < columnsCount; j++) {
        if ((i + j) % 2 === 1) {
          coords[`${i}${j}`] = Board.getDefaultPiece(1);
        }
      }
    }
    return coords;
  }
  static getStartingPositionForWhite(columnsCount = 10, rowsCount = 4) {
    const coords: Record<string, Piece> = {};
    for (let i = columnsCount - rowsCount; i < columnsCount; i++) {
      for (let j = 0; j < columnsCount; j++) {
        if ((i + j) % 2 === 1) {
          coords[`${i}${j}`] = Board.getDefaultPiece(0);
        }
      }
    }

    return coords;
  }

  addPlayer(player: Player, pieces: Record<string, Piece> = {}) {
    super.addPlayer(player);

    const playerIndex = this._players.length - 1;
    this.#insertPiecesOnBoard(pieces, playerIndex);

    return playerIndex;
  }

  getActivePlayer() {
    return this._players[this.#getActivePlayerIndex()];
  }
  // getLastActivePlayer() {
  //   return this._players[this.#getLastActivePlayerIndex()];
  // }

  #insertPiecesOnBoard(pieces: Record<string, Piece>, playerIndex: number) {
    this.#board.insertPieces(pieces, playerIndex);
  }

  #getActivePlayerIndex() {
    return this.#moves.length % this._players.length;
  }
}
