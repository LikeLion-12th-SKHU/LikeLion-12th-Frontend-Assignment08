import React, { useState } from "react";
import instance from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CreateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Text = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 8px;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  margin-bottom: 20px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  resize: none;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
`;

const MemoCreate = () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const navigate = useNavigate();

  // 메모 생성 함수
  const createMemo = async (e) => {
    e.preventDefault();
    try {
      await instance.post("/todos", {
        fields: {
          name,
          content,
          writer,
        },
      });
      alert("메모를 생성했어요");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CreateContainer>
      <Form onSubmit={createMemo}>
        <Text>메모 생성 페이지</Text>
        <div>
          <Label htmlFor="name">제목</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="content">내용</Label>
          <TextArea
            id="content"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="writer">작성자</Label>
          <Input
            id="writer"
            type="text"
            value={writer}
            onChange={(e) => setWriter(e.target.value)}
          />
        </div>
        <Button type="submit">메모 생성</Button>
      </Form>
    </CreateContainer>
  );
};

export default MemoCreate;
