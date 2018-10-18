
import ShipResource from './ShipResource';
import Phasers from './Phasers';
import Torpedoes from './Torpedoes';
import RandomGenerator from './RandomGenerator';
import { Shield } from './shields';

const Ship = function(startingEnergy = 10000, startingShield = new Shield()) {
    this.energySource = new ShipResource(startingEnergy);
    this.torpedoTubes = new ShipResource(8);
    this.randomness = new RandomGenerator();
    this.shield = startingShield;
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
    
    transferReserveEnergyToShields: function(energyToTransfer) {
        this.energySource.subtract(energyToTransfer);
        this.shield.energyRemaining += energyToTransfer;
    }
};

export default Ship;
