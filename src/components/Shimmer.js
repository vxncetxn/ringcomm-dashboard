import styled, { keyframes } from "styled-components";

const ShimmerAnimation = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const Shimmer = styled.div`
  background: linear-gradient(to right, #303569 4%, #40478c 25%, #303569 36%);
  background-size: 1000px 100%;
  animation: ${ShimmerAnimation} 2s infinite;
`;

export default Shimmer;
