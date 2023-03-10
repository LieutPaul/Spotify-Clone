import React from 'react'
const AUTH_URL = "https://accounts.spotify.com/authorize?client_id="+process.env.REACT_APP_clientID+"&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";
export default function Login() {
  return (
    <div className='container d-flex justify-content-center align-items-center' style={{"minHeight":"100vh"}}>
      <a className='btn btn-success btn-lg' href={AUTH_URL}>Login with Spotify</a>
    </div>
  )
}
