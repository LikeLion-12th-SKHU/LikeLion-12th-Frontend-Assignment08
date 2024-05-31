import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MemoMain from "./components/memoMain";
import MemoCreate from "./components/memoCreate";
import MemoRead from "./components/memoRead";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MemoMain />} />
        <Route path="/note/create" element={<MemoCreate />} />
        <Route path="/note/:noteId" element={<MemoRead />} />
      </Routes>
    </Router>
  );
};

export default App;
