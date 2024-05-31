import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Note from "./components/Note";
import NoteCreate from "./components/NoteCreate";
import NoteDetail from "./components/NoteDetail";

// React 라우터를 사용하여 다른 컴포넌트를 렌더링하는 App 컴포넌트
const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* 기본 경로 ("/"): Note 컴포넌트 렌더링 */}
          <Route path="/" element={<Note />} />
          {/* "/note/create" 경로: NoteCreate 컴포넌트 렌더링 */}
          <Route path="/note/create" element={<NoteCreate />} />
          {/* "/note/:noteId" 경로: NoteDetail 컴포넌트 렌더링 */}
          <Route path="/note/:noteId" element={<NoteDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
