import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateNote({ todos, setTodos }) {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  const handleCreate = () => {
    const newNote = {
      id: Date.now(),
      fields: { name, content, author },
    };
    setTodos([...todos, newNote]);
    alert("메모를 생성했어요!");
    navigate("/");
  };

  return (
    <div>
      <h2>새 메모 생성</h2>
      <div>
        <label>
          제목:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          내용:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          작성자:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleCreate}>생성</button>
    </div>
  );
}

export default CreateNote;
