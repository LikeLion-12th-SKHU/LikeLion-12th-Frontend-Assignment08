import React, { useState, useEffect } from "react";
import axios from "../utils/axiosClient";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

// useNavigate는 페이지를 이동할 때 사용된다. Link를 써서 이동 시킬 수도 있지만 이 경우는 단순 이동
// useNavigate를 사용하면 특정 이벤트가 실행됐을 때 동작하도록 함

const NoteListContainer = styled.div`
  display: flex;
  justify-content: left;
  padding: 40px;
`;
// 각각의 노트 styled-component
const NoteItem = styled.div`
  width: 400px;
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
  position: relative;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 4px 4px 2px 0px grey;
  margin-right: 30px;
`;
// 메모 삭제 버튼 styled-component
const DeleteButton = styled.button`
  position: absolute;
  width: 40px;
  height: 40px;
  top: 10px;
  right: 10px;
  background: gray;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
  border-radius: 10%;
`;
// 메모 추가 버튼 styled-component
const AddButton = styled.button`
  position: fixed;
  font-size: 25px;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  width: 50px;
  height: 50px;
  border: none;
  cursor: pointer;
  border-radius: 50%;
`;
// 노트 리스트 컴포넌트
const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const navigate = useNavigate();
  // react-router-dom으로부터 useNavigate를 import 함

  useEffect(() => {
    fetchNotes();
  }, []);

  //노트를 API에서 가져오는 함수 선언
  const fetchNotes = async () => {
    //async과 await 을 사용하여 비동기 작업을 동기적으로 작성한 것처럼 보이게 함
    //동기: 파일을 읽혀지기를 기다림
    //비동기: 파일을 읽는 작업이 실행되는 동안 다른 작업을 수행할 수 있다.

    setLoading(true);
    //API를 가져오기 전에 로딩 상태를 true

    //API를 불러온다 => 소프트웨어 간에 데이터를 주고받기 위한 방법
    //HTTP 요청을 보내고, 서버는 요청에 대한 응답을 돌려주는 과정이 포함됨 주로 비동기적으로 이루어짐
    //API를 불러오는 방식 js : async/await, Promise
    try {
      const response = await axios.get("/todos");
      setNotes(response.data.records);
      setLoading(false); // 가져온 다음에 로딩 false
    } catch (error) {
      console.error(error);
      setLoading(false); // 가져온 다음에 로딩 상태 false
    }
  };
  //async 함수를 사용하여 메모를 삭제하는 비동기 작업 수행
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/todos/${id}`); //axios를 사용하여 노트를 삭제한다
      alert("삭제가 완료되었어요!"); // 삭제 됐다고 알람을 줌
      fetchNotes(); // 메모 삭제 후 전체 메모를 다시 가져옴
    } catch (error) {
      console.error(error); // 에러 발생하면 에러 출력
    }
  };

  // 추가 버튼을 클릭했을 때의 핸들러 함수
  const handleAddButtonClick = () => {
    navigate("/note/create");
    // /note/create 경로로 페이지 이동
  };

  // 로딩 중일 때 표시되는
  if (loading) {
    return <div className="LoadingContainer">로딩 중...</div>;
  }

  // 로딩이 되면 노트 리스트를 화면에 표시
  return (
    <NoteListContainer>
      {notes.map((note) => (
        // 배열을 순회하면서 각 노트를 표시하기 위해서 map 함수를 사용하였습니닷
        <NoteItem key={note.id}>
          {/* 각 노트의 고유한 id 값을 사용한다 */}
          <h3>{note.fields.name}</h3>
          <p>{note.fields.content}</p>
          <p>{note.fields.writer}</p>
          <Link to={`/note/${note.id}`}>
            <button>자세히 보기</button>
          </Link>
          <DeleteButton onClick={() => handleDelete(note.id)}>X</DeleteButton>
          {/* 삭제 버튼 */}
        </NoteItem>
      ))}

      <AddButton onClick={handleAddButtonClick}>+</AddButton>
      {/* 새로운 노트를 추가하기 위한 버튼! */}
    </NoteListContainer>
  );
};

export default NoteList;
