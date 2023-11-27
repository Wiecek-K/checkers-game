import { Field } from "./field";
import { Piece } from "./piece";

interface IPrinterSettings {
  appContainerRef?: HTMLElement;
}
// export class Printer {
//   settings: IPrinterSettings = {};

//   init() {
//     this.#throwError();
//   }

//   renderBoard() {
//     this.#throwError();
//   }

//   #throwError(message = "Implement") {
//     throw new Error(message);
//   }
// }

export class CheckersDOMPrinter {
  #devMode = true;
  #boardRef: HTMLElement | null = null;
  settings: IPrinterSettings = {};

  constructor(settings: IPrinterSettings) {
    this.settings = settings;
  }

  init({ boardData }: any) {
    const { appContainerRef } = this.settings;

    this.#boardRef = this.#createBoard();
    appContainerRef?.appendChild(this.#boardRef);

    this.renderBoard(boardData);
  }

  renderBoard(data) {
    if (!this.#boardRef) {
      throw new Error("boardRef does not exist!");
    }
    this.#boardRef.innerHTML = "";

    data.forEach((row: Field[], rowIndex) => {
      row.forEach((field, colIndex) => {
        const fieldRef = this.#createField(rowIndex, colIndex);
        if (field && !field.isEmpty()) {
          const pieceRef = this.#createPiece(field.piece as Piece);
          fieldRef.appendChild(pieceRef);
        }

        if (!this.#boardRef) {
          throw new Error("boardRef does not exist!");
        }
        this.#boardRef.appendChild(fieldRef);
      });
    });
  }

  #createBoard() {
    const div = document.createElement("div");
    div.id = "board";
    return div;
  }

  #createField(row: number, col: number) {
    const fieldRef = document.createElement("div");
    fieldRef.dataset.coord = `${row}${col}`;

    fieldRef.className = "cell";
    fieldRef.classList.add(`c${fieldRef.dataset.coord}`);

    if (this.#devMode) {
      const coordRef = document.createElement("div");
      coordRef.className = "coord";
      coordRef.innerText = fieldRef.dataset.coord;

      fieldRef.appendChild(coordRef);
    }

    return fieldRef;
  }

  #createPiece(piece: Piece) {
    const div = document.createElement("div");
    div.classList.add("piece", piece.name);
    div.classList.add(`p${piece.player}`);

    div.dataset.player = "" + piece.player;

    return div;
  }
}
