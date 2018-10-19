import { Game } from "../StarTrek/game";
import { setWorldConstructor } from "cucumber";

class GameWorld {
  constructor() {
    this.game = new Game();
    this.allBaddies = [];
  }
  setShip(ship) {
    this.game.ship = ship;
  }

  addBaddy(b) {
    this.allBaddies.push(b);
  }
}

setWorldConstructor(GameWorld);
