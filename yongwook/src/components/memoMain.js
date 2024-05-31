import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchMemo, deleteMemo } from "../utils/request";

const MemoMainDiv = styled.div`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const MemoItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 200px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MemoContent = styled.div`
  flex: 1;
  margin-bottom: 10px;
`;

const DeleteButton = styled.button`
  align-self: flex;
  background-color: green;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const AddButton = styled.button`
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 50px;
  height: 50px;
  background-color: green;
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const MemoMain = () => {
  const [memos, setMemos] = useState([]); // 메모 저장하기 위한 state
  const navigate = useNavigate();

  useEffect(() => {
    fetchMemo(setMemos); // 메모를 가져와 state 저장
  }, []); // 컴포넌트 렌더링 시 한 번만 실행

  const handleDelete = async (id) => {
    // 메모 삭제 함수
    await deleteMemo(id, () => fetchMemo(setMemos)); // deleteMemo 함수 호출
  };

  return (
    <div>
      <MemoMainDiv>
        {memos.map((memo) => (
          <MemoItem key={memo.id} onClick={() => navigate(`/note/${memo.id}`)}>
            <MemoContent>{memo.fields.name}</MemoContent>
            <DeleteButton
              onClick={(e) => {
                e.stopPropagation(); // 메모 아이템 클릭으로 처리 되지 않고 삭제 동작만 수행하게 함
                handleDelete(memo.id);
              }}
            >
              X
            </DeleteButton>
          </MemoItem>
        ))}
        <AddButton onClick={() => navigate("/note/create")}>+</AddButton>
      </MemoMainDiv>
    </div>
  );
};

export default MemoMain;
