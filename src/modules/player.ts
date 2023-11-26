export class Player {
  #name = "Default name";

  constructor(name: string) {
    this.name = name;
  }

  get name() {
    return this.#name;
  }
  set name(value) {
    this.#name = value;
  }
}
