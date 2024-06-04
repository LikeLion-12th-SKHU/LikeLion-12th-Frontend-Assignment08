import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../utils/axiosClient';
import styled from 'styled-components';

const NoteContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

const NoteCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  text-align: center;
`;

const NoteTitle = styled.h2`
  margin-bottom: 20px;
`;

const NoteContent = styled.p`
  margin-bottom: 20px;
`;

const NoteWriter = styled.p`
  color: #555;
  font-style: italic;
`;

function NoteDetail() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axiosClient.get(`/todos/${id}`);
        setNote(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching note:', error);
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) {
    return <NoteContainer>로딩 중...</NoteContainer>;
  }

  if (!note) {
    return <NoteContainer>메모를 불러올 수 없습니다.</NoteContainer>;
  }

  return (
    <NoteContainer>
      <NoteCard>
        <NoteTitle>{note.fields.name}</NoteTitle>
        <NoteContent>{note.fields.content}</NoteContent>
        <NoteWriter>{note.fields.writer}</NoteWriter>
        <p>{new Date(note.createdTime).toLocaleString()}</p>
      </NoteCard>
    </NoteContainer>
  );
}

export default NoteDetail;
