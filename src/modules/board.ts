import { Field } from "./field";
import { Piece } from "./piece";
export class Board {
  #fieldslist: string[][] | Field[][] = [
    ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"],
    ["10", "11", "12", "13", "14", "15", "16", "17", "18", "19"],
    ["20", "21", "22", "23", "24", "25", "26", "27", "28", "29"],
    ["30", "31", "32", "33", "34", "35", "36", "37", "38", "39"],
    ["40", "41", "42", "43", "44", "45", "46", "47", "48", "49"],
    ["50", "51", "52", "53", "54", "55", "56", "57", "58", "59"],
    ["60", "61", "62", "63", "64", "65", "66", "67", "68", "69"],
    ["70", "71", "72", "73", "74", "75", "76", "77", "78", "79"],
    ["80", "81", "82", "83", "84", "85", "86", "87", "88", "89"],
    ["90", "91", "92", "93", "94", "95", "96", "97", "98", "99"],
  ];
  get fieldsList() {
    const fieldsList = this.#fieldslist.map((row) => Object.freeze([...row]));

    return Object.freeze([...fieldsList]);
  }

  static getDefaultPiece(playerIndex: number) {
    return Field.getDefaultPiece(playerIndex);
  }

  init() {
    for (let i = 0; i < this.#fieldslist.length; i++) {
      for (let j = 0; j < this.#fieldslist.length; j++) {
        const field = this.getField(i + "" + j);
        if (!(field instanceof Field)) {
          this.setField(`${i}${j}`, new Field());
        }
      }
    }
  }

  #isCorrectCoord = function (coord: string) {
    return /^[0-9]{2}/i.test(coord);
  };

  getField = function (this: Board, coord: string) {
    if (!this.#isCorrectCoord(coord)) {
      throw new Error("Incorrect coords!");
    }

    const [rowIndex, colIndex] = coord;
    const numericRowIndex = +rowIndex;
    const numericColIndex = +colIndex;

    return this.#fieldslist[numericRowIndex][numericColIndex];
  };

  setField = function (this: Board, coord: string, value: Field) {
    if (!this.#isCorrectCoord(coord)) {
      throw new Error("Incorrect coords!");
    }
    const [rowIndex, colIndex] = coord;
    const numericRowIndex = +rowIndex;
    const numericColIndex = +colIndex;

    this.#fieldslist[numericRowIndex][numericColIndex] = value;
  };
  // constructor(boardRef: HTMLElement) {
  //   this.boardRef = boardRef;
  // }

  insertPieces(pieces: Record<string, Piece>, playerIndex: number) {
    const coords = Object.keys(pieces);
    coords.forEach((coord) => {
      const piece = pieces[coord];
      piece.player = playerIndex;

      this.setField(coord, Field.factory(piece));
    });
  }
}
