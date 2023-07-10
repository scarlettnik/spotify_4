import { PauseCircleIcon, PlayCircleIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { Slider } from 'antd';

const Player = ({ globalCurrentSongId, setGlobalCurrentSongId, globalIsTrackPlaying, setGlobalIsTrackPlaying} ) => {
const { data: session } = useSession();
const [songInfo, setSongInfo] = useState(null);
const [volume, setVolume] = useState(50)


async function fetchSongInfo(trackId) {
    if (trackId && session && session.accessToken) {
        const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            }
        });
        const data = await response.json();
        setSongInfo(data);
    }
}

async function handlePlayPause() {
    if (session && session.accessToken) {
      try {
        const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`
          }
        });
        const data = await response.json();
        if (data?.is_playing) {
          const response = await fetch("https://api.spotify.com/v1/me/player/pause", {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${session.accessToken}`
            }
          });
          if (response.status === 204) {
            setGlobalIsTrackPlaying(false);
          }
        } else {
          const response = await fetch("https://api.spotify.com/v1/me/player/play", {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${session.accessToken}`
            }
          });
          if (response.status === 204) {
            setGlobalIsTrackPlaying(true);
          }
        }
      } catch (error) {
        console.log("Error handling play/pause:", error);
      }
    }
  }  

async function changeVolume(newVolume) {
    if (session && session.accessToken) {
        const response = await fetch(`https://api.spotify.com/v1/me/player/volume?volume_percent=${newVolume}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            }
        });
        if (response.ok) {
            console.log('Volume set to ' + newVolume);
            setVolume(newVolume);
        } else {
            console.log('Error setting volume');
        }
    }
}

async function nextTrack() {
    if (session && session.accessToken) {
        const response = await fetch('https://api.spotify.com/v1/me/player/next', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            },
        });
        if (response.ok && response.status) {
            const data = await response.json();
            setGlobalCurrentSongId(data?.item?.id);
            setGlobalIsTrackPlaying(true);
        } else {
            console.log('Error switching to next track');
        }
    }
}

async function previousTrack() {
    if (session && session.accessToken) {
        const response = await fetch('https://api.spotify.com/v1/me/player/previous', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            },
        });
        if (response.ok && response.status) {
            const data = await response.json();
            setGlobalCurrentSongId(data?.item?.id);
            setGlobalIsTrackPlaying(true);
        } else {
            console.log('Error switching to previous track');
        }
    }
}

useEffect(() => {
    if (globalCurrentSongId) {
        fetchSongInfo(globalCurrentSongId);
    }
}, [globalCurrentSongId]);

return (
    <div className="flex items-center space-x-4">
        {songInfo && (
            <div className="flex items-center space-x-4">
                <img
                    src={songInfo?.album?.images[0].url}
                    alt={songInfo?.name}
                    className="w-16 h-16"
                />
                <div>
                    <p>{songInfo?.name}</p>
                    <p>{songInfo?.artists?.map((artist) => artist.name).join(', ')}</p>
                </div>
            </div>
        )}
        <div className="flex items-center space-x-4">
            <button onClick={previousTrack}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>
            <button onClick={handlePlayPause}>
                {globalIsTrackPlaying ? (
                    <PauseCircleIcon className="h-6 w-6" />
                ) : (
                    <PlayCircleIcon className="h-6 w-6" />
                )}
            </button>
            <button onClick={nextTrack}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>
            <Slider
                className="w-32"
                min={0}
                max={100}
                value={volume}
                onChange={changeVolume}
            />
        </div>
    </div>
);
};

export default Player;