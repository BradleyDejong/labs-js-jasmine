const RandomGenerator = function () { };
RandomGenerator.prototype = {
  generator: function () {
    return Math.random();
  },
  randomWithinLimitOf: function (n) {
    return Math.floor(this.generator() * n);
  }
};

export default RandomGenerator;