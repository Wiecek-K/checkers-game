import { Game } from "./modules/game";
import { Board } from "./modules/board";

document.addEventListener("DOMContentLoaded", function () {
  const appContainerRef = document.getElementById("app");

  if (!appContainerRef) {
    throw new Error("App container not found!");
  }

  const board = new Board(appContainerRef);
  const game = new Game({ board });

  const nowaZmienna = 22;

  game.init();
});
