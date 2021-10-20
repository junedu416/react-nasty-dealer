//Class to turn each API response into its own instance.
//Can probably add other card related functionality here
//E.g converting J,Q,K to 10 and A to 11/1

export default class Card {
    constructor(suit, value, imgString) {
        this.suit = suit;
        this.value = value;
        this.imgString = imgString;
    }
}