import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axiosClient";
import styled from "styled-components";

// 로딩 중 스타일된 컴포넌트
const StyledLoading = styled.div`
  background-color: black; // 배경색
  color: white; // 글자색
  padding: 100px; // 안쪽 여백
  text-align: center; // 가운데 정렬
  height: 100vh; // 높이 전체
  display: flex; // 플렉스 컨테이너
  align-items: center; // 가운데 정렬
  justify-content: center; // 가운데 정렬
  flex-direction: column; // 세로 방향 정렬

  & img {
    width: 100px; // 너비
    height: 100px; // 높이
  }
`;

// 배경 스타일된 컴포넌트
const StyledBackground = styled.div`
  background-color: #ffffe0; // 배경색
  height: 100vh; // 높이 전체
  display: flex; // 플렉스 컨테이너
  justify-content: center; // 가운데 정렬
  align-items: center; // 가운데 정렬
`;

// 디테일 스타일된 컴포넌트
const StyledDetail = styled.div`
  display: flex; // 플렉스 컨테이너
  flex-direction: column; // 세로 방향 정렬
  justify-content: center; // 가운데 정렬
  align-items: center; // 가운데 정렬
  padding: 20px; // 안쪽 여백
  margin: 0 auto; // 가운데 정렬
  width: 60vh; // 너비
  text-align: center; // 가운데 정렬
  background-color: white; // 배경색
  border: 1px solid #ffffe0; // 테두리
`;

const NoteDetail = () => {
  const { noteId } = useParams(); // URL 파라미터에서 noteId 추출
  const [note, setNote] = useState(null); // 메모 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`/todos/${noteId}`); // API로부터 데이터 가져오기
        const fetchedNote = response.data.fields; // 필드 추출
        fetchedNote.createdTime = new Date(fetchedNote.createdTime); // 생성 시간을 Date 객체로 변환
        setNote(fetchedNote); // 메모 상태 업데이트
        setLoading(false); // 로딩 상태 변경
      } catch (error) {
        console.error("Error fetching note:", error); // 오류 처리
        setLoading(false); // 로딩 상태 변경
      }
    };

    fetchNote(); // 데이터 가져오기 함수 호출
  }, [noteId]); // noteId가 변경될 때마다 호출

  return (
    <div>
      {loading ? (
        // 로딩 중인 경우
        <StyledLoading>
          <img
            src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/08/s_2A9C470D38F43091CCD122E63014ED4503CAA7508FAF0C6806AE473C2B94B83E_1627522653545_loadinfo.gif?resize=200%2C200&ssl=1"
            alt="스피너" // 대체 텍스트
          />
          {/* 로딩 메시지 */}
          <p>Loading...</p>
        </StyledLoading>
      ) : (
        // 로딩이 완료된 경우
        <StyledBackground>
          {note && ( // note가 존재할 경우
            <StyledDetail>
              {/* ****** Invalid Date 라고 뜹니다... createdTime 어떻게 출력하는거죠..?  */}
              {/* 생성 시간 출력 */}
              <p>{note.createdTime.toString()}</p>
              {/* 제목 출력 */}
              <p>{note.name}</p>
              {/* 내용 출력 */}
              <p>{note.content}</p>
              {/* 작성자 출력 */}
              <p>{note.writer}</p>
            </StyledDetail>
          )}
        </StyledBackground>
      )}
    </div>
  );
};

export default NoteDetail;
