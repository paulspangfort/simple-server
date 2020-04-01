

export default class Game {
	constructor(players) {
		this.players = players;
		this.playerToAct = players != [] ? this.players[0] : null;

		console.log('initialized game, playesr are: ', this.players);
	}

	addPlayer = (player) => {
		this.players.push(player);
		console.log('added a player, players are: ', this.players);
	}

	removePlayer = (playerID) => {
		this.players = this.players.filter(player =>  player.id != playerID);
	}
}