import { useEffect, useState } from "react";
import React from "react";
import axiosClient from "./utils/axiosClient";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const StyleMemo = styled.div`
  background-color: #f2f2f2;
  margin: 5px;
  padding: 10px;
  box-shadow: 2px 2px #ccc;
  width: 200px;
  border-radius: 10px;
`;

const MemoWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const MemoDeleted = styled.button`
  background-color: #f2f2f2;
  cursor: pointer;
  border: none;
`;

const AddBtn = styled.button`
  border: none;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  font-size: 40px;
  background-color: skyblue;
  color: white;
  bottom: 20px;
  right: 20px;
  position: fixed;
`;

function App() {
  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); //페이지 이동을 위한 훅

  const DeletedBtn = async (id) => {
    try {
      setLoading(true); //요청 시작하면 로딩 상태
      await axiosClient.delete(`/todos/${id}`);
      alert("삭제가 완료되었어요!");
      fetchMemo(); //메모목록 다시 업데이트
    } catch (error) {
      <div>에러남 ㅜ</div>; //에러 메시지
    }
    setLoading(false); //요청 끝나면 로딩 해제
  };

  const MemoAdd = () => {
    navigate("/note/create"); //메모 버튼 누르면 여기로 이동
  };

  const MemoClick = (id) => {
    navigate(`/note/${id}`); //메모 부분 클릭하면 여기로 이동
  };

  const fetchMemo = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await axiosClient.get("/todos"); //메모 목록 요청
      setTodo(response.data.records); //목록 업데이트
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    //메모 목록을 가져옴
    fetchMemo();
  }, []);

  if (loading) return <div>로딩중,,,</div>; //로딩 중 메시지
  if (error) return <div>에러남 ㅜ</div>; //에러시 메시지

  return (
    <>
      <MemoWrap>
        {todo.map((record) => (
          <StyleMemo>
            <div
              key={record.id}
              className="todo-item"
              onClick={() => MemoClick(record.id)}
            >
              <h3>{record.fields.name}</h3>
            </div>
            <MemoDeleted>
              <button onClick={() => DeletedBtn(record.id)}>x</button>
            </MemoDeleted>
          </StyleMemo>
        ))}
      </MemoWrap>
      <AddBtn onClick={MemoAdd}>+</AddBtn>
    </>
  );
}

export default App;
