export const Shield = function() {
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
    var overloadDamage = 0;
    this.energyRemaining += energyToTransfer;
    if (this.energyRemaining > 10000) this.energyRemaining = 10000;
    if (this.energyRemaining < 0) {
      overloadDamage = Math.abs(this.energyRemaining);
      this.energyRemaining = 0;
    }
    return overloadDamage;
  }
};

Shield.prototype.setShield = function(val) {
  this.up = val;
};
