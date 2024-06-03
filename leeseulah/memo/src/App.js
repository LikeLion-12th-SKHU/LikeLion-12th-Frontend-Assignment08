import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Todos from "./components/Todos";
import CreateNote from "./components/CreateNote";
import NoteDetail from "./components/NoteDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path="/note/create" element={<CreateNote />} />
        <Route path="/note/:noteId" element={<NoteDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
