import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteList from "./components/NoteList";
import NoteCreate from "./components/NoteCreate";
import NoteDetail from "./components/NoteDetail";
// BrowserRouter는 HTML History API를 활용하여 브라우저의 url 동기화
// Router는 라우터의 경로와 일치하는 경우 특정 컴포넌트를 렌더링할 때 사용함
// Routes는 여러 개의 Router 컴포넌트를 그룹화, 중첩 레벨에 대한 라우팅을 구성할 떄 유리합니다!!
const App = () => {
  return (
    <Router>
      <Routes>
        {/* 노트들의 리스트들을 보여주는 */}
        <Route path="/" element={<NoteList />} />
        {/* 노트들을 만드는  */}
        <Route path="/note/create" element={<NoteCreate />} />
        {/* 노트들의 세부정보  */}
        <Route path="/note/:noteId" element={<NoteDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
