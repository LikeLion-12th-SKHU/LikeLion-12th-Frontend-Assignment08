
import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
`;

const TodoItem = ({ todo, onDelete }) => {
  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <Card>
      <div>
        <strong>{todo.fields.name}</strong>
        {todo.fields.content && <p>{todo.fields.content}</p>}
      </div>
      <Button onClick={handleDelete}>X</Button>
    </Card>
  );
};

export default TodoItem;
