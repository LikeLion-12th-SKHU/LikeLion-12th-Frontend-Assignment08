import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MemoList from "./components/MemoList";
import Creatememo from "./components/Creatememo";
import MemoDetail from "./components/MemoDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MemoList />} />
        <Route path="/note/create" element={<Creatememo />} />
        <Route path="/note/:noteid" element={<MemoDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
