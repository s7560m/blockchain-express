class HoffCoin {
    constructor (initialValue) {
        this.value = initialValue;
        // this._initialValue = initialValue;
    }

    // get value() {
    //     return this._initialValue;
    // }
    getValue() {
        return this.value;
    }
}

module.exports = HoffCoin;