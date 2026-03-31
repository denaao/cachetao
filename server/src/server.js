import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import Database from './database.js';
import { GameController } from './gameController.js';

const app = express();
const httpServer = createServer(app);

const allowedOrigins = new Set([
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  process.env.FRONTEND_URL || '',
].filter(Boolean));

function isAllowedOrigin(origin) {
  if (!origin) {
    return true;
  }

  if (allowedOrigins.has(origin)) {
    return true;
  }

  try {
    const { hostname } = new URL(origin);
    return hostname.endsWith('.onrender.com');
  } catch {
    return false;
  }
}

const io = new Server(httpServer, {
  cors: {
    origin: (origin, callback) => {
      callback(null, isAllowedOrigin(origin));
    },
    methods: ['GET', 'POST'],
    credentials: true
  }
});

const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    callback(null, isAllowedOrigin(origin));
  },
  credentials: true
}));
app.use(express.json());

// Initialize database
const db = new Database('./cachetao.db');
db.init();

// Initialize game controller
const gameController = new GameController(db, io);

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/games', (req, res) => {
  const games = gameController.getAllGames();
  res.json(games);
});

app.post('/api/games', (req, res) => {
  const { playerNames } = req.body;
  
  if (!playerNames || playerNames.length < 3 || playerNames.length > 11) {
    return res.status(400).json({ error: 'Must have 3-11 players' });
  }

  const game = gameController.createGame(playerNames);
  res.json(game);
});

app.get('/api/games/:gameId', (req, res) => {
  const game = gameController.getGame(req.params.gameId);
  if (!game) {
    return res.status(404).json({ error: 'Game not found' });
  }
  res.json(game);
});

// Socket.IO events
io.on('connection', (socket) => {
  console.log(`🎮 Player connected: ${socket.id}`);

  socket.on('join-game', (gameId) => {
    socket.join(`game-${gameId}`);
    const game = gameController.getGame(gameId);
    if (game) {
      socket.emit('game-state', game);
      console.log(`📺 Player joined game: ${gameId}`);
    }
  });

  socket.on('round-result', (data) => {
    const { gameId, winner, loser, otherPlayers } = data;
    console.log(`⚡ Round result received for game ${gameId}`);
    
    const game = gameController.processRound(gameId, winner, loser, otherPlayers);
    
    if (game) {
      io.to(`game-${gameId}`).emit('game-state', game);
    }
  });

  socket.on('disconnect', () => {
    console.log(`👋 Player disconnected: ${socket.id}`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`\n`);
  console.log(`🎴 ========================================`);
  console.log(`🎴 Cachetão Server`);
  console.log(`🎴 Environment: ${NODE_ENV}`);
  console.log(`🎴 Running on http://localhost:${PORT}`);
  console.log(`🎴 ========================================\n`);
});
