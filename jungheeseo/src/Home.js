import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Home({ todos, setTodos }) {
  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    alert("삭제가 완료되었어요!");
  };

  const navigate = useNavigate();

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Link to={`/note/${todo.id}`}>{todo.fields.name}</Link>
            <button onClick={() => handleDelete(todo.id)}>X</button>
          </li>
        ))}
      </ul>
      <button
        className="add"
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
        onClick={() => navigate("/note/create")}
      >
        +
      </button>
    </div>
  );
}

export default Home;
