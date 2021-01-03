import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBird, incrementBird } from "./store/birds/birds";
import "./styles.css";
export default function App() {
  const dispatch = useDispatch();
  const birds = [...useSelector((state) => state.birds)].sort((a, b) => {
    return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
  });
  const [birdName, setBird] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBird(birdName));
    setBird("");
  };
  return (
    <div className="wrapper">
      <h1>Bird List</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Add bird</p>
          <input
            type="text"
            value={birdName}
            onChange={(e) => setBird(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Add bird</button>
        </div>
      </form>
      <ul>
        {birds.map((bird) => (
          <li key={bird.name}>
            <h3>{bird.name}</h3>
            <div>Views: {bird.views}</div>
            <button onClick={() => dispatch(incrementBird(bird.name))}>
              <span role="img" aria-label="add">
                ➕
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
