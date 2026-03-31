import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import GameSetup from './components/GameSetup';
import GameBoard from './components/GameBoard';
import TVDisplay from './components/TVDisplay';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function App() {
  const [gameState, setGameState] = useState(null);
  const [socket, setSocket] = useState(null);
  const [displayMode, setDisplayMode] = useState('control'); // 'control' or 'tv'

  useEffect(() => {
    const newSocket = io(API_URL);
    setSocket(newSocket);

    newSocket.on('game-state', (state) => {
      setGameState(state);
    });

    return () => newSocket.disconnect();
  }, []);

  const handleGameCreated = (game) => {
    setGameState(game);
    if (socket) {
      socket.emit('join-game', game.id);
    }
  };

  const handleRoundResult = (winner, loser, otherPlayers) => {
    if (socket && gameState) {
      socket.emit('round-result', {
        gameId: gameState.id,
        winner,
        loser,
        otherPlayers
      });
    }
  };

  const handleResetGame = () => {
    setGameState(null);
    setDisplayMode('control');
  };

  // TV Display Mode (full screen, large text)
  if (displayMode === 'tv') {
    return (
      <TVDisplay 
        gameState={gameState} 
        onExitTV={() => setDisplayMode('control')}
      />
    );
  }

  // Control Mode
  return (
    <div className="app">
      <header className="app-header">
        <h1>🎴 Cachetão</h1>
        <p>Sistema de Pontuação em Tempo Real</p>
      </header>

      <div className="container">
        {!gameState ? (
          <GameSetup onGameCreated={handleGameCreated} apiUrl={API_URL} />
        ) : (
          <>
            <button 
              className="btn btn-tv"
              onClick={() => setDisplayMode('tv')}
            >
              📺 Mostrar na TV
            </button>
            
            <GameBoard 
              gameState={gameState}
              onRoundResult={handleRoundResult}
              onResetGame={handleResetGame}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
