import React from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

export default function Player({accessToken,trackUri}) {
    const [play,setPlay] = React.useState(false);

    if(!accessToken){
        return null;
    }
    
    return (
      <div>
        <SpotifyPlayer
          token={accessToken}
          showSaveIcon
          callback={state => {
            if(!state.isPlaying){
              setPlay(false);
            }
          }}
          play={play}
          uris={trackUri ? [trackUri] : []}
        />
      </div>
    )
}
