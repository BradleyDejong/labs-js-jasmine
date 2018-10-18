const ShipResource = function(capacity) {
    this.remaining = capacity;
};

ShipResource.prototype = {
    subtract(val) {
        this.remaining = this.remaining - val;
    }
};

export default ShipResource;