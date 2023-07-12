import {MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
import GlobalPlaylists from './GlobalPlaylists';
import SearchResults from './SearchResults';
import LogOut from './LogOut';
import styled from 'styled-components';

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 90%;
  margin: 0 5%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 3rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #4d4d4d;
  background-color: #fff;
  border-radius: 9999px;
  border: 1px solid #d1d1d1;
  outline: none;
`;

const SearchIcon = styled(MagnifyingGlassIcon)`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  width: 1.5rem;
  height: 1.5rem;
  color: #4d4d4d;
`;

const Search = ({ setView, setGlobalPlaylistId, setGlobalCurrentSongId, setGlobalIsTrackPlaying, setGlobalArtistId }) => {
    const { data: session } = useSession()
    const [searchData, setSearchData] = useState(null)
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef(null)

    async function updateSearchResults(query) {
        const response = await fetch("https://api.spotify.com/v1/search?" + new URLSearchParams({
            q: query,
            type: ["artist", "playlist", "track"]
        }), {
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            }
        })
        const data = await response.json()
        setSearchData(data)
    }

    useEffect(() => {
        inputRef.current.focus()
    }, [inputRef])

    return (
        <div className='flex-grow h-screen'>
            <LogOut/>
            <SearchBar>
                <SearchIcon/>
                <SearchInput value={inputValue} onChange={async (e) => {
                        setInputValue(e.target.value)
                        await updateSearchResults(e.target.value)
                    }} ref={inputRef} 
                />
            </SearchBar>
            <div>
                {inputValue == '' ? <GlobalPlaylists
                    setView={setView}
                    setGlobalPlaylistId={setGlobalPlaylistId}
                /> : <SearchResults
                    playlists={searchData?.playlists?.items}
                    songs={searchData?.tracks?.items}
                    artists={searchData?.artists?.items}
                    setView={setView}
                    setGlobalPlaylistId={setGlobalPlaylistId}
                    setGlobalCurrentSongId={setGlobalCurrentSongId}
                    setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
                    setGlobalArtistId={setGlobalArtistId}
                />}
            </div>
        </div>
    )
}

export default Search;
