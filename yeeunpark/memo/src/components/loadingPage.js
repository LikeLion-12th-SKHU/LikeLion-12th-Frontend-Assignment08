//https://0lrlokr.tistory.com/103
//https://kill-xxx.tistory.com/entry/React-%EC%A0%95%EB%A7%90-%EA%B0%84%EB%8B%A8%ED%95%9C-react-%EB%A1%9C%EB%94%A9%ED%99%94%EB%A9%B4-%EB%A7%8C%EB%93%A4%EA%B8%B0-react-loader-spinner-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0

import React from "react";
import { DotLoader } from "react-spinners";
import styled from "styled-components";

const LoadingWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: aliceblue;
`;

const LoadingContainer = styled.div`
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

const LoadingTxt = styled.div`
  font-size: 20px;
  margin-top: 50px;
  color: #5c91c4;
`;

const LoadingPage = ({ loading }) => {
  return (
    <LoadingWrap>
      <LoadingContainer>
        <DotLoader
          color='#77b7f7'
          loading={loading}
          size={100}
        />{" "}
        <LoadingTxt> 로딩 중 </LoadingTxt>{" "}
      </LoadingContainer>{" "}
    </LoadingWrap>
  );
};

export default LoadingPage;
