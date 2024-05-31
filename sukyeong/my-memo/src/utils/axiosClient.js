import axios from "axios";

// axios를 사용하여 HTTP 요청을 보내는 인스턴스 생성
const instance = axios.create({
  // baseURL: 요청을 보낼 기본 URL
  baseURL: "/",
  // Bearer 토큰을 사용하여 인증 정보 전송
  headers: {
    Authorization:
      // 실제 Bearer 토큰
      "Bearer patodxyOJcG56MLtx.79bdfc5cc4054db05ee89cad210f0a56b4d1e6fcbd3d3e9137c37c37f9cadd47",
  },
});

export default instance;
