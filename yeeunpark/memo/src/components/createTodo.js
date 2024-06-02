import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axiosClient from "../utils/axiosClient";

const CreateTodoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: aliceblue;
`;

const CreateTodoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 35vw;
  height: 55vh;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.p`
  font-size: 30px;
  font-weight: 500;
  padding-bottom: 15px;
  padding-top: 5px;
`;

const CreateTodoTxt = styled.p`
  font-size: 18px;
  padding: 15px;
`;

const CreateTodoInput = styled.input`
  padding: 5px;
  text-align: center;
  width: 15vw;
  border: 0.5px solid #aaa;
  border-radius: 5px;
`;

const CreateTodoBtn = styled.button`
  width: 23vw;
  height: 6vh;
  border: none;
  border-radius: 10px;
  color: white;
  background-color: #3293fa;
  margin-top: 40px;
`;

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleCreateTodo = async () => {
    if (!title || !content || !writer) {
      setErrorMessage(alert("모든 값을 입력 완료해주세요!"));
      return;
    }

    try {
      await axiosClient.post("/todos", {
        records: [
          {
            fields: {
              name: title,
              content,
              writer,
            },
          },
        ],
      });
      alert("메모가 생성되었습니다!");
      navigate("/");
    } catch (error) {
      console.error("에러", error);
      alert("메모 생성에 실패했습니다.");
    }
  };

  const handleInputChange = (e) => {
    if (errorMessage) {
      setErrorMessage("");
    }

    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "content") {
      setContent(value);
    } else if (name === "writer") {
      setWriter(value);
    }
  };

  return (
    <CreateTodoContainer>
      <CreateTodoWrap>
        <Title> 메모 추가 </Title> <CreateTodoTxt> 🍄제목🍄 </CreateTodoTxt>{" "}
        <CreateTodoInput
          type='text'
          placeholder='제목을 입력하세요'
          name='title'
          value={title}
          onChange={handleInputChange}
        />{" "}
        <CreateTodoTxt> 🍄내용🍄 </CreateTodoTxt>{" "}
        <CreateTodoInput
          type='text'
          placeholder='내용을 입력하세요'
          name='content'
          value={content}
          onChange={handleInputChange}
        />{" "}
        <CreateTodoTxt> 🍄작성자🍄 </CreateTodoTxt>{" "}
        <CreateTodoInput
          type='text'
          placeholder='작성자를 입력하세요'
          name='writer'
          value={writer}
          onChange={handleInputChange}
        />{" "}
        {errorMessage && <p className='error-message'> {errorMessage} </p>}{" "}
        <CreateTodoBtn onClick={handleCreateTodo}> 메모 생성 </CreateTodoBtn>{" "}
      </CreateTodoWrap>{" "}
    </CreateTodoContainer>
  );
};

export default CreateTodo;
