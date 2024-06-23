import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMemo, fetchMemo } from "../service/request";

const MemoDetails = () => {
  const [note, setNote] = useState(null);
  const { noteId } = useParams(); // 현재 url에서 id 파라미터 추출

  // noteId 바뀔 때마다 주소 갱신
  useEffect(() => {
    fetchMemo();
  }, [noteId]);

  if (!note || !note.fields) {
    return <p>No data available</p>;
  }

  return (
    <div>
      <h1>상세설명</h1>
      <p>제목: {note.fields.name}</p>
      <p>내용: {note.fields.content}</p>
      <p>작성자: {note.fields.writer}</p>
      <p>생성된 날짜: {note.createdTime}</p>
    </div>
  );
};

export default MemoDetails;
