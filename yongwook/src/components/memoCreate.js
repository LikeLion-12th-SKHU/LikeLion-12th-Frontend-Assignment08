import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { memoSubmit } from "../utils/request";

const MemoCreateDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 5px;
  font-size: 14px;
  width: 200px;
`;

const CreateButton = styled.button`
  margin-top: 15px;
  padding: 8px;
  font-size: 14px;
  background-color: green;
  color: white;
  border: none;
  cursor: pointer;
  width: 200px;
`;

const MemoCreate = () => {
  const [name, setName] = useState(""); // 제목, 내용, 작성자 저장하기 위한 state
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const navigate = useNavigate();

  return (
    <MemoCreateDiv>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          memoSubmit(name, content, writer, navigate); // 함수 호출 시 name, content, writer 변수 전달
        }}
      >
        <h2>메모 생성 페이지</h2>
        <p>제목</p>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <p>내용</p>
        <Input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <p>작성자</p>
        <Input
          type="text"
          value={writer}
          onChange={(e) => setWriter(e.target.value)}
          required
        />
        <CreateButton type="submit">생성</CreateButton>
      </Form>
    </MemoCreateDiv>
  );
};

export default MemoCreate;
