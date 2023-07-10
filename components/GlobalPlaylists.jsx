import { PlayIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const PlaylistContainer = styled.div`
  cursor: pointer;
  position: relative;
  width: 14rem;
  margin-bottom: 1rem;
  background-color: #4b5563;
  border-radius: 0.375rem;
  padding: 1rem;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #2d3748;
  }
`;

const PlaylistImage = styled.img`
  width: 12rem;
  height: 12rem;
  margin-bottom: 1rem;
`;

const PlaylistTitle = styled.p`
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.25rem;
  width: 12rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PlaylistOwner = styled.p`
  font-size: 0.875rem;
  font-weight: 400;
  color: #a0aec0;
  width: 12rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PlayButton = styled.div`
  cursor: pointer;
  opacity: 0;
  position: absolute;
  top: 9.75rem;
  right: 1rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #48bb78;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    background-color: #38a169;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
    fill: #000;
  }
`;

const LocalPlaylists = ({ setView, setGlobalPlaylistId }) => {
const PlaylistList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  height: calc(100vh - 6rem);
  overflow-y: scroll;
`;

const PlaylistWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
`;
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState([]);

  function selectPlaylist(playlist) {
    setView('playlist');
    setGlobalPlaylistId(playlist.id);
  }

  useEffect(() => {
    async function f() {
      if (session && session.accessToken) {
        const response = await fetch(
          `https://api.spotify.com/v1/browse/featured-playlists?${new URLSearchParams({
            country: 'US',
          })}`,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );
        const data = await response.json();
        setPlaylists(data?.playlists?.items);
      }
    }
    f();
  }, [session]);

  return (
    <PlaylistList>
      <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Global Playlists</h2>
      <PlaylistWrapper>
        {playlists?.map((playlist) => (
          <PlaylistContainer onClick={() => selectPlaylist(playlist)} key={playlist.id}>
            <PlayButton className="group-hover:opacity-100" aria-label="Play">
              <PlayIcon />
            </PlayButton>
            <PlaylistImage src={playlist?.images[0]?.url} alt={playlist?.name} />
            <PlaylistTitle>{playlist?.name}</PlaylistTitle>
            <PlaylistOwner>By {playlist?.owner?.display_name}</PlaylistOwner>
          </PlaylistContainer>
        ))}
      </PlaylistWrapper>
    </PlaylistList>
  );
};



export default LocalPlaylists;