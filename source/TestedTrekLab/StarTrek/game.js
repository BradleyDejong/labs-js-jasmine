Game = function () {
    this.energy = 10000;
    this.torpedoes = 8;
    this.maxPhaserRange = 4000;
};

Game.prototype = {
    generator: function () {
        return Math.random();
    },
    randomWithinLimitOf: function (n) {
        return Math.floor(this.generator() * n);
    },
    calculateDamageByDistance: function (amount, distance) {
        var temp = (
            amount -
            (((amount / 20) * distance) / 200 + this.randomWithinLimitOf(200))
        );
        return temp < 1 ? 1 : temp;
    },
    applyDamageToTarget: function (enemy, damage) {
        var messages = [];
        if (damage < enemy.energy) {
            enemy.energy = enemy.energy - damage;
            messages.push("Klingon has " + enemy.energy + " remaining");
        } else {
            messages.push("Klingon destroyed!");
            enemy.destroy();
        }
        return messages;
    },

    subtractEnergyFromMeAndApplyDamangeToEnemy: function (enemy, amount) {
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
        this.energy -= amount;
        return messages;
    },
    fireTorpedoAt: function (enemy) {
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
            if (damage < enemy.energy) {
                enemy.energy = enemy.energy - damage;
                messages.push("Klingon has " + enemy.energy + " remaining");
            } else {
                messages.push("Klingon destroyed!");
                enemy.destroy();
            }
        }
        this.torpedoes--;
        return messages;
    },
    processCommand: function (ui) {
        if (ui.parameter("command") === "phaser") {
            var amount = parseInt(ui.parameter("amount"), 10);
            if (this.energy >= amount) {
                this.subtractEnergyFromMeAndApplyDamangeToEnemy(ui.variable("target"), amount).forEach(function (x) {
                    ui.writeLine(x);
                })
            } else {
                ui.writeLine("Insufficient energy to fire phasers!");
            }
        } else if (ui.parameter("command") === "photon") {
            if (this.torpedoes > 0) {
                this.fireTorpedoAt(ui.variable("target")).forEach(function (x) {
                    ui.writeLine(x);
                })
            } else {
                ui.writeLine("No more photon torpedoes!");
            }
        }
    }
};
