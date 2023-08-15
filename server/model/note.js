import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
});

const noteModel = mongoose.model("note", noteSchema);
export default noteModel;
