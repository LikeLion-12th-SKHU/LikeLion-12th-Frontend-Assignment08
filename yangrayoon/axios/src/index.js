import React from "react";
import App from "./App";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import CreateMemo from "./CreateMemo";
import TodoDetail from "./components/TodoDetail";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/note/create" element={<CreateMemo />} />
      <Route path="/note/:noteId" element={<TodoDetail />} />
    </Routes>
  </Router>
);
