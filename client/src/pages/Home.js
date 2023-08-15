import React, { useState } from "react";
import { getUserID } from "../hooks/getUserID";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [noteList, setNoteList] = useState([" "]);

  const userID = getUserID();
  axios.get("http://localhost:3001/getNotes/" + userID).then((response) => {
    setNoteList(response.data);
  });

  const handleSubmitt = async (e) => {
    const userID = getUserID();
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/note", {
        title,
        description,
        user: userID,
      });
      alert("success");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitt}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="Description">Description</label>
        <input
          type="text"
          id="Description"
          name="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">+</button>
      </form>

      <div>
        {noteList.map((listt) => {
          return (
            <div className="note">
              key={listt.id}
              <h4>{listt.title}</h4>
              <p>{listt.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
