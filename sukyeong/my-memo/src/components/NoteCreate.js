import React, { useState } from "react";
import axios from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 스타일된 컴포넌트 정의
const StyledCreate = styled.div`
  display: flex; // 플렉스 컨테이너로 정렬
  flex-direction: column; // 세로 방향 정렬
  justify-content: center; // 가운데 정렬
  align-items: center; // 가운데 정렬
  padding: 20px; // 안쪽 여백
  margin: 0 auto; // 가운데 정렬
  width: 60vh; // 너비
  text-align: center; // 가운데 정렬
  background-color: #bdfcc9; // 배경색

  & h1 {
    padding: 10px; // 안쪽 여백
    margin-bottom: 50px; // 바깥 여백
    font-family: "Noto Sans"; // 폰트
  }

  & input {
    padding: 20px; // 안쪽 여백
    margin: 10px 10px 30px 10px; // 바깥 여백
    width: 40vh; // 너비
    border-radius: 1rem; // 테두리 모양
    border: 1px solid #ccc; // 테두리 스타일
    font-size: 1rem; // 글자 크기
  }

  & textarea {
    padding: 20px; // 안쪽 여백
    margin: 10px 10px 30px 10px; // 바깥 여백
    width: 40vh; // 너비
    border-radius: 1rem; // 테두리 모양
    border: 1px solid #ccc; // 테두리 스타일
    font-size: 1rem; // 글자 크기
  }

  & button {
    background-color: blue; // 배경색
    border: 1px solid blue; // 테두리 스타일
    color: white; // 글자색
    padding: 20px; // 안쪽 여백
    margin: 10px; // 바깥 여백
    width: 45vh; // 너비
    border-radius: 1rem; // 테두리 모양
    cursor: pointer; // 포인터 커서
    font-size: 1rem; // 글자 크기
  }

  & .error-message {
    color: red; // 글자색
    margin-top: 10px; // 바깥 여백
  }
`;

const NoteCreate = () => {
  const [title, setTitle] = useState(""); // 제목 상태
  const [content, setContent] = useState(""); // 내용 상태
  const [writer, setWriter] = useState(""); // 작성자 상태
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태
  const navigate = useNavigate(); // 네비게이션 함수

  // 메모 생성 함수
  const handleCreateMemo = async () => {
    // 제목, 내용, 작성자가 비어있으면 에러 메시지 설정
    if (!title || !content || !writer) {
      setErrorMessage("제목, 내용, 작성자를 모두 입력해주세요!");
      return;
    }

    try {
      // axios를 사용하여 서버에 POST 요청
      await axios.post("/todos", {
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
      alert("메모가 생성되었습니다!"); // 성공 메시지 알림
      navigate("/"); // 메인 페이지로 이동
    } catch (error) {
      console.error("Error creating memo:", error); // 오류 메시지 출력
      alert("메모 생성 중 오류가 발생했습니다!"); // 오류 알림
    }
  };

  // 입력 값 변경 시 호출되는 함수
  const handleInputChange = (e) => {
    if (errorMessage) {
      setErrorMessage(""); // 에러 메시지 초기화
    }

    const { name, value } = e.target; // 이벤트에서 name과 value 추출
    // name에 따라 상태 업데이트
    if (name === "title") {
      setTitle(value);
    } else if (name === "content") {
      setContent(value);
    } else if (name === "writer") {
      setWriter(value);
    }
  };

  return (
    <StyledCreate>
      <h1>📬 메모 생성 페이지</h1>
      <div>
        <label>제목</label>
        <br />
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>내용</label>
        <br />
        <textarea
          name="content"
          value={content}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div>
        <label>작성자</label>
        <br />
        <input
          type="text"
          name="writer"
          value={writer}
          onChange={handleInputChange}
        />
      </div>
      {/* 에러 메시지가 있으면 출력 */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button onClick={handleCreateMemo}>메모 생성</button>
    </StyledCreate>
  );
};

export default NoteCreate;
