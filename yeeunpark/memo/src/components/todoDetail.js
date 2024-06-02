import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axiosClient from "../utils/axiosClient";
import { useParams } from "react-router-dom";
import LoadingPage from "../components/loadingPage";

const DetailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: aliceblue;
`;

const DetailWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 35vw;
  height: 45vh;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
`;

const DeTailTxt = styled.p`
  font-size: 25px;
  padding: 15px;
`;

const Writer = styled.p`
  font-size: 15px;
  color: gray;
  padding-top: 30px;
`;

const TodoDetails = () => {
  const { id } = useParams();
  const [memo, setMemo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemo = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get(`/todos/${id}`);
        setMemo(response.data); //데이터 저장
      } catch (error) {
        console.log("에러:", error);
        setLoading(true);
      } finally {
        setLoading(false); //로딩 상태 종료
      }
    };
    fetchMemo();
  }, [id]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <DetailContainer>
      <DetailWrap>
        {" "}
        {memo && (
          <>
            <DeTailTxt>
              {" "}
              {new Date(memo.createdTime).toLocaleString()}{" "}
              {/* 현재 지역에 맞는 문자열로 변환 */}{" "}
            </DeTailTxt>{" "}
            <DeTailTxt> {memo.fields.name} </DeTailTxt>{" "}
            <DeTailTxt> {memo.fields.content} </DeTailTxt>{" "}
            <Writer> 작성자: {memo.fields.writer} </Writer>{" "}
          </>
        )}{" "}
      </DetailWrap>{" "}
    </DetailContainer>
  );
};

export default TodoDetails;
