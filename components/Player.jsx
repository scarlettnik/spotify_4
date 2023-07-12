import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Slider } from "antd";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/outline";

const Player = ({
  globalCurrentSongId,
  globalIsTrackPlaying,
  setGlobalIsTrackPlaying,
}) => {
  const { data: session } = useSession();
  const [songInfo, setSongInfo] = useState(null);
  const [volume, setVolume] = useState(50);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  async function fetchSongInfo(trackId) {
    if (trackId && session && session.accessToken) {
      const response = await fetch(
        `https://api.spotify.com/v1/tracks/${trackId}`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      const data = await response.json();
      setSongInfo(data);
    }
  }

  async function fetchDevices() {
    if (session && session.accessToken) {
      const response = await fetch(
        "https://api.spotify.com/v1/me/player/devices",
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setDevices(data.devices);
    }
  }

  useEffect(() => {
    if (globalCurrentSongId) {
      fetchSongInfo(globalCurrentSongId);
    }
  }, [globalCurrentSongId]);

  useEffect(() => {
    fetchDevices();
  }, [session]);

  async function handlePlayPause() {
    if (session && session.accessToken) {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/me/player/currently-playing",
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );
        const data = await response.json();
        if (data?.is_playing) {
          const response = await fetch(
            "https://api.spotify.com/v1/me/player/pause",
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
            }
          );
          if (response.status === 204) {
            setGlobalIsTrackPlaying(false);
          }
        } else {
          const response = await fetch(
            "https://api.spotify.com/v1/me/player/play",
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
            }
          );
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
      const response = await fetch(
        `https://api.spotify.com/v1/me/player/volume?volume_percent=${newVolume}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      if (response.ok) {
        console.log("Volume set to " + newVolume);
        setVolume(newVolume);
      } else {
        console.log("Error setting volume");
      }
    }
  }

  async function transferPlayback(deviceId) {
    if (session && session.accessToken) {
      const response = await fetch(`https://api.spotify.com/v1/me/player`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          device_ids: [deviceId],
          play: globalIsTrackPlaying,
        }),
      });
      if (response.ok) {
        console.log("Playback transferred to device " + deviceId);
        setSelectedDeviceId(deviceId);
      } else {
        console.log("Error transferring playback");
      }
    }
  }

  const handleDeviceChange = (event) => {
    const deviceId = event.target.value;
    transferPlayback(deviceId);
  };
  return (
    <div>
      {songInfo && (
        <div className="bg-slate-500 flex relative">
          <div className={`items-center flex p-2`}>
            <img
              src={songInfo?.album?.images[0].url}
              alt={songInfo?.name}
              className="w-16 h-16"
            />
            <div className={`items-center px-1`}>
              <p className="text-overflow: ellipsis; truncate">
                {" "}
                {songInfo?.name}
              </p>
              <p className="text-overflow: ellipsis; truncate">
                {songInfo?.artists?.map((artist) => artist.name).join(", ")}
              </p>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-4">
            <button onClick={handlePlayPause}>
              {globalIsTrackPlaying ? (
                <PauseIcon className="h-10 w-10" />
              ) : (
                <PlayIcon className="h-10 w-10" />
              )}
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <Slider
              className="w-20 absolute right-4"
              min={0}
              max={100}
              value={volume}
              onChange={changeVolume}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
