import './TVDisplay.css';

export default function TVDisplay({ gameState, onExitTV }) {
  if (!gameState) {
    return <div>Nenhum jogo em andamento</div>;
  }

  const activePlayers = gameState.players || [];
  const sortedPlayers = [...activePlayers].sort((a, b) => b.points - a.points);

  return (
    <div className="tv-display">
      <button className="exit-btn" onClick={onExitTV}>← Sair</button>
      
      <header className="tv-header">
        <h1>🎴 CACHETÃO</h1>
        <p>PLACAR EM TEMPO REAL</p>
      </header>

      <main className="tv-main">
        <div className="tv-placar">
          {sortedPlayers.map((player, index) => (
            <div 
              key={player.id} 
              className={`tv-player-card ${player.status} ${index === 0 ? 'leader' : ''}`}
            >
              <div className="position-badge">{index + 1}º</div>
              <div className="player-details">
                <h2 className="tv-player-name">{player.name}</h2>
                <div className="tv-player-points">{player.points}</div>
              </div>
              <div className="status-indicator">
                {player.status === 'active' ? '✓' : '✗'}
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="tv-footer">
        <span>Jogadores Ativos: {activePlayers.filter(p => p.status === 'active').length}</span>
        <span>Total de Jogadores: {activePlayers.length}</span>
      </footer>
    </div>
  );
}
