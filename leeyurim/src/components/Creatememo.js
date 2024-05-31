import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NoteCreate = () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !content.trim() || !writer.trim()) {
      alert("제목, 내용, 작성자를 모두 입력하세요.");
    } else {
      try {
        const response = await axios.post("/todos", {
          records: [
            {
              fields: {
                name,
                content,
                writer,
              },
            },
          ],
        });
        if (response.status === 200) {
          alert("노트 생성이 완료되었다람쥐!");
          navigate("/"); // 메모 생성 후 홈으로 이동
        } else {
          alert("메모 생성에 실패했다. 다시 시도하거라.");
        }
      } catch (error) {
        console.error(error);
        alert("메모 생성에 실패했다. 다시 시도하거라.");
      }
    }
  };

  return (
    <div>
      <h2>메모 생성</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>내용:</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          <label>작성자:</label>
          <input
            type="text"
            value={writer}
            onChange={(e) => setWriter(e.target.value)}
          />
        </div>
        <button type="submit">메모 생성</button>
      </form>
    </div>
  );
};

export default NoteCreate;
