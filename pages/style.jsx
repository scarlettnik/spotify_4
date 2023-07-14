import styled from "styled-components";

export const MainContent = styled.main`
  background-color: rgb(23 23 23);
  height: 100vh;
  overflow: auto;
`;
export const Container = styled.div`
  display: flex;
  width: 100%;
`;

export const PlayerBar = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #374151;
`;

export const FullScreenContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: rgb(23 23 23);
  align-items: center;
  justify-content: center;
`;

export const LoginButton = styled.button`
  color: white;
  padding: 0.5rem 2rem;
  border-radius: 9999px;
  background-color: #10b981; /* or use your own green-500 color */
  font-weight: bold;
  font-size: 1.125rem;
`;
