import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 36, 86, 0.5);
`;

export const ModalContent = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const Img = styled.img`
  width: calc(100vw - 400px);
  height: calc(100vh - 200px);
  object-fit: cover;
`;
