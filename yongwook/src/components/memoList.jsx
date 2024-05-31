import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MemoListDiv = styled.div`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function MemoList({ memos, onDelete }) {
  // 메모 목록 보여주는 컴포넌트
  const navigate = useNavigate();

  return (
    <MemoListDiv>
      {memos.map((memo) => (
        <ListItem key={memo.id}>
          <span onClick={() => navigate.push(`/note/${memo.id}`)}>
            {memo.fields.name} // 클릭 시 /note/memo.id로 이동
          </span>
        </ListItem>
      ))}
    </MemoListDiv>
  );
}

export default MemoList;
