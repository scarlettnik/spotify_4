import styled from "styled-components";
import { Slider } from "antd";

export const StyledPlayer = styled.div`
  background-color: #64748b;
  display: flex;
  position: relative;
  @media screen and (max-width: 768px) {
    margin-bottom: 5vh;
  }
`;

export const SongInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const SongImage = styled.img`
  width: 4rem;
  height: 4rem;
`;

export const SongDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

export const SongName = styled.p`
  width: 20vw;
  overflow: hidden;
  text-overflow: ellipsis;
  text-space: nowrap;
  
`;

export const ArtistName = styled.p`
  width: 20vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ControlButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const VolumeSlider = styled(Slider)`
  width: 5rem;
  position: absolute;
  right: 1rem;
`;

export const ControlContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;