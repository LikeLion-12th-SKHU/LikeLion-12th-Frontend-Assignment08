import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoList from './components/TodoList';
import Memo from './components/Memo'; // Memo 컴포넌트를 임포트합니다.
import NoteDetail from './components/NoteDetail'; // NoteDetail 컴포넌트를 임포트합니다.
import styled from 'styled-components';

const FloatingButton = styled.button`
  position: fixed;
  right: 20px;
  bottom: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 24px;
  cursor: pointer;
`;

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={<TodoList />} />
          <Route path="/note/create" element={<Memo />} />
          <Route path="/note/:id" element={<NoteDetail />} />
        </Routes>
        <FloatingButton onClick={() => window.location.href='/note/create'}>+</FloatingButton>
      </div>
    </Router>
  );
}

export default App;
