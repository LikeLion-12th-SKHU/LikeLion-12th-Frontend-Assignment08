import React, { useEffect, useState } from "react";
import axios from "../utils/axiosClient";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// 스타일된 컴포넌트 정의
const StyledBackground = styled.div`
  & h1 {
    text-align: center; // 제목 가운데 정렬
    padding: 30px; // 안쪽 여백
    margin: 10px 10px 30px 10px; // 바깥 여백
  }
`;

const StyledLoading = styled.div`
  background-color: black; // 배경색 검정
  color: white; // 글자색 흰색
  padding: 100px; // 안쪽 여백
  text-align: center; // 가운데 정렬
  height: 100vh; // 전체 화면 높이
  display: flex; // 플렉스 컨테이너
  flex-direction: column; // 세로 정렬
  justify-content: center; // 가운데 정렬
  align-items: center; // 가운데 정렬

  & img {
    width: 100px; // 이미지 너비
    height: 100px; // 이미지 높이
  }
`;

const StyledCard = styled.div`
  padding: 10px; // 안쪽 여백
  margin: 10px; // 바깥 여백
  font-weight: bold; // 글자 두껍게
`;

const NoteList = styled.ul`
  padding: 0; // 안쪽 여백 없음
  display: flex; // 플렉스 컨테이너
  flex-wrap: wrap; // 자식 요소 줄바꿈
  list-style-type: none; // 리스트 마커 없음
`;

const NoteCard = styled.li`
  flex: 1 0 calc(10% - 20px); // 플렉스 아이템 너비, 줄바꿈 및 여백 설정
  padding: 20px; // 안쪽 여백
  margin: 10px; // 바깥 여백
  font-weight: bold; // 글자 두껍게
  border: 1px solid #ffffe0; // 테두리
  background-color: #ffffe0; // 배경색
  box-shadow: 3px 3px 5px gray; // 그림자
  display: flex; // 플렉스 컨테이너
  justify-content: space-between; // 요소 사이 공간 정렬
  align-items: center; // 요소 가운데 정렬
`;

const AddButton = styled.button`
  position: fixed; // 고정 위치
  bottom: 20px; // 아래에서 20px 떨어진 위치
  right: 20px; // 오른쪽에서 20px 떨어진 위치
  width: 50px; // 너비
  height: 50px; // 높이
  border-radius: 50%; // 원형 모양
  background-color: #007bff; // 배경색
  color: white; // 글자색 흰색
  font-size: 24px; // 글자 크기
  border: none; // 테두리 없음
  cursor: pointer; // 포인터 커서
`;

// 메모 리스트 컴포넌트 정의
const Note = () => {
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [todos, setTodos] = useState([]); // 메모 리스트 상태 관리
  const navigate = useNavigate(); // React Router의 navigate 훅 사용

  // 메모 리스트 데이터 가져오기
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("/todos"); // todos 엔드포인트에서 데이터 가져오기
        setTodos(response.data.records); // 데이터를 상태에 설정
        setLoading(false); // 로딩 상태 변경
      } catch (error) {
        console.error("Error fetching todos:", error); // 에러 처리
        setLoading(false); // 로딩 상태 변경
      }
    };

    fetchTodos(); // 데이터 가져오기 함수 호출
  }, []); // 마운트 시에만 호출

  // 메모 삭제 처리
  const handleDeleteMemo = async (id) => {
    try {
      await axios.delete(`/todos/${id}`); // id에 해당하는 메모 삭제
      alert("삭제가 완료되었습니다!"); // 삭제 완료 알림
      const response = await axios.get("/todos"); // 업데이트된 메모 리스트 다시 가져오기
      setTodos(response.data.records); // 데이터 업데이트
    } catch (error) {
      console.error("Error deleting memo:", error); // 에러 처리
    }
  };

  // 렌더링
  return (
    <div className="Note">
      {loading ? ( // 로딩 중일 때
        <StyledLoading>
          <img
            src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/08/s_2A9C470D38F43091CCD122E63014ED4503CAA7508FAF0C6806AE473C2B94B83E_1627522653545_loadinfo.gif?resize=200%2C200&ssl=1"
            alt="로딩 중"
          />
          <p>Loading...</p>
        </StyledLoading>
      ) : (
        // 로딩 완료 후
        <StyledBackground>
          <h1>✏️ 멋사 메모장</h1>
          <StyledCard>
            <NoteList>
              {todos.map((todo) => (
                <NoteCard key={todo.id}>
                  <span onClick={() => navigate(`/note/${todo.id}`)}>
                    {todo.fields.name}
                  </span>
                  <button onClick={() => handleDeleteMemo(todo.id)}>✂️</button>
                </NoteCard>
              ))}
            </NoteList>
            <AddButton onClick={() => navigate("/note/create")}>+</AddButton>
          </StyledCard>
        </StyledBackground>
      )}
    </div>
  );
};

export default Note;
