// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/cricket", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const playerSchema = new mongoose.Schema({
  name: String,
  team: String,
});

const performanceSchema = new mongoose.Schema({
  playerId: mongoose.Schema.Types.ObjectId,
  match: String,
  runs: Number,
  wickets: Number,
});

const Player = mongoose.model("Player", playerSchema);
const Performance = mongoose.model("Performance", performanceSchema);

// Routes
app.post("/add-player", async (req, res) => {
  const { name, team } = req.body;
  const player = new Player({ name, team });
  await player.save();
  res.json(player);
});

app.post("/add-performance", async (req, res) => {
  const { playerId, match, runs, wickets } = req.body;
  const perf = new Performance({ playerId, match, runs, wickets });
  await perf.save();
  res.json(perf);
});

app.get("/players", async (req, res) => {
  const players = await Player.find();
  const performances = await Performance.find();

  const result = players.map((player) => {
    const playerPerformances = performances.filter(
      (perf) => perf.playerId.toString() === player._id.toString()
    );
    return {
      ...player._doc,
      performances: playerPerformances,
    };
  });

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
