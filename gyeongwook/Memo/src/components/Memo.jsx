import React, { useEffect } from "react";
import instance from "../utils/axiosClient";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const MemoContainer = styled.div`
  display: flex;
`;

const Content = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  height: 100px;
  width: 500px;
  border: 1px solid;
  border-radius: 9px;
`;

const Text = styled.p`
  padding-left: 10px;
`;

const DeleteButton = styled.button``;

const CreateButton = styled.button``;

const Memo = () => {
  const [loading, setLoading] = useState(true);
  const [memos, setMemos] = useState([]);
  const navigate = useNavigate();

  // 메모 리스트 불러오기
  const fetchMemo = async () => {
    try {
      const response = await instance.get("/todos");
      setMemos(response.data.records);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // 메모 생성 페이지로 이동
  const createMemoButton = () => {
    navigate("/note/create");
  };

  // 메모 삭제
  const deleteMemoButton = async (id) => {
    try {
      await instance.delete(`/todos/${id}`);
      alert("삭제가 완료되었어요");
      fetchMemo();
    } catch (error) {
      console.log(error);
    }
  };

  // 메모 클릭시 상세 페이지로 이동
  const memoClick = (id) => {
    navigate(`/note/${id}`);
  };

  useEffect(() => {
    fetchMemo();
  }, []);

  return (
    <div>
      {loading ? (
        <Text>loading</Text>
      ) : (
        <MemoContainer>
          {/* 메모 리스트 렌더링 */}
          {memos.map((memo) => (
            <Content key={memo.id}>
              <Text onClick={() => memoClick(memo.id)}>
                {memo.fields.content}
              </Text>
              <DeleteButton
                onClick={(e) => {
                  e.stopPropagation();
                  deleteMemoButton(memo.id);
                }}
              >
                X
              </DeleteButton>
            </Content>
          ))}
        </MemoContainer>
      )}
      {/* 메모 생성 버튼 */}
      <CreateButton onClick={createMemoButton}>+</CreateButton>
    </div>
  );
};

export default Memo;
