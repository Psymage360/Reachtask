import React, { useState, useEffect } from 'react';

const API_TOKEN = 'lip_EX1qRuPrefZ9dMGWMdLA';

function App() {
  const [recentGames, setRecentGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameStatistics, setGameStatistics] = useState(null);

  useEffect(() => {
    const fetchRecentGames = async () => {
      try {
        const response = await fetch('https://lichess.org/api/account/Psymage360', {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch recent games');
        }
        const data = await response.json();
        setRecentGames(data.games);
      } catch (error) {
        console.error('Error fetching recent games:', error);
      }
    };

    fetchRecentGames();
  }, []);

  const handleGameSelect = async (gameId) => {
    setSelectedGame(gameId);
    try {
      const response = await fetch(`https://lichess.org/api/game/export/${gameId}`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch game statistics');
      }
      const data = await response.json();
      setGameStatistics(data);
    } catch (error) {
      console.error('Error fetching game statistics:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h2>Recent Games</h2>
          <ul>
            {recentGames.map(game => (
              <li key={game.id} onClick={() => handleGameSelect(game.id)}>
                {game.id} - {game.players.white.user.id} vs {game.players.black.user.id}
              </li>
            ))}
          </ul>
        </div>
        {selectedGame && gameStatistics && (
        <div>
        <h2>Game Statistics for {selectedGame}</h2>
        <ul>
            <li>Event: {gameStatistics.event}</li>
            <li>Site: {gameStatistics.site}</li>
            <li>Date: {gameStatistics.date}</li>
            {/* Add more statistics fields as needed */}
        </ul>
        </div>
)}

      </header>
    </div>
  );
}

export default App;
