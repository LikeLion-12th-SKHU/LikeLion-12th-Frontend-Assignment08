import React from "react";
import styled from "styled-components";

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f3f3f3;
`;

const LoadingText = styled.h2`
  color: #333;
`;

function LoadingPage() {
  return (
    <LoadingContainer>
      <LoadingText>Loading...</LoadingText>
    </LoadingContainer>
  );
}

export default LoadingPage;
