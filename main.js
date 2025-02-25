import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import User from "./models/userModel.js";
import { fetchUserData } from "./jobs/fetchUserData.js";
import { calculateScore } from "./jobs/calculateScore.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("DB Connection Error:", err, err.message));

app.get("/", async (req, res) => res.send("Hello from the backend!"));
app.get("/user/:id", async (req, res) => {
  const user = await fetchUserData(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

app.post("/click/:id", async (req, res) => {
  const user = await fetchUserData(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  const { bonus, prize } = calculateScore();
  user.clicks += 1;
  user.bonusPoints += bonus;
  user.prizes += prize;

  await user.save();
  res.json({ clicks: user.clicks, bonus, prize });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
