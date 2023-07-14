import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  SidebarWrapper,
  Button,
  PlaylistName,
  Text,
  Account,
  Hr,
  ProfileImg,
} from "./styles/SidebarStyle";
import { HomeI, LibraryI, SearchI, LogOutI } from "./styles/IconStyle";

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
        <Button>
          <ProfileImg src={session?.user.image} alt="profile pic" />
          <Account>{session?.user?.name}</Account>
        </Button>
        <Button onClick={() => signOut()}>
          <LogOutI />
          <Text>Log Out</Text>
        </Button>
        <Button
          active={view === "homepage"}
          onClick={() => setView("homepage")}
        >
          <HomeI />
          <Text>Home</Text>
        </Button>
        <Button active={view === "search"} onClick={() => setView("search")}>
          <SearchI />
          <Text>Search</Text>
        </Button>
        <Button active={view === "library"} onClick={() => setView("library")}>
          <LibraryI />
          <Text>Your Library</Text>
        </Button>
        <Hr />
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
