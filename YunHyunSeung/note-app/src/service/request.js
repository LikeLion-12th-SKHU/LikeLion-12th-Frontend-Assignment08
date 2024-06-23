import instance from "../utils/axiosClient";

// 서버와의 교류하는 것 까지만 관여하는 함수들 집합
// api 요청 -> axios 라이브러리의 post메서드로 지정된 주소로 데이터 전송
export const post = async (url, data) => {
  try {
    await instance.post(url, data);
  } catch (error) {
    console.log("post() error");
    alert("post 함수에서 레전드상황 발생!");
  }
};

// 서버에서 업데이트된 현재 메모 목록 가져오기, useState의 setMemos로 상태 업데이트 및 관리
export const getData = async (setMemos) => {
  try {
    const response = await instance.get("/todos");
    const data = response.data.records;
    setMemos(data);
  } catch (error) {
    console.log("getData() error");
    alert("getData 함수에서 레전드상황 발생!");
  }
};

export const deleteMemo = async (id, getData) => {
  try {
    await instance.delete(`/todos/${id}`);
    alert("삭제되었슴다!");
    getData();
  } catch (error) {
    console.log("deleteMemo() error");
    alert("deleteMemo 함수에서 레전드상황 발생!");
  }
};

export const getMemo = async (noteId) => {
  try {
    const response = await instance.get(`/todos/${noteId}`);
    const record = response.data;
    return record;
  } catch (error) {
    console.log("getMemo() error");
    alert("getMemo 함수에서 레전드상황 발생!");
  }
};

// 메모를 추가하는 함수. 위에 정의된 post함수로 주소에 있는 값을 불러오고 추가되었음을 사용자에게 알려준다. navigate로 메인 페이지로 이동한다. getData함수로 인해 추가된 내용이 업데이트 되어있음.
export const addMemo = async (name, content, writer, navigate) => {
  try {
    await post("/todos", {
      fields: {
        name: name,
        content: content,
        writer: writer,
      },
    });
    alert("메모 추가 완료");
    navigate("/");
  } catch (error) {
    console.log("addMemo() error");
    alert("addMemo 함수에서 레전드상황 발생!");
  }
};

// noteId 갱신
export const fetchMemo = async (noteId, setNote) => {
  try {
    const record = await getMemo(noteId);
    setNote(record);
  } catch (error) {
    console.log("fetchMemo() error");
    alert("fetchMemo 함수에서 레전드상황 발생!");
  }
};
