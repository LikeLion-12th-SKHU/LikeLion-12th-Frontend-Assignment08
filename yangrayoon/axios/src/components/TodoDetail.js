import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../utils/axiosClient";
import styled from "styled-components";

const DetailStyle = styled.p`
  background-color: #f2f2f2;
  font-size: 20px;
  display: block;
  width: 300px;
  height: 200px;
  padding: 20px;
  margin: 20px;
  box-shadow: 2px 2px #ccc;
  border-radius: 20px;
  text-align: center;
`;

function MemoDetail() {
  const { noteId } = useParams(); //noteId 가져옴
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemo = async () => {
      try {
        const response = await axiosClient.get(`/todos/${noteId}`);
        //메모 데이터 가져옴
        setTodo(response.data); //메모 데이터 업데이트
        setLoading(false);
      } catch (error) {
        console.log("에러", error);
        setLoading(false);
      }
    };

    fetchMemo();
  }, [noteId]);

  if (loading) {
    return <div>로딩중,,,</div>;
  }

  return (
    <>
      {todo && (
        <DetailStyle>
          <p>{todo.createdTime}</p>
          <p>{todo.fields.name}</p>
          <p>{todo.fields.content}</p>
          <p>{todo.fields.writer}</p>
        </DetailStyle>
      )}
    </>
  );
}
export default MemoDetail;
