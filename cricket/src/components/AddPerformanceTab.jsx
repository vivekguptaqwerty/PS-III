import React, { useEffect, useState } from "react";
import axios from "axios";

function AddPerformanceTab({ refresh, onSuccess }) {
  const [players, setPlayers] = useState([]);
  const [playerId, setPlayerId] = useState("");
  const [match, setMatch] = useState("");
  const [runs, setRuns] = useState("");
  const [wickets, setWickets] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/players")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setPlayers(res.data);
        } else {
          console.warn("Unexpected API response:", res.data);
          setPlayers([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching players:", err);
        setPlayers([]);
      });
  }, [refresh]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/add-performance", {
        playerId,
        match,
        runs: parseInt(runs),
        wickets: parseInt(wickets),
      });
      setPlayerId("");
      setMatch("");
      setRuns("");
      setWickets("");
      onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Select Player</label>
        <select
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
          className="border p-2 w-full"
          required
        >
          <option value="">Select</option>
          {players.map((player) => (
            <option key={player._id} value={player._id}>
              {player.name} ({player.team})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Match</label>
        <input
          type="text"
          value={match}
          onChange={(e) => setMatch(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Runs</label>
        <input
          type="number"
          value={runs}
          onChange={(e) => setRuns(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Wickets</label>
        <input
          type="number"
          value={wickets}
          onChange={(e) => setWickets(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Add Performance
      </button>
    </form>
  );
}

export default AddPerformanceTab;
