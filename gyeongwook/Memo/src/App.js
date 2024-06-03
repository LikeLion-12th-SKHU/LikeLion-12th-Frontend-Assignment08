import React from "react";
import Memo from "./components/Memo";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MemoCreate from "./components/MemoCreate";
import MemoDetail from "./components/MemoDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 메모 리스트 페이지 */}
        <Route path="/" element={<Memo />} />

        {/* 메모 생성 페이지 */}
        <Route path="/note/create" element={<MemoCreate />} />

        {/* 메모 상세 페이지 */}
        <Route path="/note/:memoId" element={<MemoDetail />} />
      </Routes>
    </Router>
  );
};
export default App;
