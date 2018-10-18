export const Weapon = function(randomGenerator) {
    this.randomWithinLimitOf = n => {
        return Math.floor(randomGenerator.generator() * n);
    };
};

Weapon.prototype = {
    fire: () => {
        throw new Error("Implement me (fire)");
    },
    applyDamageToTarget: function(enemy, damage) {
        var messages = [];
        if (damage < enemy.energy) {
            enemy.energy = enemy.energy - damage;
            messages.push("Klingon has " + enemy.energy + " remaining");
        } else {
            messages.push("Klingon destroyed!");
            enemy.destroy();
        }
        return messages;
    }
};

export default Weapon;