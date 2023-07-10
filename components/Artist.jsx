import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Song from './Song';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { shuffle } from 'lodash';
import { PlayIcon } from '@heroicons/react/24/solid';
import styled, { css } from 'styled-components';

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

const ArtistHeader = styled.header`
    display: flex;
    align-items: flex-end;
    background-color: var(--color-neutral-900);
    height: 20rem;
    padding: 2rem;
`;

const ArtistImage = styled.img`
    height: 11rem;
    width: 11rem;
    border-radius: 50%;
`;

const ArtistInfo = styled.div`
    margin-left: 2rem;
`;

const ArtistName = styled.h1`
    font-size: 2rem;
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
    padding: 1rem 2rem;
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
    width: 14rem;
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
    width: 100%;
    height: 10rem;
    border-radius: 50%;
`;

const RelatedArtistName = styled.p`
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-white);
    margin-bottom: 0.5rem;
    width: 11rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const RelatedArtistType = styled.p`
    font-size: 0.875rem;
    color: var(--color-neutral-400);
    margin-bottom: 0;
    width: 11rem;
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
            <LogoutButton onClick={() => signOut()}>
                <img className='rounded-full w-7 h-7' src={session?.user.image} alt="profile pic" />
                <LogoutButtonText>Logout</LogoutButtonText>
                <LogoutButtonIcon />
            </LogoutButton>
            <div className='relative -top-20 h-screen overflow-y-scroll bg-neutral-900'>
                <GradientBackground color={color}>
                    <ArtistHeader>
                        {artistData && <ArtistImage src={artistData.images[0].url} />}
                        <ArtistInfo>
                            <p className='text-sm font-bold'>Artist</p>
                            <ArtistName>{artistData?.name}</ArtistName>
                        </ArtistInfo>
                    </ArtistHeader>
                </GradientBackground>
                <TopTracksContainer>
                    <TopTracksHeader>Top tracks</TopTracksHeader>
                    <TopTracksList>
                        {topTracks.slice(0, 5).map((track, i) => {
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
                        {relatedArtists.slice(0, 4).map((artist) => {
                            return <RelatedArtistCard onClick={() => setGlobalArtistId(artist.id)} key={artist.id}>
                                <RelatedArtistImage src={artist.images[0].url} />
                                <RelatedArtistName>{artist.name}</RelatedArtistName>
                                <RelatedArtistType>Artist</RelatedArtistType>
                                <div className='opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 absolute top-[156px] group-hover:top-[148px] right-6'>
                                    <PlayIcon className='h-6 w-6 text-black' />
                                </div>
                            </RelatedArtistCard>
                        })}
                    </RelatedArtistsList>
                </RelatedArtistsContainer>
            </div>
        </ArtistContainer>
    );
}

export default Artist;