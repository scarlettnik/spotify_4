import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { shuffle } from 'lodash';
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Song from './Song';
import styled from 'styled-components';
import LocalPlaylists from './GlobalPlaylists';

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500'
];

const LocalPlaylist = ({ globalPlaylistId, setGlobalCurrentSongId, setGlobalIsTrackPlaying, setView, setGlobalArtistId }) => {
  const { data: session } = useSession();
  const [playlistData, setPlaylistData] = useState(null);
  const [color, setColor] = useState(colors[0]);

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

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [globalPlaylistId]);

  return (
    <Container>
      <LogoutButton onClick={() => signOut()}>
        <img src={session?.user.image} alt="profile pic" />
        <p>Logout</p>
        <ChevronDownIcon />
      </LogoutButton>
      <Wrapper>
        <Header className={`${color}`}>
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100vh;
  position: relative;
`;

const LogoutButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: #000;
  opacity: 0.9;
  transition: opacity 0.2s ease-in-out;
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 20;
  border-radius: 50%;
  padding: 0.5rem;

  &:hover {
    opacity: 0.8;
  }

  img {
    border-radius: 50%;
    width: 1.75rem;
    height: 1.75rem;
    margin-right: 0.5rem;
  }

  p {
    font-size: 0.875rem;
    color: #fff;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
    fill: #fff;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 5rem);
  overflow-y: scroll;
`;

const Header = styled.section`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 7px;
  height: 80vh;
  background: linear-gradient(to bottom, #4f4f4f, ${props => props.className});
  padding: 8rem;
`;

const PlaylistImage = styled.img`
  width: 250px;
  height: 250px;
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const PlaylistLabel = styled.p`
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #fff;
`;

const PlaylistTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin: 1rem 0;
  color:#fff;
`;

const SongList = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  padding: 0 2rem;
  margin-bottom: 5rem;

  & > * + * {
    margin-top: 0.5rem;
  }
`;
export default LocalPlaylist