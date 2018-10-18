import Weapon from './Weapon';

export const Phasers = function(randomGenerator, energySource) {
    Weapon.call(this, randomGenerator);
    this.energySource = energySource;
};
Phasers.prototype = Object.create(Weapon.prototype);
Phasers.prototype.maxPhaserRange = 4000;
Phasers.prototype.fire = function(enemy, ui) {
    var amount = parseInt(ui.parameter("amount"), 10);

    const canFire = this.energySource.remaining >= amount;

    if (canFire) {
        return this.firePhaserAt(enemy, amount);
    } else {
        return ["Insufficient energy to fire phasers!"];
    }
};

Phasers.prototype.firePhaserAt = function(enemy, amount) {
    const distance = enemy.distance;
    var messages = [];
    if (distance > this.maxPhaserRange) {
        messages.push(
            "Klingon out of range of phasers at " + distance + " sectors..."
        );
    } else {
        var damage = this.calculateDamageByDistance(amount, distance);

        messages.push(
            "Phasers hit Klingon at " +
            distance +
            " sectors with " +
            damage +
            " units"
        );
        messages = messages.concat(this.applyDamageToTarget(enemy, damage));
    }
    this.energySource.subtract(amount);
    return messages;
};

Phasers.prototype.calculateDamageByDistance = function(maxDamage, distance) {
    const damageReductionByDistance = ((maxDamage / 20) * distance) / 200;
    const qualityOfStrikePenalty = this.randomWithinLimitOf(200);
    const finalDamage =
        maxDamage - (damageReductionByDistance + qualityOfStrikePenalty);
    return finalDamage < 1 ? 1 : finalDamage;
};

export default Phasers;