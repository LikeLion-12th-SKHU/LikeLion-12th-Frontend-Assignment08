// src/components/TodoList.js
import React, { useState, useEffect } from 'react';
import axiosClient from '../utils/axiosClient';
import TodoItem from './TodoItem';
import styled from 'styled-components';

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    setLoading(true);
    axiosClient.get('/todos')
      .then(response => {
        setTodos(response.data.records);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch todos', error);
        setLoading(false);
      });
  };

  const handleDelete = id => {
    axiosClient.delete(`/todos/${id}`)
      .then(() => {
        alert('삭제가 완료되었어요!');
        fetchTodos(); 
      })
      .catch(error => {
        console.error('Failed to delete todo', error);
      });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
      ))}
    </Container>
  );
};

export default TodoList;
