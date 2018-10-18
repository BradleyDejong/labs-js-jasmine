import Weapon from './Weapon';

export const Torpedoes = function(gen, torpedoSource) {
    Weapon.call(this, gen);
    this.torpedoMagazine = torpedoSource;
};
Torpedoes.prototype = Object.create(Weapon.prototype);

Torpedoes.prototype.fire = function(enemy) {
    const canFire = this.torpedoMagazine.remaining > 0;
    if (canFire) {
        return this.fireTorpedoAt(enemy);
    } else {
        return ["No more photon torpedoes!"];
    }
};

Torpedoes.prototype.fireTorpedoAt = function(enemy) {
    var messages = [];
    var distance = enemy.distance;
    if (this.randomWithinLimitOf(4) + (distance / 500 + 1) > 7) {
        messages.push("Torpedo missed Klingon at " + distance + " sectors...");
    } else {
        var damage = 800 + this.randomWithinLimitOf(50);
        messages.push(
            "Photons hit Klingon at " +
            distance +
            " sectors with " +
            damage +
            " units"
        );
        messages = messages.concat(this.applyDamageToTarget(enemy, damage));
    }
    this.torpedoMagazine.subtract(1);
    return messages;
};

export default Torpedoes;