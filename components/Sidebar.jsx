import { BuildingLibraryIcon, MagnifyingGlassIcon, HomeIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

const Sidebar = ({ view, setView, setGlobalPlaylistId }) => {
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    async function f() {
      if (session && session.accessToken) {
        const response = await fetch('https://api.spotify.com/v1/me/playlists', {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });
        const data = await response.json();
        setPlaylists(data.items);
      }
    }
    f();
  }, [session]);

  return (
    <div className="w-70 text-neutral-400 grow-0 shrink-0 border-r border-neutral-900 pl-5 pt-5 text-xl hidden md:inline-flex">
      <div className="space-y-4">
      <div>
        
      </div>
      <button
          onClick={() => signOut()}
          className={`flex items-center space-x-2 hover:text-white`}
        >
          <ArrowRightOnRectangleIcon className="h-7 w-7" />
          <p>Sign Out</p>
        </button>        

        <button
          onClick={() => setView('homepage')}
          className={`flex items-center space-x-2 hover:text-white ${view == 'homepage' ? 'text-white' : null}`}
        >
          <HomeIcon className="h-7 w-7" />
          <p>Home</p>
        </button>
        <button
          onClick={() => setView('search')}
          className={`flex items-center space-x-2 hover:text-white ${view == 'search' ? 'text-white' : null}`}
        >
          <MagnifyingGlassIcon className="h-7 w-7" />
          <p>Search</p>
        </button>
        <button
          onClick={() => setView('library')}
          className={`flex items-center space-x-2 hover:text-white ${view == 'library' ? 'text-white' : null}`}
        >
          <BuildingLibraryIcon className="h-7 w-7" />
          <p>Your Library</p>
        </button>

        <hr className="border-neutral-900 w-full" />

        <div className="hidden md:block">
          {playlists?.map((playlist) => {
            return (
              <p
                onClick={() => {
                  setView('playlist');
                  setGlobalPlaylistId(playlist?.id);
                }}
                key={playlist.id}
                className="cursor-default hover:text-white w-52 truncate"
              >
                {playlist?.name}
              </p>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default Sidebar;