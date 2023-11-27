import { CheckersGame } from "./modules/game";
import { Board } from "./modules/board";
import { CheckersDOMPrinter } from "./modules/printer";
import { Player } from "./modules/player";

document.addEventListener("DOMContentLoaded", function () {
  const appContainerRef = document.getElementById("app");

  if (!appContainerRef) {
    throw new Error("App container not found!");
  }

  const board = new Board();
  const printer = new CheckersDOMPrinter({ appContainerRef });
  const game = new CheckersGame({ board, printer });

  const player1 = new Player("Unplauz");
  const player2 = new Player("Ajmag");

  game.addPlayer(player1, CheckersGame.getStartingPositionForWhite());
  game.addPlayer(player2, CheckersGame.getStartingPositionForBlack());

  game.init();
});
