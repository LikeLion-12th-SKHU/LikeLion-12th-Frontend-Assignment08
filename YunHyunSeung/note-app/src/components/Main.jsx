import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { getData, deleteMemo } from "../service/request";

const Div = styled.div`
  padding: 50px 50px;

  text-align: center;
`;
const Memobox = styled.div`
  border: 1px solid black;
  padding: 50px 100px;
  margin: 20px;
`;
const Items = styled.div`
  display: flex;
  width: 200px;
  height: 100px;
  border: 1px solid black;
  align-items: center;
  justify-content: center;
`;

const Mainpage = () => {
  const [memos, setMemos] = useState([]); //  데이터를 업데이트 해줄 수 있는 useState
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 새로고침 시 업데이트된 데이터 가져옴
  useEffect(() => {
    getData(setMemos); // service/request 사용
    setLoading(true);
  }, []);

  // 메모 삭제 후 getData함수로 업데이트
  const handleDelete = async (id) => {
    await deleteMemo(id, () => getData(setMemos)); // service/request 사용
  };

  if (memos == "") {
    return <p>로딩중입니다!</p>;
  }
  return (
    <Div>
      <Memobox>
        <h1>메모장</h1>

        {/*메모 클릭 시 navigate함수로 세부 정보로 넘어갈 수 있게 함*/}
        {memos.map((memo) => (
          <Items key={memo.id} onClick={() => navigate(`/note/${memo.id}`)}>
            {/* 온클릭 부모요소 => 클릭 시 세부정보를 알려주는 페이지 주소로 */}
            <div>{memo.fields.name}</div>
            <button
              onClick={(e) => {
                e.stopPropagation(); // 온클릭 부모 요소가 같이 실행되는 것을 막음
                handleDelete(memo.id); // 클릭 시 삭제
              }}
            >
              삭제
            </button>
          </Items>
        ))}
        <button onClick={() => navigate("/note/create")}>추가하기</button>
      </Memobox>
    </Div>
  );
};

export default Mainpage;
