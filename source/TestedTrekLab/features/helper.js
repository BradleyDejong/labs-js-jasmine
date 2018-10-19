const { Given, When, Then } = require("cucumber");
import Ship from "../StarTrek/ship";
import { Klingon } from "../StarTrek/Klingon";
import { UserInterface } from "../Untouchables/userInterface";
import { assert } from "chai";

Given("a player ship", function() {
  this.setShip(new Ship());
});

Given("a weakling Klingon", function() {
  this.addBaddy(new Klingon(0, 100));
});

When("I shoot the first bad dude", function() {
  const ui = new UserInterface("phaser");
  ui.commandParameter = 500;
  ui.target = this.allBaddies[0];

  this.game.processCommand(ui);
});

Then("the first bad dude should be destroyed", function() {
  assert(this.allBaddies[0].isDestroyed);
});
