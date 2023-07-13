import styled, { css } from "styled-components";

export const SongContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  overflow: hidden;
  text-color: ${({ theme }) => theme.textPrimary};
  font-size: 1, 5vh;
  padding: 1vh;
  cursor: default;

  &:hover {
    background-color: #757575;
    border-radius: 10px;
    transition: 80%;
  }
`;

export const TrackInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1vh;
`;

export const TrackNumber = styled.p`
  width: 5px;
  padding-right: 1rem;
`;

export const AlbumImage = styled.img`
  height: 40px;
  width: 40px;
`;
export const AlbumSize = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: auto;

  @media (min-width: 768px) {
    margin-left: 0;
  }
`;
export const TrackDetails = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  .name {
    width: 20vh;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .artist {
    width: 20vh;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    span {
      ${({ theme }) => css`
        color: ${theme.textPrimary};
        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      `}
    }
  }
`;

export const TrackDuration = styled.p`
  width: 50px;
  text-align: right;
`;

export const AlbumName = styled.p`
  width: 20vh;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const PlayButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
`;
