import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { readMemo } from "../utils/request";

const MemoReadDiv = styled.div`
  width: 50%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;
`;

const MemoRead = () => {
  // 메모 상세 컴포넌트
  const { noteId } = useParams(); // URL 파라미터로 id 가져옴
  const [note, setNote] = useState(null); // 메모 저장하기 위한 state

  useEffect(() => {
    const fetchData = async () => {
      // 메모 불러오는 함수
      try {
        const record = await readMemo(noteId);
        setNote(record);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [noteId]); // noteId가 바뀔 때마다 실행

  if (!note) {
    return <div>로딩중</div>;
  }

  return (
    <MemoReadDiv>
      <p>{note.createdTime}</p>
      <h1>{note.fields.name}</h1>
      <p>{note.fields.content}</p>
      <p>{note.fields.writer}</p>
    </MemoReadDiv>
  );
};

export default MemoRead;
