import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 30px;
  max-width: 500px;
  margin: 0 auto;
`;

const Title = styled.h1`
  margin-bottom: 40px;
  text-align: center;
  color: #333;
`;

const NoteItem = styled.div`
  background: #f9f9f9;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NoteLink = styled(Link)`
  font-size: 17px;
  text-decoration: none;
  color: #333;
  font-weight: bold;
`;

const DeleteButton = styled.button`
  border: none;
  border-radius: 50%;
  padding: 10px 15px;
  cursor: pointer;
`;

const AddButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: blueviolet;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #d9d9d9;
  }
`;

function Home({ todos, setTodos }) {
  // 메모 삭제를 처리하는 함수
  const handleDelete = (id) => {
    // 삭제할 메모를 제외하고 나머지 메모들을 재배열
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    alert("삭제를 완료했어요!");
  };

  // useNavigate 훅을 사용하여 경로 변경
  const navigate = useNavigate();

  return (
    <Container>
      <Title>NOTE</Title>

      {/* 메모 목록을 매핑하여 각 메모에 대한 요소를 생성 */}
      {todos.map((todo) => (
        <NoteItem key={todo.id}>
          {/* 메모에 대한 링크 */}
          <NoteLink to={`/note/${todo.id}`}>{todo.fields.name}</NoteLink>
          {/* 메모 삭제 버튼 */}
          <DeleteButton onClick={() => handleDelete(todo.id)}>X</DeleteButton>
        </NoteItem>
      ))}

      {/* 새 메모를 생성하는 버튼 */}
      <AddButton onClick={() => navigate("/note/create")}>+</AddButton>
    </Container>
  );
}

export default Home;
