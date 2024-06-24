import React, { useState, useEffect } from "react";
import axios from "../utils/axiosClient";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NoteListContainer = styled.div`
  padding: 20px;
`;

const Note = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ccc;
  margin: 5px 0;
`;

const DeleteButton = styled.button`
  background: red;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
`;

function NoteList() {
  // 노트 목록을 저장할 state 변수
  const [notes, setNotes] = useState([]);

  // 로딩 상태를 저장할 state 변수
  const [loading, setLoading] = useState(true);

  // useEffect 훅을 사용하여 컴포넌트가 마운트 될 때마다 노트 목록을 가져옴
  useEffect(() => {
    async function fetchNotes() {
      try {
        // Axios를 사용하여 서버에서 노트 목록을 가져옴
        const response = await axios.get("/todos");

        // 가져온 노트 목록을 state에 저장
        setNotes(response.data.records);
      } catch (error) {
        // 에러 발생 시 콘솔에 에러 메시지 출력
        console.error("Error fetching notes:", error);
      } finally {
        // 로딩 상태를 false로 설정
        setLoading(false);
      }
    }
    // useEffect 훅이 처음 실행될 때 fetchNotes 함수를 실행
    fetchNotes();
  }, []);

  // 노트를 삭제하는 함수
  const deleteNote = async (id) => {
    try {
      // Axios를 사용하여 서버에서 노트를 삭제
      await axios.delete(`/todos/${id}`);

      // alert를 사용하여 삭제 완료 메시지 출력
      alert("삭제가 완료되었어요!");

      // state에서 해당 노트를 제거
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      // 에러 발생 시 콘솔에 에러 메시지 출력
      console.error("Error deleting note:", error);
    }
  };

  // 로딩 중일 경우 로딩 메시지를 반환
  if (loading) {
    return <div>로딩 중...</div>;
  }

  // 노트 목록을 렌더링
  return (
    <NoteListContainer>
      <h1>메모 목록</h1>

      <Link to="/note/create">+ 메모 추가</Link>
      {notes.map((note) => (
        // 각 노트를 Note 컴포넌트로 렌더링
        <Note key={note.id}>
          <Link to={`/note/${note.id}`}>{note.fields.name}</Link>

          <DeleteButton onClick={() => deleteNote(note.id)}>X</DeleteButton>
        </Note>
      ))}
    </NoteListContainer>
  );
}

export default NoteList;
