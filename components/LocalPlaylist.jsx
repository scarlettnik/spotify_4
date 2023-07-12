import { shuffle } from 'lodash';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Song from './Song';
import styled, {css} from 'styled-components';
import LogOut from '../components/LogOut'

const colors = [
  'from-indigo-700',
  'from-blue-700',
  'from-green-700',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500'
];

const Header = styled.section`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 7px;
  height: 80vh;
  background: linear-gradient(to bottom, green, ${props => props.color}) !important;
  padding: 1rem;
`;

const PlaylistImage = styled.img`
  width: 25vh;
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0;
`;

const PlaylistLabel = styled.p`
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #fff;
`;

const PlaylistTitle = styled.h1`
  font-size: 4vh;
  font-weight: 800;
  margin: 0;
  color:#fff;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
    
`;
const SongList = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  padding: 0 2rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 0rem);
  @media (max-width: 700px) {
  
    ${SongList} {
      padding: 0 1rem;
      ${css`
        & > * {
          flex-basis: calc(100% - 2rem);
        }
      `}
    }
  }
`;


const LocalPlaylist = ({ globalPlaylistId, setGlobalCurrentSongId, setGlobalIsTrackPlaying, setView, setGlobalArtistId }) => {
  const { data: session } = useSession();
  const [playlistData, setPlaylistData] = useState(null);
  const color = colors[Math.floor(Math.random() * colors.length)];

  useEffect(() => {
    async function f() {
      if (session && session.accessToken) {
        console.log(session);
        const response = await fetch(`https://api.spotify.com/v1/playlists/${globalPlaylistId}`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`
          }
        });
        const data = await response.json();
        setPlaylistData(data);
      }
    }
    f();
  }, [session, globalPlaylistId]);

  return (
    <Container>
      <LogOut/>
      <Wrapper>
        <Header color={color}>
          {playlistData && <PlaylistImage src={playlistData.images[0].url} />}
          <HeaderContent>
            <PlaylistLabel>Playlist</PlaylistLabel>
            <PlaylistTitle>{playlistData?.name}</PlaylistTitle>
          </HeaderContent>
        </Header>
        <SongList>
          {playlistData?.tracks?.items?.map((track, i) => {
            return <Song
              setView={setView}
              setGlobalArtistId={setGlobalArtistId}
              setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
              setGlobalCurrentSongId={setGlobalCurrentSongId}
              key={track.track.id}
              sno={i}
              track={track.track}
            />
          })}
        </SongList>
      </Wrapper>
    </Container>
  );
};

export default LocalPlaylist