import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../utils/axiosClient';
import styled from 'styled-components';

const Loading = styled.div`
  font-size: 2rem;
  text-align: center;
  margin-top: 2rem;
`;

const TodoListContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const TodoItem = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`;

const Writer = styled.p`
  font-weight: bold;
  color: #555;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  font-size: 1rem;
`;

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosClient.get('/todos');
      setTodos(response.data.records);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosClient.delete(`/todos/${id}`);
      alert('삭제가 완료되었어요!');
      fetchData();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  if (loading) {
    return <Loading>로딩 중...</Loading>;
  }

  return (
    <div>
      <h1>Todo List</h1>
      <TodoListContainer>
        {todos.map(todo => (
          <Link to={`/note/${todo.id}`} key={todo.id}>
            <TodoItem>
              <div>
                <h2>{todo.fields.name}</h2>
                {todo.fields.content && <p>{todo.fields.content}</p>}
                {todo.fields.writer && <Writer>Written by: {todo.fields.writer}</Writer>}
              </div>
              <DeleteButton onClick={(e) => { e.preventDefault(); handleDelete(todo.id); }}>X</DeleteButton>
            </TodoItem>
          </Link>
        ))}
      </TodoListContainer>
    </div>
  );
}

export default TodoList;
