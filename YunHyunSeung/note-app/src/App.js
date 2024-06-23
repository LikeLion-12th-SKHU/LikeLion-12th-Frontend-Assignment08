import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateMemo from "./components/Create";
import MainPage from "./components/Main";
import MemoDetails from "./components/Details";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/note/create" element={<CreateMemo />}></Route>
        <Route path="/note/:noteId" element={<MemoDetails />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
