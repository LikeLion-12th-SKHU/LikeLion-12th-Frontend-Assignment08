import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import NoteDetail from "./NoteDetail";
import CreateNote from "./CreateNote";
import data from "./data.json";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos(data.records);
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Home todos={todos} setTodos={setTodos} />}
          />
          <Route path="/note/:id" element={<NoteDetail />} />
          <Route
            path="/note/create"
            element={<CreateNote todos={todos} setTodos={setTodos} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
