// Simple in-memory database para prototipagem rápida
// Para produção, usar SQLite ou PostgreSQL

export default class Database {
  constructor(dbPath) {
    this.games = new Map();
    this.players = new Map();
    this.rounds = new Map();
  }

  init() {
    // Nada a fazer para DB em memória
    console.log('✅ Database initialized (in-memory)');
  }

  async createGame(playerNames) {
    const gameId = Math.random().toString(36).substr(2, 9);
    const players = playerNames.map((name) => ({
      id: Math.random().toString(36).substr(2, 9),
      name,
      points: 10,
      status: 'active'
    }));

    this.games.set(gameId, {
      id: gameId,
      status: 'active',
      players,
      createdAt: new Date().toISOString()
    });

    return { id: gameId, players };
  }

  getGame(gameId) {
    return this.games.get(gameId) || null;
  }

  getAllGames() {
    return Array.from(this.games.values())
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);
  }

  updateGameState(gameId, gameState) {
    const game = this.games.get(gameId);
    if (game) {
      Object.assign(game, gameState);
    }
    return game;
  }

  closeDb() {
    // Nada a fazer para DB em memória
    console.log('Database closed');
  }
}
