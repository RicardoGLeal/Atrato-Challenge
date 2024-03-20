import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import CardEdit from "./routes/EditView";
import CreateView from "./routes/CreateView";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/new" element={<CreateView />} />
      <Route exact path="/edit" element={<CardEdit />} />
    </Routes>
  );
}

export default App;
