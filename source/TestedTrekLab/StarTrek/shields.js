Shield = function() {
  this.up = false;
  this.energyRemaining = 9001;
  this.maxShieldEnergy = 10000;
  this.minShieldEnergy = 0;
};

Shield.prototype = {
  get isUp() {
    return this.up;
  },
  get remainingEnergy() {
    return this.energyRemaining;
  },
  transferEnergy: function(energyToTransfer) {
    this.energyRemaining = Math.max(this.minShieldEnergy, Math.min(this.energyRemaining + energyToTransfer, this.maxShieldEnergy))
  }
};

Shield.prototype.setShield = function (val) {
    this.up = val;
};
