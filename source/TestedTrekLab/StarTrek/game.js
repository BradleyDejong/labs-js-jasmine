Source = function(capacity) {
  this.remaining = capacity;
};

Source.prototype = {
  subtract(val) {
    this.remaining = this.remaining - val;
  }
};

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

Phasers = function(randomGenerator, energySource) {
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

Torpedoes = function(gen, torpedoSource) {
  Weapon.call(this, gen);
  this.torpedoMagazine = torpedoSource;
};
Torpedoes.prototype = Object.create(Weapon.prototype);

Torpedoes.prototype.fire = function(enemy) {
  console.log(this.torpedoMagazine);
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

Game = function() {
  this.energySource = new Source(10000);
  this.torpedoTubes = new Source(8);
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

RandomGenerator = function() {};

RandomGenerator.prototype = {
  generator: function() {
    return Math.random();
  },
  randomWithinLimitOf: function(n) {
    return Math.floor(this.generator() * n);
  }
};
