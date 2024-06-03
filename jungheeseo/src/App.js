import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import NoteDetail from "./components/NoteDetail";
import CreateNote from "./components/CreateNote";
import data from "./data.json";

function App() {
  // 모든 메모를 관리하는 상태
  const [todos, setTodos] = useState([]);

  // 초기에 데이터를 가져와 todo 상태를 설정
  useEffect(() => {
    setTodos(data.records);
  }, []);

  return (
    <Router>
      <div className="App">
        {/* 홈 페이지로 이동하는 경로 설정 */}
        <Routes>
          <Route
            path="/"
            element={<Home todos={todos} setTodos={setTodos} />}
          />
          {/* 홈 페이지로 이동하는 경로 설정 */}
          <Route path="/note/:id" element={<NoteDetail todos={todos} />} />
          {/* 새 메모 생성 페이지로 이동하는 경로 설정 */}
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
