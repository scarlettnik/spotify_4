import React from "react";
import GlobalPlaylists from "./GlobalPlaylists";
import { FlexContainer } from "./styles/HomePageStyle";

const HomePage = ({ setView, setGlobalPlaylistId }) => {
  return (
    <FlexContainer>
      <div>
        <GlobalPlaylists
          setView={setView}
          setGlobalPlaylistId={setGlobalPlaylistId}
        />
      </div>
    </FlexContainer>
  );
};

export default HomePage;
