
import ShipResource from './ShipResource';
import Phasers from './Phasers';
import Torpedoes from './Torpedoes';
import RandomGenerator from './RandomGenerator';

const Ship = function() {
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

// const Ship = function(phasers, torpedoes, shield, energy) {
//     this.phasers = phasers;
//     this.torpedoes = torpedoes;
//     this.shield = shield;
//     this.energy = energy;
// };


Ship.prototype = {

};

export default Ship;
