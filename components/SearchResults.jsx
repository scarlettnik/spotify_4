import React from 'react';
import { styled } from 'styled-components';


const PlaylistContainer = styled.div`
  cursor: pointer;
  position: relative;
  width: 20vh;
  margin-bottom: 1rem;
  border-radius: 0.375rem;
  padding: 1rem;
  transition: background-color 0.2s ease-in-out;
  bachgroud-color: pink;
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
  padding: 1rem;
`;

const PlaylistWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SearchResults = ({ playlists, artists, setView, setGlobalPlaylistId, setGlobalArtistId }) => {

    function selectPlaylist(playlist) {
        setView("playlist")
        setGlobalPlaylistId(playlist.id)
    }

    function selectArtist(artist) {
        setView("artist")
        setGlobalArtistId(artist.id)
    }

    return (
        <PlaylistList>
            <div>
                    <PlaylistName>Top result</PlaylistName>
                    <PlaylistWrapper>
                        <PlaylistContainer onClick={() => selectPlaylist(playlists[0])}>
                            {playlists && <>
                                <PlaylistImage src={playlists[0]?.images[0]?.url} />
                                <PlaylistTitle>{playlists[0]?.name}</PlaylistTitle>
                                <PlaylistOwner>By {playlists[0]?.owner?.display_name} <span >Playlist</span></PlaylistOwner>
                            </>}
                        </PlaylistContainer>
                    </PlaylistWrapper>
            </div>
            <div>
                <PlaylistName>Artists</PlaylistName>
                <PlaylistWrapper>
                    {artists?.slice(0, 5).map((artist) => {
                        return <PlaylistContainer onClick={() => selectArtist(artist)} key={artist.id}>
                            <PlaylistImage src={artist?.images[0]?.url} />
                            <PlaylistTitle>{artist?.name}</PlaylistTitle>
                            <PlaylistOwner>Artist</PlaylistOwner>
                        </PlaylistContainer>
                    })}
                </PlaylistWrapper>
            </div>
            <div>
                <PlaylistName>Playlists</PlaylistName>
                <PlaylistWrapper>
                    {playlists?.slice(0, 5)?.map((playlist) => {
                        return <PlaylistContainer onClick={() => selectPlaylist(playlist)} key={playlist?.id}>
                            <PlaylistImage src={playlist?.images[0]?.url} />
                            <PlaylistTitle>{playlist?.name}</PlaylistTitle>
                            <PlaylistOwner>By {playlist?.owner?.display_name}</PlaylistOwner>
                        </PlaylistContainer>
                    })}
                </PlaylistWrapper>
            </div>
        </PlaylistList>
    )
}

export default SearchResults;
