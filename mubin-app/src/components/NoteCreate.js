import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// 다른 페이지로 이동할 떄 쓰이는 훅 NoteList 에도 썻으니까 주석 봐주세용
import axios from "../utils/axiosClient";
import styled from "styled-components";

const NoteCreateContainer = styled.div`
  width: 300px;
  height: 430px;
  text-align: center;
  padding: 50px;
  border: none;
  box-shadow: 4px 4px 5px 4px grey;
  border-radius: 10px;
  margin: 0 auto; // 수평 가운데 정렬
  position: absolute;
  top: 50%; //  상단 기준으로 50% 위치
  left: 50%; // 왼쪽 기준으로 50% 위치
  transform: translate(
    -50%,
    -50%
  ); //가로, 세로를 각각 50%만큼 이동하여 가운데 정렬
`;
const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  height: 70px;
`;
const Button = styled.button`
  padding: 10px 20px;
  width: 189px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
// ++ styled-components는 좀 구리네용. ㅎ . ㅎㅎ... css 까먹음 이슈;

const NoteCreate = () => {
  // useState를 사용하여 name, content, writer 의 상태를 선언하였움
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const navigate = useNavigate();
  // React router 를 사용하여 페이지 간 이동을 수행하기 위힌

  // 폼 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() === "" && content.trim() === "" && writer.trim() === "") {
      alert("공백 메모는 생성할 수 없습니다.");
      // 공백인 메모는 생성할 수 없음
      // 아무것도 작성 안 하고 눌러도 생성 x
    } else {
      try {
        // axios를 사용하여 post 요청을 보냅니다.
        // axios는 HTTP 클라이언트 라이브러리로, 서버와의 통신을 담당
        // post는 요청은 클라이언트가 서버로 데이터를 전송할 때 사용
        // 클라이언트가 서버에 데이터를 전송하여 서버에서 해당 데이터를 처리할 수 있도록 하는 것을 의미함!!
        const response = await axios.post("/todos", {
          records: [
            {
              fields: {
                //사용자가 입력한 이름, 내용,제목 등을 서버에 전송하는 역할을 합니다!!
                name,
                content,
                writer,
              },
            },
          ],
        });
        alert("메모를 생성했어요!"); // 메모가 생성되었을 때
        navigate("/"); //메모를 생성하고 원래 페이지로 돌아가요! 홈??
      } catch (error) {
        console.error(error); // 에러가 생겼을 떄 출력
      }
    }
  };
  // 노트 반환
  return (
    <NoteCreateContainer>
      <div className="container">
        <h2>메모 생성</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="text" // 인풋 요소의 타입을 텍스트로 지정, 사용자가 텍스트로 입력 가능
            placeholder="제목" // 입력하기 전에 임시로 표시되는
            value={name}
            onChange={(e) => setName(e.target.value)} // 사용자가 입력한 (e.target.value)값을 setName에 넣는다.
          />

          <Input
            type="text"
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <Input
            type="text"
            placeholder="작성자"
            value={writer}
            onChange={(e) => setWriter(e.target.value)}
          />
          <Button type="submit">생성</Button>
        </form>
      </div>
    </NoteCreateContainer>
  );
};

export default NoteCreate;
