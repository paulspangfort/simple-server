

export default class Game {
	constructor(players={}) {
		this.players = players;
		this.playerToAct = this.players != [] ? this.players[0] : null;

		console.log('initialized game, playesr are: ', this.players);
	}

	addPlayer = (player) => {
		this.players[player.id] = player;
		console.log('added a player, players are: now ', this.players);
	}

	removePlayer = (playerID) => {
		console.log('removing player', playerID);
		this.players = this.players.filter(player =>  player.id != playerID);
	}
}