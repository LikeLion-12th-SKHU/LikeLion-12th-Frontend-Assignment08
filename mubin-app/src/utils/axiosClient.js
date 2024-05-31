import axios from "axios";
// fetch API 와 더불어 가장 많이 쓰이는 HTTP 라이브러리이다
// fetch <<< axios
// 브라우저 뿐만 아니라 노드 런타임에서도 쓰이는 라이브러리
// 서드파트 라이브러리

// ⭐️⭐️⭐️ 필수요구사항 ⭐️⭐️⭐️
const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Authorization:
      "Bearer patodxyOJcG56MLtx.79bdfc5cc4054db05ee89cad210f0a56b4d1e6fcbd3d3e9137c37c37f9cadd47",
  },
});

export default instance;
