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
  background: linear-gradient(
    to right,
    var(--color-shimmer-bg) 4%,
    var(--color-shimmer-shine) 25%,
    var(--color-shimmer-bg) 36%
  );
  background-size: 1000px 100%;
  animation: ${ShimmerAnimation} 2s infinite;
`;

export default Shimmer;
