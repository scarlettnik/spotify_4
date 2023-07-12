import { signOut, useSession } from 'next-auth/react';
import React from 'react';

const LogOut = () => {
  const { data: session } = useSession();
    return (
      <div onClick={() => signOut()}>
        <img src={session?.user.image} alt="profile pic" />
        <p>{session?.user.name}</p>
      </div>
    );
};



export default LogOut