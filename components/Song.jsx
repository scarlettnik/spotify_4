import { PlayHover } from "./styles/IconStyle";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import {
  SongContainer,
  TrackInfo,
  TrackNumber,
  AlbumImage,
  TrackDetails,
  TrackDuration,
  AlbumSize, 
  AlbumName,
  PlayButton,
} from "./styles/SongStyle";

const Song = ({
  sno,
  track,
  setGlobalCurrentSongId,
  setGlobalIsTrackPlaying,
  setView,
  setGlobalArtistId,
}) => {
  const { data: session } = useSession();
  const [hover, setHover] = useState(false);

  async function playSong(track) {
    setGlobalCurrentSongId(track.id);
    setGlobalIsTrackPlaying(true);
    if (session && session.accessToken) {
      const response = await fetch(
        "https://api.spotify.com/v1/me/player/play",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: JSON.stringify({
            uris: [track.uri],
          }),
        }
      );
      console.log("on play", response.status);
    }
  }

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return seconds == 60
      ? minutes + 1 + ":00"
      : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  function selectArtist(artist) {
    setView("artist");
    setGlobalArtistId(artist.id);
  }

  return (
    <SongContainer
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <TrackInfo onClick={async () => await playSong(track)}>
        {hover ? (
          <PlayButton>
            <PlayHover/>
          </PlayButton>
        ) : (
          <TrackNumber>{sno + 1}</TrackNumber>
        )}
        {track?.album?.images[0]?.url && (
          <AlbumImage src={track?.album?.images[0].url} />
        )}
        <TrackDetails>
          <p className="name">{track?.name}</p>
          <p className="artist">
            {track?.artists?.map((artist, i) => {
              return (
                <span key={artist.id} onClick={() => selectArtist(artist)}>
                  {artist?.name}
                  {i !== track?.artists?.length - 1 && `, `}
                </span>
              );
            })}
          </p>
        </TrackDetails>
      </TrackInfo>
      <AlbumSize>
        <AlbumName>{track?.album?.name}</AlbumName>
        <TrackDuration>
          {millisToMinutesAndSeconds(track?.duration_ms)}
        </TrackDuration>
      </AlbumSize>
    </SongContainer>
  );
};

export default Song;
