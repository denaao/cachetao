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

  processRound(gameId, winnerId, loserId, otherPlayerIds) {
    const game = this.games.get(gameId);
    if (!game) return null;

    // Find players by ID
    const winner = game.players.find((p) => p.id === winnerId);
    const loser = game.players.find((p) => p.id === loserId);

    if (!winner || !loser) return null;

    // Apply scoring rules:
    // Winner keeps points (no change)
    // Loser loses 2 points
    // Other players lose 1 point each

    // Winner: mantém pontos
    // (não faz nada, já mantém)

    // Loser: perde 2 pontos
    loser.points = Math.max(0, loser.points - 2);

    // All other active players lose 1 point
    game.players.forEach((player) => {
      if (
        player.id !== winnerId &&
        player.id !== loserId &&
        player.status === 'active'
      ) {
        player.points = Math.max(0, player.points - 1);
      }
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
