// 경로: src/components/Memo.js
import React, { useState } from 'react';
import axiosClient from '../utils/axiosClient';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  width: 300px;
  height: 150px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 320px;
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;

function Memo() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [writer, setWriter] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post('/todos', {
        records: [
          {
            fields: {
              name: title,
              content: content,
              writer: writer,
            }
          }
        ]
      });
      alert('메모가 성공적으로 생성되었습니다!');
      window.location.href = '/';
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  return (
    <FormContainer>
      <h1>메모 생성 페이지</h1>
      <Form onSubmit={handleSubmit}>
        <Input 
          type="text" 
          placeholder="제목" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
        <Textarea 
          placeholder="내용" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          required 
        />
        <Input 
          type="text" 
          placeholder="작성자" 
          value={writer} 
          onChange={(e) => setWriter(e.target.value)} 
          required 
        />
        <Button type="submit">메모 생성</Button>
      </Form>
    </FormContainer>
  );
}

export default Memo;
