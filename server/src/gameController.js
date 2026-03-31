export class GameController {
  constructor(db, io) {
    this.db = db;
    this.io = io;
    this.games = new Map(); // in-memory store de jogos
  }

  createGame(playerNames) {
    const gameId = Math.random().toString(36).substr(2, 9);
    
    const players = playerNames.map((name) => ({
      id: Math.random().toString(36).substr(2, 9),
      name,
      points: 10,
      status: 'active'
    }));

    const game = {
      id: gameId,
      status: 'active',
      players,
      createdAt: new Date().toISOString(),
      roundCount: 0
    };

    this.games.set(gameId, game);
    return game;
  }

  processRound(gameId, participantIds, winnerId) {
    const game = this.games.get(gameId);
    if (!game) return null;

    const activeParticipants = game.players.filter(
      (player) => participantIds.includes(player.id) && player.status === 'active'
    );
    const winner = activeParticipants.find((player) => player.id === winnerId);

    if (!winner || activeParticipants.length < 2) return null;

    game.players.forEach((player) => {
      if (player.status !== 'active') {
        return;
      }

      if (player.id === winnerId) {
        return;
      }

      if (participantIds.includes(player.id)) {
        player.points = Math.max(0, player.points - 2);
        return;
      }

      player.points = Math.max(0, player.points - 1);
    });

    // Update statuses (who's still alive)
    game.players.forEach((player) => {
      player.status = player.points > 0 ? 'active' : 'eliminated';
    });

    // Check if game is over (only 1 or 0 active players)
    const activePlayers = game.players.filter((p) => p.status === 'active');
    if (activePlayers.length <= 1) {
      game.status = 'finished';
    }

    game.roundCount++;

    return game;
  }

  getGame(gameId) {
    return this.games.get(gameId) || null;
  }

  getAllGames() {
    return Array.from(this.games.values())
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);
  }
}
