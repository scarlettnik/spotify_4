import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const PlaylistContainer = styled.div`
  cursor: pointer;
  width: 20vh;
  margin-bottom: 1rem;
  border-radius: 0.375rem;
  padding: 1rem;
  transition: background-color 0.2s ease-in-out;
  bachgroun-color: pink;
  &:hover {
    background-color: #2d3748;
  }
`
const PlaylistName = styled.h2`
  font-size: 5vh;
  font-weight: 700;
  margin: 1rem;
`
const PlaylistImage = styled.img`
  width: 18vh;
  height: 18vh;
  margin-bottom: 1rem;
`;

const PlaylistTitle = styled.p`
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.25rem;
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
const PlaylistList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: calc(100vh - 0rem);
  padding: 0.5rem;
  overflow-y: hidden;
`;

const PlaylistWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  
`;



const LocalPlaylists = ({ setView, setGlobalPlaylistId }) => {

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
      <PlaylistName>Global Playlists</PlaylistName>
      <PlaylistWrapper>
        {playlists?.map((playlist) => (
          <PlaylistContainer onClick={() => selectPlaylist(playlist)} key={playlist?.id}>
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