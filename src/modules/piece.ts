export class Piece {
  _player = 9999;

  constructor(playerIndex: number) {
    this.player = playerIndex; 
  }

  get name() {
    return this.constructor.name.toLocaleLowerCase();
  }

  set player(value) {
    //do wyciecia
    this._player = value;
  }

  get player() {
    return this._player;
  }

  set playerIndex(value) {
    this._player = value;
  }

  get playerIndex() {
    return this._player;
  }
}
