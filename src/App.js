import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState(null);
  const [games, setGames] = useState([]);

  const fetchGames = async () => {
    const response = await axios.get(
      'https://api.the-odds-api.com/v3/odds/?apiKey=API_KEY&sport=soccer_epl&region=uk&mkt=h2h&dateFormat=iso&oddsFormat=american'
    );
    setGames(response.data.data);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleLogin = (credentials) => {
    // Handle user login using credentials
    setUser(credentials);
  };

  const handleLogout = () => {
    // Handle user logout
    setUser(null);
  };

  const getOutcomeClass = (outcomeIndex) => {
    if (outcomeIndex === 0) {
      return 'outcome-green';
    } else if (outcomeIndex === 1) {
      return 'outcome-grey';
    } else {
      return 'outcome-red';
    }
  };


  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#">Betting Site</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">Bets</Nav.Link>
            <Nav.Link href="#">Account</Nav.Link>
          </Nav>
          {user ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={() => handleLogin({ email: 'test@test.com', password: 'password' })}>Login</button>
          )}
        </Navbar.Collapse>
      </Navbar>
      <div className="container">
        <h1>Today's Soccer Games</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Home Team</th>
              <th>Away Team</th>
              <th>Home Win</th>
              <th>Away Win</th>
              <th>Draw</th>
            </tr>
          </thead>
          <tbody>
  {games.map((game) => (
    <tr key={game.id}>
      <td>{game.teams[0]}</td>
      <td>{game.teams[1]}</td>
      <td className={getOutcomeClass(game.sites[0].odds.h2h[0] > game.sites[0].odds.h2h[1] ? 2 : 0)}>{game.sites[0].odds.h2h[0]}</td>
      <td className={getOutcomeClass(game.sites[0].odds.h2h[1] > game.sites[0].odds.h2h[0] ? 2 : 1)}>{game.sites[0].odds.h2h[1]}</td>
      <td className={getOutcomeClass(game.sites[0].odds.h2h[2] > game.sites[0].odds.h2h[0] && game.sites[0].odds.h2h[2] > game.sites[0].odds.h2h[1] ? 2 : (game.sites[0].odds.h2h[2] > game.sites[0].odds.h2h[1] ? 1 : 0))}>{game.sites[0].odds.h2h[2]}</td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </>
  );
};

export default App;
