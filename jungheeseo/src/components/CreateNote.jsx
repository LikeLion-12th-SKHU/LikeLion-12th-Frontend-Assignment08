import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
  margin-top: 30px;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  height: 20px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 5px;
  background: blueviolet;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: #d9d9d9;
  }
`;

function CreateNote({ todos, setTodos }) {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");

  // useNavigate 훅을 사용하여 경로 변경
  const navigate = useNavigate();

  // 폼을 제출할 때 실행되는 함수
  const handleCreate = () => {
    // 새로운 메모 객체를 생성
    const newNote = {
      id: Date.now().toString(), // 임의의 ID 생성
      createdTime: new Date().toISOString(), // 현재 시간을 ISO 형식으로 변환
      fields: { name, content, writer },
    };

    setTodos([...todos, newNote]); // 새로운 메모를 추가
    alert("노트 생성이 완료되었어요!");
    navigate("/"); // 홈 페이지로 이동
  };

  return (
    <Container>
      <Title>메모 생성 페이지</Title>
      <FormGroup>
        <Label>제목</Label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>내용</Label>
        <Input value={content} onChange={(e) => setContent(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label>작성자</Label>
        <Input
          type="text"
          value={writer}
          onChange={(e) => setWriter(e.target.value)}
        />
      </FormGroup>
      {/* 메모 생성 버튼 */}
      <Button onClick={handleCreate}>메모 생성</Button>
    </Container>
  );
}

export default CreateNote;
