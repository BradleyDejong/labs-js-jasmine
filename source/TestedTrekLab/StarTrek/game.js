import ShipResource from './ShipResource';
import Phasers from './Phasers';
import Torpedoes from './Torpedoes';

export const Game = function() {
    this.energySource = new ShipResource(10000);
    this.torpedoTubes = new ShipResource(8);
    this.randomness = new RandomGenerator();

    const myPhasers = new Phasers(this.randomness, this.energySource);
    const myTorpedoes = new Torpedoes(this.randomness, this.torpedoTubes);

    this.weapons = {
        phaser: myPhasers.fire.bind(myPhasers),
        photon: myTorpedoes.fire.bind(myTorpedoes)
    };
};

Game.prototype = {
  processCommand: function(ui) {
    function writeAllMessages(msgs) {
      msgs.forEach(m => ui.writeLine(m));
    }

    const command = ui.parameter("command");
    const enemy = ui.variable("target");
    writeAllMessages(this.weapons[command](enemy, ui));
  }
};

const RandomGenerator = function() {};

RandomGenerator.prototype = {
  generator: function() {
    return Math.random();
  },
  randomWithinLimitOf: function(n) {
    return Math.floor(this.generator() * n);
  }
};
