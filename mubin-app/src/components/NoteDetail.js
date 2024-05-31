// NoteDetail.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// useParams를 사용함
// 동적으로 변하는 URL 값을 추출하는데 사용된다.

import axios from "../utils/axiosClient";
import styled from "styled-components";

const NoteDetailContainer = styled.div`
  width: 400px;
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
  position: relative;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 4px 4px 2px 0px grey;
  margin-right: 30px;
`;
// 노트 세부 정보를 표시하는 컴포넌트
const NoteDetail = () => {
  //useParams 훅을 사용하여 URL에서 noteId를 가져옴
  const { noteId } = useParams();
  // 노트 관리
  const [note, setNote] = useState(null);
  // 로딩 관리
  const [loading, setLoading] = useState(true);

  // noteId 가 변경될 때마다 실행됨
  // note의 세부 정보를 가져옴
  useEffect(() => {
    fetchNote();
  }, [noteId]);

  // 서버에서 노트의 세부 정보를 가져오는 함수!
  const fetchNote = async () => {
    try {
      // axios 를 사용하여 서버에서 노트 정보를 가져옴
      const response = await axios.get(`/todos/${noteId}`);
      setNote(response.data); // 가져온 정보를 노트 상태에 저장한다
      setLoading(false); // 로딩 false
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // 세상에서 제일 지루한 중학교는 ? 로딩 중~~😵😵
  if (loading) {
    return <div>로딩 중...</div>;
  }

  // 노트가 없을 때
  if (!note) {
    return <div>노트를 찾을 수 없습니다.</div>;
  }
  // 노트의 세부 정보를 화면에 표시!
  return (
    <NoteDetailContainer>
      <h3>{note.fields.createdTime}</h3>
      <h3>{note.fields.name}</h3>
      <p>{note.fields.content}</p>
      <p>{note.fields.writer}</p>
    </NoteDetailContainer>
  );
};

export default NoteDetail;
