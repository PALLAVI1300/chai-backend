  import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/jokes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch jokes");
        }
        return response.json();
      })
      .then((data) => {
        setJokes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to fetch jokes");
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1>Chai aur Fullstack</h1>

      {loading && <h2>Loading jokes...</h2>}

      {error && <h2>{error}</h2>}

      {!loading && !error && (
        <>
          <h2>Jokes: {jokes.length}</h2>

          {jokes.map((joke) => (
            <div className="joke-card" key={joke.id}>
              <h3>{joke.title}</h3>
              <p>{joke.content}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;