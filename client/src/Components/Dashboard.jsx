import React from 'react'
import useAuth from '../hooks/useAuth'
import SpotifyWebApi from 'spotify-web-api-node';
import TrackSearchResult from './TrackSearchResult';

const spotifyAPI = new SpotifyWebApi({
    clientId:"51ce5ef38f294a3da14e48aeaefcbc64"
})

export default function Dashboard({code}) {
    const [search,setSearch] = React.useState("");
    const [searchResults,setSearchResults] = React.useState([]);
    const {accessToken} = useAuth(code);

    React.useEffect(()=>{
        if(!accessToken){
            return ;
        }
        spotifyAPI.setAccessToken(accessToken);
    },[accessToken])
    
    React.useEffect(()=>{
        async function getTracks(){
            
            const tracks = await spotifyAPI.searchTracks(search)
            let arr=[];
            tracks.body.tracks.items.map((track)=>{
                
                let smallestAlbumImage;
                smallestAlbumImage=track.album.images[0];
                
                for(var i=0;i<(track.album.images).length;i++){
                    if(track.album.images[i].height<smallestAlbumImage.height){
                        smallestAlbumImage=track.album.images[i];
                    }
                }
                const newTrack = {
                    artist : track.artists[0].name,
                    title : track.name,
                    uri : track.uri,
                    albumUrl : smallestAlbumImage.url
                };
                arr.push(newTrack);
            })
            setSearchResults(arr);
        }

        if(!search){
            return setSearchResults([]);
        }
        if(!accessToken){
            return ;
        }
        getTracks();
        console.log(searchResults)
        
    },[accessToken,search])
    return (
        <>
            <div className='container d-flex flex-column py-2' style={{"height":"100vh"}}>
            {/* py-2 provides padding to the top and bottom */}
                <div className='row'>
                    <input 
                        className="form-control"
                        type='search' 
                        placeholder='Search Song/Artists' 
                        value={search}
                        onChange={(e)=>{
                            setSearch(e.target.value);
                        }}
                    >
                    </input>
                </div>

                <div className='flex-grow-1 my-2' style={{"overflowY":"auto"}}>
                {/* flex-grow-1 will make the div occupy the entire available space till end of file */}
                    Songs
                    {searchResults.map(track =>{
                        return <TrackSearchResult track={track}/>
                    })}
                </div>

            </div>
        </>
    );
}
