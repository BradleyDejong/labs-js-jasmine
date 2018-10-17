Weapon = function(randomGenerator) {
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

Phasers = function(randomGenerator) {
  Weapon.call(this, randomGenerator);
};
Phasers.prototype = Object.create(Weapon.prototype);
Phasers.prototype.maxPhaserRange = 4000;
Phasers.prototype.fire = function(ship, enemy, ui) {
  var amount = parseInt(ui.parameter("amount"), 10);

  const canFire = () => ship.energy >= amount;

  if (canFire()) {
    return this.firePhaserAt(ship, enemy, amount);
  } else {
    return ["Insufficient energy to fire phasers!"];
  }
};

Phasers.prototype.firePhaserAt = function(ship, enemy, amount) {
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
  ship.energy -= amount;
  return messages;
};

Phasers.prototype.calculateDamageByDistance = function(maxDamage, distance) {
  const damageReductionByDistance = ((maxDamage / 20) * distance) / 200;
  const qualityOfStrikePenalty = this.randomWithinLimitOf(200);
  const finalDamage =
    maxDamage - (damageReductionByDistance + qualityOfStrikePenalty);
  return finalDamage < 1 ? 1 : finalDamage;
};

Torpedoes = function(gen) {
  Weapon.call(this, gen);
};
Torpedoes.prototype = Object.create(Weapon.prototype);

Torpedoes.prototype.fire = function(ship, enemy) {
  const canFire = () => ship.torpedoes > 0;
  if (canFire()) {
    return this.fireTorpedoAt(ship, enemy);
  } else {
    return ["No more photon torpedoes!"];
  }
};

Torpedoes.prototype.fireTorpedoAt = function(ship, enemy) {
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
  ship.torpedoes--;
  return messages;
};

Game = function() {
  this.energy = 10000;
  this.torpedoes = 8;
};

Game.prototype = {
  generator: function() {
    return Math.random();
  },
  randomWithinLimitOf: function(n) {
    return Math.floor(this.generator() * n);
  },
  processCommand: function(ui) {
    function writeAllMessages(msgs) {
      msgs.forEach(m => ui.writeLine(m));
    }

    const myPhasers = new Phasers(this);
    const myTorpedoes = new Torpedoes(this);

    const weapons = {
      phaser: myPhasers.fire.bind(myPhasers), //this.tryFirePhaser.bind(this),
      photon: myTorpedoes.fire.bind(myTorpedoes)
    };

    const command = ui.parameter("command");
    const enemy = ui.variable("target");

    writeAllMessages(weapons[command](this, enemy, ui));
  }
};
