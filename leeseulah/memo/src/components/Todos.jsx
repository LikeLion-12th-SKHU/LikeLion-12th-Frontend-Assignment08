import React, { useState, useEffect } from "react";
import axiosClient from "../utils/axiosClient";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MemoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const Memo = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  width: calc(33.333% - 32px);
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  color: red;
  font-size: 16px;
  cursor: pointer;
`;

const AddButton = styled.button`
  position: fixed;
  bottom: 16px;
  right: 16px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #28a745;
  color: white;
  font-size: 24px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Todos = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  // API에서 데이터를 가져오는 함수
  const fetchTodos = async () => {
    try {
      const response = await axiosClient.get("/todos");
      setTodos(response.data.records);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // 메모를 삭제하는 함수
  const handleDelete = async (id) => {
    try {
      await axiosClient.delete(`/todos/${id}`);
      alert("삭제가 완료되었어요!");
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // 새 메모를 추가하는 함수수
  const handleAddNote = () => {
    navigate("/note/create");
  };

  // 메모를 클릭할 때의 이벤트 처리 함수
  const handleNoteClick = (id) => {
    navigate(`/note/${id}`);
  };

  return (
    <div>
      <h1>Memo List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <MemoContainer>
          {todos.map((todo) => (
            <Memo key={todo.id} onClick={() => handleNoteClick(todo.id)}>
              {todo.fields.name || "No name"}
              <DeleteButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(todo.id);
                }}
              >
                X
              </DeleteButton>
            </Memo>
          ))}
        </MemoContainer>
      )}
      <AddButton onClick={handleAddNote}>+</AddButton>
    </div>
  );
};

export default Todos;
