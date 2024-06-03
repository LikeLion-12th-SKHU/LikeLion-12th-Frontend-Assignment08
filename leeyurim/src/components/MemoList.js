import React, { useEffect, useState } from "react";
import axios from "../utils/axiosClient";
import styled from "styled-components";
import { Link } from "react-router-dom";

// 스타일 컴포넌트
const Button = styled.button`
  background-color: #ff0000;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
`;

const MemoItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const MemoList = () => {
  const [memos, setMemos] = useState([]); // 메모 데이터를 저장할 상태 변수와 설정 함수
  const [loading, setLoading] = useState(true); // 로딩 상태를 저장할 상태 변수와 설정 함수

  // 컴포넌트가 처음 실행될 때 데이터를 가져오는 useEffect 훅
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/todos"); // '/todos' 엔드포인트에서 메모 데이터를 가져옴
        setMemos(response.data.records); // 가져온 데이터를 memos 상태에 저장
        setLoading(false); // 로딩 상태를 false로 설정
      } catch (error) {
        console.error("Error fetching data:", error); // 에러 발생 시 콘솔에 로그 출력
        setLoading(false); // 에러 발생 시에도 로딩 상태를 false로 설정
      }
    };

    fetchData();
  }, []); // 빈 배열을 의존성으로 설정, 컴포넌트가 처음 실행될 때만 실행

  // 메모를 삭제하는 함수
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/todos/${id}`); // 메모 ID를 이용해 삭제 요청을 보냄
      alert("삭제가 완료되었어요!"); // 삭제 완료 후 알림 표시
      const response = await axios.get("/todos"); // 메모 데이터를 다시 가져옴
      setMemos(response.data.records); // 업데이트된 메모 데이터를 상태에 저장
    } catch (error) {
      console.error("Error deleting memo:", error); // 에러 발생 시 콘솔에 로그 출력
    }
  };

  // 로딩 중일 때 표시할 내용
  if (loading) {
    return <p>로딩중...</p>;
  }

  // 메모 리스트를 렌더링
  return (
    <div>
      <h1>Memo List</h1>
      <ul>
        {memos.map((memo) => (
          <MemoItem key={memo.id}>
            {" "}
            {/* 각 메모 아이템을 렌더링 */}
            <Link to={`/note/${memo.id}`}>{memo.fields.name}</Link>{" "}
            {/* 메모의 이름을 링크로 표시 */}
            <Button onClick={() => handleDelete(memo.id)}>X</Button>{" "}
            {/* 메모 삭제 버튼 */}
          </MemoItem>
        ))}
      </ul>
      <Link to="/note/create">
        <button>+</button>
      </Link>
    </div>
  );
};

export default MemoList; // MemoList 컴포넌트를 export하여 다른 파일에서 사용 가능하게 함
