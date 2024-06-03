import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "./utils/axiosClient";
import styled from "styled-components";

const MemoArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;
const MemoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: aliceblue;
  width: 350px;
  height: 350px;
  border-radius: 20px;
  box-shadow: 2px 2px #ccc;
  margin: 20px;
`;

const CreateBtn = styled.button`
  border: none;
  color: aliceblue;
  background-color: skyblue;
  width: 280px;
  height: 27px;
  border-radius: 5px;
`;

const CreateMemo = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const navigate = useNavigate();

  const handleCreateMemo = async () => {
    try {
      await axiosClient.post("/todos", {
        //post 요청
        fields: {
          name: title,
          content: content,
          writer: writer,
        },
      });
      alert("메모를 생성했어요!"); //성공 알림
      navigate("/"); //알림 후 메인 이동
    } catch (error) {
      alert("메모를 생성하는데 실패했습니다.");
    }
  };
  return (
    <>
      <MemoArea>
        <MemoWrap>
          <h2>메모 생성 페이지</h2>
          👀 제목
          <input
            type="text"
            value={title}
            size={40}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          👀 내용
          <input
            type="text"
            value={content}
            size={40}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          👀 작성자
          <input
            type="text"
            value={writer}
            size={40}
            onChange={(e) => {
              setWriter(e.target.value);
            }}
          />
          <br />
          <CreateBtn type="button" onClick={handleCreateMemo}>
            메모 생성
          </CreateBtn>
        </MemoWrap>
      </MemoArea>
    </>
  );
};
export default CreateMemo;
