import React, { useEffect, useState } from "react";
import axios from "axios";

function DashboardTab({ refresh }) {
  const [players, setPlayers] = useState([]);

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
  

  return (
    <div>
      {players.map((player) => (
        <div key={player._id} className="mb-4 p-4 border rounded shadow">
          <h2 className="text-xl font-semibold">
            {player.name} - {player.team}
          </h2>
          {player.performances.length > 0 ? (
            <ul className="list-disc pl-6">
              {player.performances.map((perf, index) => (
                <li key={index}>
                  Match: {perf.match}, Runs: {perf.runs}, Wickets: {perf.wickets}
                </li>
              ))}
            </ul>
          ) : (
            <p>No performances recorded.</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default DashboardTab;
