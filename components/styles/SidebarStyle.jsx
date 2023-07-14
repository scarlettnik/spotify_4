import styled, { css } from "styled-components";

export const SidebarWrapper = styled.div`
  width: 28vh;
  text-align: left;
  flex-grow: 0;
  flex-shrink: 0;
  border-right: 1px solid #333;
  padding: 3vh;
  font-size: 1vh;
  display: flex;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 5vh;
    position: fixed;
    bottom: 0;
    left: 0;
    justify-content: space-around;
    align-items: center;
    background-color: #111;
    padding: 1rem;
    z-index: 999;
    transition: all 0.3s ease-in-out;
    display: flex;
  }
`;

export const ProfileImg = styled.img`
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
`;

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  color: #9e9e9e;
  cursor: pointer;
  width: 100%;
  text-decoration: none;
  font-size: 2.5vh;
  padding: 1vh;
  &:hover {
    color: #fff;
  }

  ${({ active }) =>
    active &&
    css`
      color: #fff;
    `}
  @media screen and (max-width: 768px) {
    justify-content: flex-start;
    padding: 0.5vh 2vh;
    font-size: 16px;
    width: auto;
  }
`;

export const PlaylistName = styled.p`
  cursor: default;
  color: #9e9e9e;
  width: 95%;
  text-decoration: none;
  font-size: 2.5vh;
  padding: 1vh;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    color: #fff;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const Text = styled.span`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
export const Account = styled.p`
  padding-left: 1rem;
  font-size: 3vh;
  color: white;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
export const Hr = styled.hr`
  color: #353535;
  width: 100%;
`;
