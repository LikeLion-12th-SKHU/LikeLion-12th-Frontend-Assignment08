import React, { useState } from "react";
import axios from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NoteCreateContainer = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background: skyblue;
  color: white;
  border: none;
  cursor: pointer;
`;

function NoteCreate() {
  // 제목, 내용, 작성자를 저장할 state 변수
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");

  // react-router-dom의 useNavigate를 사용하여 페이지 이동
  const history = useNavigate();

  // 폼 제출 시 실행되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Axios를 사용하여 서버에 새 메모를 POST 요청
      await axios.post("/todos", {
        records: [
          {
            fields: { name, content, writer },
          },
        ],
      });

      // alert를 사용하여 메모 생성 완료 메시지 출력
      alert("메모를 생성했어요!");

      // history를 사용하여 NoteList 페이지로 이동
      history("/");
    } catch (error) {
      // 에러 발생 시 콘솔에 에러 메시지 출력
      console.error("Error creating note:", error);
    }
  };

  return (
    <NoteCreateContainer>
      <h1>메모 작성</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="제목"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <TextArea
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

        <Button type="submit">생성</Button>
      </Form>
    </NoteCreateContainer>
  );
}

export default NoteCreate;
