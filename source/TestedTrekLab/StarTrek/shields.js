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
    if (this.energyRemaining > this.maxShieldEnergy)
      this.energyRemaining = this.maxShieldEnergy;
    if (this.energyRemaining < this.minShieldEnergy) {
      overloadDamage = Math.abs(this.energyRemaining);
      this.energyRemaining = this.minShieldEnergy;
    }
    return overloadDamage;
  }
};

Shield.prototype.setShield = function(val) {
  this.up = val;
};
