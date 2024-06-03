import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosClient"; // axios 인스턴스를 가져옴

const CreateMM = () => {
  // useState 훅을 사용하여 상태 변수 선언
  const [name, setName] = useState(""); // 제목을 저장할 상태 변수와 설정 함수
  const [content, setContent] = useState(""); // 내용을 저장할 상태 변수와 설정 함수
  const [writer, setWriter] = useState(""); // 작성자를 저장할 상태 변수와 설정 함수
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  // 폼 제출 시 호출되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로드 방지
    if (!name.trim() || !content.trim() || !writer.trim()) {
      alert("제목, 내용, 작성자를 모두 입력하세요."); // 필수 입력값 확인
    } else {
      try {
        // 서버에 POST 요청 보내기
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
        // 요청이 성공하면 사용자에게 알리고 홈 페이지로 이동
        if (response.status === 200) {
          alert("노트 생성이 완료되었다람쥐!");
          navigate("/"); // 노트 생성 후 홈으로 이동
        } else {
          alert("메모 생성 실패했다람쥐..."); // 실패 시 알림
        }
      } catch (error) {
        console.error(error); // 에러 로그 출력
        alert("메모 생성 실패했다람쥐..."); // 실패 시 알림
      }
    }
  };

  // JSX 반환
  return (
    <div>
      <h2>메모 생성</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목</label>
          <input
            type="text"
            value={name} // 상태 변수 name의 값
            onChange={(e) => setName(e.target.value)} // 입력 값이 변경될 때 상태 업데이트
          />
        </div>
        <div>
          <label>내용:</label>
          <input
            type="text"
            value={content} // 상태 변수 content의 값
            onChange={(e) => setContent(e.target.value)} // 입력 값이 변경될 때 상태 업데이트
          />
        </div>
        <div>
          <label>작성자:</label>
          <input
            type="text"
            value={writer} // 상태 변수 writer의 값
            onChange={(e) => setWriter(e.target.value)} // 입력 값이 변경될 때 상태 업데이트
          />
        </div>
        <button type="submit">메모 생성</button>
      </form>
    </div>
  );
};

export default CreateMM; // CreateMM 컴포넌트를 export하여 다른 파일에서 사용 가능하게 함
