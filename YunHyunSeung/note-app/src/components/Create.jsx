import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addMemo } from "../service/request";

const CreateMemo = () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // 제출 후 다시 폼태그로 돌아오는 것을 방지
          addMemo(name, content, writer, navigate);
        }}
      >
        <h1>추가할 메모를 입력해주세요</h1>
        <div>
          <label for="name">제목</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label for="content">내용</label>
          <input
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label for="writer">작성자</label>
          <input
            id="writer"
            value={writer}
            onChange={(e) => setWriter(e.target.value)}
            required
          />
        </div>
        <button type="submit">추가하기</button>
      </form>
    </div>
  );
};
export default CreateMemo;
