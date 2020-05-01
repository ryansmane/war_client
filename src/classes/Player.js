class Player {
    constructor(id) {
        this.id = id;
        this.deck = [];
        this.ready = false;
    }

    removeTopThree() {
        let topThree = [];
        topThree.push(this.deck.pop());
        topThree.push(this.deck.pop());
        topThree.push(this.deck.pop());
        return topThree;
    }

    getTopCard() {
        return this.deck.pop();
    }

    addWinnings(winnings) {
        this.deck = winnings.concat(this.deck);
    }

}

exports.Player = Player;