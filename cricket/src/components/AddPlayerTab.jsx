import React, { useState } from "react";
import axios from "axios";

function AddPlayerTab({ onSuccess }) {
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/add-player", { name, team });
      setName("");
      setTeam("");
      onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Player Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Team</label>
        <input
          type="text"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Player
      </button>
    </form>
  );
}

export default AddPlayerTab;
