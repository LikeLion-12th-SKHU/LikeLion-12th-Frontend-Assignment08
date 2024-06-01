import React, { useState, useEffect } from "react";
import axios from "../utils/axiosClient";
import { useParams } from "react-router-dom";

const MemoDetail = () => {
  const [memo, setMemo] = useState(null);
  const { noteid } = useParams();

  useEffect(() => {
    const fetchMemo = async () => {
      try {
        const response = await axios.get(`/todos/${noteid}`);
        setMemo(response.data);
      } catch (error) {
        console.error("Error fetching memo:", error);
      }
    };

    fetchMemo();
  }, [noteid]);

  if (!memo) {
    return <p>로딩중...</p>;
  }

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

export default MemoDetail;
