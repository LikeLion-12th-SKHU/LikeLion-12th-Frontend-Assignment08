import instance from "../utils/axiosClient";

export const post = async (url, data) => {
  try {
    await instance.post(url, data);
  } catch (error) {
    throw new Error("Network Error");
  }
};

export const memoSubmit = async (name, content, writer, navigate) => {
  try {
    await post("/todos", {
      fields: {
        name: name,
        content: content,
        writer: writer,
      },
    });
    alert("생성완료");
    navigate("/"); // 메모 생성 후 메모 목록으로 이동
  } catch (error) {
    throw new Error("Network Error");
  }
};

export const fetchMemo = async (setMemos) => {
  try {
    const response = await instance.get("/todos");
    const data = response.data.records;
    setMemos(data);
  } catch (error) {
    throw new Error("Network Error");
  }
};

export const deleteMemo = async (id, fetchMemo) => {
  try {
    await instance.delete(`/todos/${id}`);
    alert("삭제완료");
    fetchMemo(); // 메모 삭제 후 다시 메모 목록을 가져옴
  } catch (error) {
    throw new Error("Network Error");
  }
};

export const readMemo = async (noteId) => {
  try {
    const response = await instance.get(`/todos/${noteId}`);
    const record = response.data;
    if (record && record.fields) {
      return record;
    } else {
      throw new Error("No data");
    }
  } catch (error) {
    throw new Error("Network Error");
  }
};
