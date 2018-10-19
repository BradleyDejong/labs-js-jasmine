import Ship from "./ship";

export const Game = function() {
  this.ship = new Ship();
};

Game.prototype = {
  processCommand: function(ui) {
    function writeAllMessages(msgs) {
      msgs.forEach(m => ui.writeLine(m));
    }

    const command = ui.parameter("command");
    const enemy = ui.variable("target");
    const weapon = this.ship.weapons[command];
    writeAllMessages(weapon(enemy, ui));
  }
};
