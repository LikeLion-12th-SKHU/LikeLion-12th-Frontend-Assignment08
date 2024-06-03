import React, { useState, useEffect } from "react";
import axios from "../utils/axiosClient";
import { useParams } from "react-router-dom";

// MemoDetail 컴포넌트: 메모의 세부 정보를 표시
const MemoDetail = () => {
  const [memo, setMemo] = useState(null); // 메모 데이터를 저장할 상태 변수와 설정 함수
  const { noteid } = useParams(); // URL에서 noteid 파라미터를 가져옴

  // 컴포넌트가 처음 실행될 때 메모 데이터를 가져오는 useEffect 훅
  useEffect(() => {
    const fetchMemo = async () => {
      try {
        const response = await axios.get(`/todos/${noteid}`); // noteid를 이용해 특정 메모 데이터를 가져옴
        setMemo(response.data); // 가져온 데이터를 memo 상태에 저장
      } catch (error) {
        console.error("Error fetching memo:", error); // 에러 발생 시 콘솔에 로그 출력
      }
    };

    fetchMemo();
  }, [noteid]); // noteid가 변경될 때마다 실행

  // 메모 데이터를 아직 가져오지 못했을 때 표시할 내용
  if (!memo) {
    return <p>로딩중...</p>;
  }

  // 메모의 세부 정보를 렌더링
  return (
    <div>
      <h2>메모 상세 정보</h2>
      <p>제목: {memo.fields.name}</p>
      <p>내용: {memo.fields.content}</p>
      <p>작성자: {memo.fields.writer}</p>
      <p>생성 시간: {memo.createdTime}</p>
    </div>
  );
};

export default MemoDetail; // MemoDetail 컴포넌트를 export하여 다른 파일에서 사용 가능하게 함
