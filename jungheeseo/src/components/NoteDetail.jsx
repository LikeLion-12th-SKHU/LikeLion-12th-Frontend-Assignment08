import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import LoadingPage from "./LoadingPage";

const Container = styled.div`
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
  margin-top: 30px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Content = styled.p`
  margin-bottom: 15px;
  color: #333;
`;

function NoteDetail({ todos }) {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 로딩 상태를 시뮬레이션
    const selectedNote = todos.find((note) => note.id === id);
    setTimeout(() => {
      setNote(selectedNote);
      setLoading(false);
    }, 1000); // 1초간 로딩 상태
  }, [id, todos]);

  // 로딩 중이면 LoadingPage 컴포넌트를 렌더링
  if (loading) {
    return <LoadingPage />;
  }

  const { name, content, writer } = note.fields;
  const createTime = note.createdTime;

  return (
    <Container>
      <Content>{createTime}</Content>
      <Content>{content}</Content>
      <Content>{name}</Content>
      <Content>{writer}</Content>
    </Container>
  );
}

export default NoteDetail;
