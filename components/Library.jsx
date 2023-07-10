import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { PlayIcon } from '@heroicons/react/24/solid';
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const PlaylistContainer = styled.div`
  cursor: pointer;
  position: relative;
  width: 14rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
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

const LogoutButton = styled.div`
    position: absolute;
    top: 2.5rem;
    right: 2rem;
    z-index: 20;
    display: flex;
    align-items: center;
    background-color: var(--color-neutral-900);
    opacity: 0.9;
    cursor: pointer;
    border-radius: 50%;
    padding: 0.25rem 0.5rem;
    transition: opacity 0.2s ease-in-out;

    &:hover {
        opacity: 0.8;
    }
`;

const LogoutButtonText = styled.p`
    font-size: 1rem;
    color: var(--color-white);
`;

const LogoutButtonIcon = styled(ChevronDownIcon)`
    height: 1.25rem;
    width: 1.25rem;
    color: var(--color-white);
    margin-left: 0.25rem;
`;

const Library = ({ setView, setGlobalPlaylistId }) => {

    const LibraryContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 5;
    height: 100vh;
    header {
      background-color: #000;
      color: #fff;
      font-size: 2.5rem;
      font-weight: 700;
      height: 5rem;
      position: sticky;
      top: 0;
      z-index: 10;
    }
  `;
  
  const LibraryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem 2rem;
    height: calc(100vh - 8rem);
    overflow-y: scroll;
  `;
  
  const PlaylistList = styled.div`
    display: inline-flex;
    grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
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
        const response = await fetch('https://api.spotify.com/v1/me/playlists', {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });
        const data = await response.json();
        setPlaylists(data.items);
      }
    }
    f();
  }, [session]);

  return (
    <LibraryContainer>
      <LogoutButton onClick={() => signOut()}>
            <img className='rounded-full w-7 h-7' src={session?.user.image} alt="profile pic" />
            <LogoutButtonText>Logout</LogoutButtonText>
            <LogoutButtonIcon />
        </LogoutButton>
      <LibraryWrapper>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Playlists</h2>
        <PlaylistList>
          {playlists.map((playlist) => (
            <PlaylistContainer onClick={() => selectPlaylist(playlist)} key={playlist.id}>
              <PlayButton className="group-hover:opacity-100" aria-label="Play">
                <PlayIcon />
              </PlayButton>
              <PlaylistImage src={playlist?.images[0]?.url} alt={playlist?.name} />
              <PlaylistTitle>{playlist?.name}</PlaylistTitle>
              <PlaylistOwner>By {playlist?.owner?.display_name}</PlaylistOwner>
            </PlaylistContainer>
          ))}
        </PlaylistList>
      </LibraryWrapper>
    </LibraryContainer>
  );
};
export default Library;
