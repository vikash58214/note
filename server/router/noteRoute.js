import express from "express";
import noteModel from "../model/note.js";
const router = express.Router();

router.post("/note", async (req, res) => {
  const { title, description, user } = req.body;
  const newNote = new noteModel({ title, description, user });
  await newNote.save();
  res.json({ message: "successfully" });
});

router.get("/getNotes/:id", async (req, res) => {
  try {
    const resp = await noteModel.find({ user: req.params.id });
    res.json(resp);
  } catch (err) {
    console.log(err);
  }
});
export { router as noteRouterr };
