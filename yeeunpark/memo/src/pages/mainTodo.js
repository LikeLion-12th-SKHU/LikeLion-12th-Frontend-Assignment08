import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdAddCircleOutline } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import axiosClient from "../utils/axiosClient";
import LoadingPage from "../components/loadingPage";

const MainContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding-top: 10vh;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background-color: aliceblue;
`;
const MainWrap = styled.div`
  width: 300px;
  height: 170px;
  background-color: #ddd;
  border-radius: 10px;
  display: flex;
  padding-left: 20px;
  margin: 10px 10px;
`;
const TodoTitle = styled.p`
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const DeleteBtn = styled.button`
  border: none;
  background-color: inherit;
  padding-left: 20px;
`;
const CreateTodoBtn = styled.button`
  position: fixed;
  top: 83vh;
  left: 88vw;
  border: none;
  background-color: transparent;
`;

const MainTodo = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCreateTodo = () => {
    navigate("/note/create");
  };

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/todos");
      setTodos(response.data.records); //목록 상태 업데이트
      setLoading(false);
    } catch (error) {
      console.error("에러:", error);
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []); //마운트 되었을 때 할 일 목록 출력

  const handleDeleteTodo = async (id) => {
    try {
      await axiosClient.delete(`/todos/${id}`);
      alert("삭제가 완료되었습니다!");
      setLoading(true);
      fetchTodos(); //목록 재 로드
    } catch (error) {
      console.error("에러:", error);
      setLoading(true);
    }
  };

  const handleTodoClick = (id) => {
    navigate(`/note/${id}`);
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <MainContainer>
      {" "}
      {todos.map((todo) => (
        <MainWrap key={todo.id}>
          <TodoTitle onClick={() => handleTodoClick(todo.id)}>
            {" "}
            {todo.fields.name}{" "}
          </TodoTitle>{" "}
          <DeleteBtn onClick={() => handleDeleteTodo(todo.id)}>
            <TiDeleteOutline size={25} />{" "}
          </DeleteBtn>{" "}
        </MainWrap>
      ))}{" "}
      <CreateTodoBtn onClick={handleCreateTodo}>
        <MdAddCircleOutline
          size={50}
          color='#3973fa'
        />{" "}
      </CreateTodoBtn>{" "}
    </MainContainer>
  );
};

export default MainTodo;
