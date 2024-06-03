import React, { useState, useEffect } from "react";
import axiosClient from "../utils/axiosClient";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const NoteDetail = () => {
  const { noteId } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  // 컴포넌트가 마운트될 때 및 noteId가 변경될 때마다 노트를 가져옴
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axiosClient.get(`/todos/${noteId}`);
        setNote(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching note:", error);
        setLoading(false);
      }
    };
    fetchNote();
  }, [noteId]);

  // 로딩 중일 때 로딩 메시지 표시
  if (loading) {
    return <p>Loading...</p>;
  }

  // 노트가 없을 때 해당 메시지 표시
  if (!note) {
    return <p>Note not found</p>;
  }

  // 노트가 있을 때 노트의 세부 정부 표시
  const createdTime = new Date(note.createdTime).toISOString();

  return (
    <Container>
      <h1>Note Detail</h1>
      <p>
        <strong>Name:</strong> {note.fields.name || "No name"}
      </p>
      <p>
        <strong>Content:</strong> {note.fields.content || "No content"}
      </p>
      <p>
        <strong>Writer:</strong> {note.fields.writer || "No writer"}
      </p>
      <p>
        <strong>Created Time:</strong> {createdTime}
      </p>
    </Container>
  );
};

export default NoteDetail;
