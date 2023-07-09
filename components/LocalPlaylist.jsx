import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { shuffle } from 'lodash';
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Song from './Song';

const colors = [
    'from-indigo-500',
    'from-blue-500',
    'from-green-500',
    'from-red-500',
    'from-yellow-500',
    'from-pink-500',
    'from-purple-500'
]

const PlaylistView = ({ globalPlaylistId, setGlobalCurrentSongId, setGlobalIsTrackPlaying, setView, setGlobalArtistId }) => {
    const { data: session } = useSession()
    const [playlistData, setPlaylistData] = useState(null)
    const [color, setColor] = useState(colors[0])
    
    useEffect(() => {
        async function f() {
            if (session && session.accessToken) {
                console.log(session)
                const response = await fetch(`https://api.spotify.com/v1/playlists/${globalPlaylistId}`, {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`
                    }
                })
                const data = await response.json()
                setPlaylistData(data)
            }
        }
        f()
    }, [session, globalPlaylistId])

    useEffect(() => {
        setColor(shuffle(colors).pop())
    }, [globalPlaylistId])

    return (
        <div className='flex-grow h-screen'>
            <div onClick={() => signOut()} className='absolute z-20 top-5 right-8 flex items-center bg-black bg-opacity-70 text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'>
                <img className='rounded-full w-7 h-7' src={session?.user.image} alt="profile pic" />
                <p className='text-sm'>Logout</p>
                <ChevronDownIcon className='h-5 w-5' />
            </div>
            <div className='relative -top-20 h-screen overflow-y-scroll bg-neutral-900'>
                <section className={`flex items-end space-x-7 bg-gradient-to-b to-neutral-900 ${color} h-80 text-white p-8`}>
                    {playlistData && <img className='h-44 w-44' src={playlistData.images[0].url} />}
                    <div>
                        <p className='text-sm font-bold'>Playlist</p>
                        <h1 className='text-2xl md:text-3xl lg:text-5xl font-extrabold'>{playlistData?.name}</h1>
                    </div>
                </section>
                <div className='text-white px-8 flex flex-col space-y-1 pb-28'>
                    {playlistData?.tracks.items.map((track, i) => {
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
                </div>
            </div>
        </div>
    );
}

export default PlaylistView;
