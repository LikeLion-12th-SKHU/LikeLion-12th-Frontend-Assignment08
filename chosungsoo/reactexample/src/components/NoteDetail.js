import React, { useState, useEffect } from "react";
import axios from "../utils/axiosClient";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const NoteDetailContainer = styled.div`
  padding: 20px;
`;

function NoteDetail() {
  // URL 경로에서 id 파라미터를 가져옴
  const { id } = useParams();

  // 노트 데이터를 저장할 state 변수
  const [note, setNote] = useState(null);

  // 로딩 상태를 저장할 state 변수
  const [loading, setLoading] = useState(true);

  // useEffect 훅을 사용하여 id가 변경될 때마다 노트를 가져옴
  useEffect(() => {
    async function fetchNote() {
      try {
        // Axios를 사용하여 서버에서 노트 데이터를 가져옴
        const response = await axios.get(`/todos/${id}`);

        // 가져온 데이터를 state에 저장
        setNote(response.data);
      } catch (error) {
        // 에러 발생 시 콘솔에 에러 메시지 출력
        console.error("Error fetching note:", error);
      } finally {
        // 로딩 상태를 false로 설정
        setLoading(false);
      }
    }
    // useEffect 훅이 처음 실행될 때 fetchNote 함수를 실행
    fetchNote();
  }, [id]);

  // 로딩 중일 경우 로딩 메시지를 반환
  if (loading) {
    return <div>로딩 중...</div>;
  }

  // 노트가 없을 경우 에러 메시지를 반환
  if (!note) {
    return <div>메모를 찾을 수 없습니다.</div>;
  }

  // 노트가 있을 때 노트의 세부 정보를 표시
  const createdTime = new Date(note.createdTime).toISOString();

  return (
    <NoteDetailContainer>
      <h1>{note.fields.name}</h1>
      <p>{note.fields.content}</p>
      <p>{note.fields.writer}</p>
      <p>
        <strong>Created Time:</strong> {createdTime}
      </p>
    </NoteDetailContainer>
  );
}

export default NoteDetail;
