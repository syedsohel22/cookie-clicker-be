import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  clicks: { type: Number, default: 0 },
  bonusPoints: { type: Number, default: 0 },
  prizes: { type: Number, default: 0 },
});

export default mongoose.model("User", userSchema);
