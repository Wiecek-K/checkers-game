import { Piece } from "./piece";
import { Checker } from "./checker";

export class Field {
  #piece: Piece | null = null;

  static factory(...params: any) {
    return new Field(...params);
  }

  static getDefaultPiece(playerIndex: number) {
    return new Checker(playerIndex);
  }

  constructor(piece: Piece | null = null) {
    if (piece === null) {
      console.log("pusty pionek");
    }
    this.piece = piece;
  }

  set piece(obj: Piece | null) {
    this.#piece = obj;
  }
  get piece() {
    return this.#piece;
  }

  isEmpty() {
    return !this.piece;
  }
  setEmpty() {
    this.piece = null;
  }
}
