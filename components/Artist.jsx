import {useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Song from './Song';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { shuffle } from 'lodash';
import styled, { css } from 'styled-components';
import LogOut from './LogOut';

const colors = [
    'from-indigo-500',
    'from-blue-500',
    'from-green-500',
    'from-red-500',
    'from-yellow-500',
    'from-pink-500',
    'from-purple-500'
]

const GradientBackground = styled.section`
    ${({ color }) => css`
        background-image: linear-gradient(to bottom, transparent, ${color}, var(--color-neutral-900));
    `}
`;

const ArtistContainer = styled.div`
    height: calc(100vh - var(--header-height));
    display: flex;
    width:100%;
    flex-direction: column;
`;

const ArtistHeader = styled.header`
    display: flex;
    align-items: flex-end;
    background-color: var(--color-neutral-900);
    height: 20rem;
    padding: 3vh;
`;

const ArtistImage = styled.img`
    height: 25vh;
    width: 25vh;
    border-radius: 50%;
`;

const ArtistInfo = styled.div`
    margin-left: 2vh;
`;

const ArtistName = styled.h1`
    font-size: 3.5vh;
    font-weight: 800;
    color: var(--color-white);
    margin-bottom: 0.5rem;
`;

const TopTracksContainer = styled.div`
    padding: 2rem;
`;

const TopTracksHeader = styled.h2`
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-white);
    margin-bottom: 1rem;
`;

const TopTracksList = styled.div`
    display: flex;
    flex-direction: column;
    color: var(--color-white);
`;

const RelatedArtistsContainer = styled.div`
    padding: 2rem;
`;

const RelatedArtistsHeader = styled.h2`
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-white);
    margin-bottom: 1rem;
`;

const RelatedArtistsList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 0 2rem;
`;

const RelatedArtistCard = styled.div`
    cursor: pointer;
    position: relative;
    width: 13vh;
    margin-bottom: 1rem;
    background-color: var(--color-neutral-800);
    border-radius: 0.5rem;
    padding: 1rem;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: var(--color-neutral-600);
    }
`;

const RelatedArtistImage = styled.img`
    border-radius: 50%;
`;

const RelatedArtistName = styled.p`
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-white);
    margin-bottom: 0.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const RelatedArtistType = styled.p`
    font-size: 0.875rem;
    color: var(--color-neutral-400);
    margin-bottom: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Artist = ({ setView, globalArtistId, setGlobalArtistId, setGlobalCurrentSongId, setGlobalIsTrackPlaying }) => {
    const { data: session } = useSession()
    const [color, setColor] = useState(colors[0])
    const [artistData, setArtistData] = useState(null)
    const [topTracks, setTopTracks] = useState([])
    const [relatedArtists, setRelatedArtists] = useState([])

    async function getArtistData() {
        const response = await fetch(`https://api.spotify.com/v1/artists/${globalArtistId}`, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            }
        })
        const data = await response.json()
        return data
    }

    async function getTopTracks() {
        const response = await fetch(`https://api.spotify.com/v1/artists/${globalArtistId}/top-tracks?` + new URLSearchParams({ market: "US" }), {
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            }
        })
        const data = await response.json()
        return data.tracks
    }

    async function getRelatedArtists() {
        const response = await fetch(`https://api.spotify.com/v1/artists/${globalArtistId}/related-artists`, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            }
        })
        const data = await response.json()
        return data.artists
    }

    useEffect(() => {
        async function f() {
            if (session && session.accessToken) {
                setArtistData(await getArtistData())
                setTopTracks(await getTopTracks())
                setRelatedArtists(await getRelatedArtists())
            }
        }
        f()
    }, [session, globalArtistId])

    useEffect(() => {
        setColor(shuffle(colors).pop())
    }, [globalArtistId])

    return (
        <ArtistContainer>
            <LogOut/>
            <div className='h-screen'>
                <GradientBackground color={color}>
                    <ArtistHeader>
                        {artistData && <ArtistImage src={artistData.images[0].url} />}
                        <ArtistInfo>
                            <p className='text-sm font-bold m-2'>Artist</p>
                            <ArtistName>{artistData?.name}</ArtistName>
                        </ArtistInfo>
                    </ArtistHeader>
                </GradientBackground>
                <TopTracksContainer>
                    <TopTracksHeader>Top tracks</TopTracksHeader>
                    <TopTracksList>
                        {topTracks?.slice(0, 5).map((track, i) => {
                            return <Song
                                setView={setView}
                                setGlobalArtistId={setGlobalArtistId}
                                setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
                                setGlobalCurrentSongId={setGlobalCurrentSongId}
                                key={track.id}
                                sno={i}
                                track={track}
                            />
                        })}
                    </TopTracksList>
                </TopTracksContainer>
                <RelatedArtistsContainer>
                    <RelatedArtistsHeader>Related artists</RelatedArtistsHeader>
                    <RelatedArtistsList>
                        {relatedArtists?.slice(0, 4).map((artist) => {
                            return <RelatedArtistCard onClick={() => setGlobalArtistId(artist.id)} key={artist.id}>
                                <RelatedArtistImage src={artist?.images[0]?.url} />
                                <RelatedArtistName>{artist.name}</RelatedArtistName>
                                <RelatedArtistType>Artist</RelatedArtistType>
                            </RelatedArtistCard>
                        })}
                    </RelatedArtistsList>
                </RelatedArtistsContainer>
            </div>
        </ArtistContainer>
    );
}

export default Artist;