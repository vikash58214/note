import React, { useState } from "react";
import { getUserID } from "../hooks/getUserID";
import axios from "axios";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [noteList, setNoteList] = useState([" "]);
  const navigate = useNavigate();

  const userID = getUserID();

  axios.get("http://localhost:3001/getNotes/" + userID).then((response) => {
    setNoteList(response.data);
    console.log(userID);
  });

  const handleSubmitt = async (e) => {
    const userID = getUserID();
    e.preventDefault();
    if (userID == null) {
      alert("please login first");
      navigate("/auth");
    } else {
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
    }
  };

  return (
    <div className="vikash">
      <div className="form-area">
        <form onSubmit={handleSubmitt}>
          <div className="note-form">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="Description">Description</label>
            <textarea
              id="Description"
              name="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Add</button>
          </div>
        </form>
      </div>

      <div className="content">
        {noteList.map((listt) => {
          return (
            <div className="note">
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
