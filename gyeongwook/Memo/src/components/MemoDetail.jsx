// MemoDetail.js
import React, { useState, useEffect } from "react";
import instance from "../utils/axiosClient";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  border: 1px solid #000;
  border-radius: 8px;
  width: 500px;
  margin-left: 20px;
`;

const Text = styled.p``;

const MemoDetail = () => {
  const { memoId } = useParams();
  const [memo, setMemo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 메모 상세 정보 불러오기
    const fetchMemo = async () => {
      try {
        const response = await instance.get(`/todos/${memoId}`);
        setMemo(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchMemo();
  }, [memoId]);

  if (loading) return <p>로딩중</p>;

  if (!memo) return <p>메모 없음</p>;

  return (
    <DetailContainer>
      {/* 메모 상세 정보 출력 */}
      <Text>{memo.id}</Text>
      <Text>{memo.fields.name}</Text>
      <Text>{memo.fields.content}</Text>
      <Text>{memo.fields.writer}</Text>
    </DetailContainer>
  );
};

export default MemoDetail;
