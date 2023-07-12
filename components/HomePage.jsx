import React from 'react';
import GlobalPlaylists from './GlobalPlaylists';
import LogOut from './LogOut';


const HomePage = ({ setView, setGlobalPlaylistId }) => {

    return (
        <div className='flex flex-col gap-8'>
            <LogOut/>
            <div> 
                <GlobalPlaylists
                    setView={setView}
                    setGlobalPlaylistId={setGlobalPlaylistId}
                />
            </div>
        </div>
    )
}

export default HomePage;