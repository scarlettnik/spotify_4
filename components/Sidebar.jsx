import {
  BuildingLibraryIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

const SidebarWrapper = styled.div`
  width: 20vh;
  text-align: left;
  flex-grow: 0;
  flex-shrink: 0;
  border-right: 1px solid #333;
  padding: 3vh;
  font-size: 16px;
  display: flex;

  @media screen and (max-width: 768px) {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #111;
    padding: 1rem;
    z-index: 999;
    transition: all 0.3s ease-in-out;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  color: green;
  cursor: pointer;
  width: 100%;
  text-decoration: none;
  font-size: 2vh;
  padding: 2vh
  &:hover {
    color: #fff;
  }

  ${({ active }) =>
    active &&
    css`
      color: #fff;
    `}
`;

const PlaylistName = styled.p`
  cursor: default;
  color: green;
  width: 95%;
  text-decoration: none;
  font-size: 1.7vh;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    color: #fff;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Sidebar = ({ view, setView, setGlobalPlaylistId }) => {
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    async function f() {
      if (session && session.accessToken) {
        const response = await fetch(
          "https://api.spotify.com/v1/me/playlists",
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );
        const data = await response.json();
        setPlaylists(data.items);
      }
    }
    f();
  }, [session]);

  return (
    <SidebarWrapper>
      <div>
        <Button
          active={view === "homepage"}
          onClick={() => setView("homepage")}
        >
          <BuildingLibraryIcon className="h-7 w-7" />
          <span>Home</span>
        </Button>
        <Button active={view === "search"} onClick={() => setView("search")}>
          <MagnifyingGlassIcon className="h-7 w-7" />
          <span>Search</span>
        </Button>
        <Button active={view === "library"} onClick={() => setView("library")}>
          <BuildingLibraryIcon className="h-7 w-7" />
          <span>Your Library</span>
        </Button>
        <hr className="" />
        <div>
          {playlists?.map((playlist) => {
            return (
              <PlaylistName
                key={playlist.id}
                onClick={() => {
                  setView("playlist");
                  setGlobalPlaylistId(playlist?.id);
                }}
                active={view === "playlist"}
              >
                {playlist?.name}
              </PlaylistName>
            );
          })}
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;
