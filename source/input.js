class Input {
  #directionX = 0;
  #directionY = 0;

  constructor() {
    document.addEventListener("keydown", (e) => {
      if (e.code == "KeyW") {
        this.#setAxisY(-1);
      }

      if (e.code == "KeyS") {
        this.#setAxisY(1);
      }

      if (e.code == "KeyA") {
        this.#getAxisX(-1);
      }

      if (e.code == "KeyD") {
        this.#getAxisX(1);
      }
    });
  }

  #setAxisY(direction) {
    this.#directionX = 0;
    this.#directionY = direction;
  }

  #getAxisX(direction) {
    this.#directionY = 0;
    this.#directionX = direction;
  }

  getDirectionX() {
    return this.#directionX;
  }

  getDirectionY() {
    return this.#directionY;
  }
}
