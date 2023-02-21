import React from 'react'
import axios from 'axios'

export default function useAuth(code) {
    
    const [accessToken,setAccessToken] = React.useState();
    const [refreshToken,setRefreshToken] = React.useState();
    const [expiresIn,setExpiresIn] = React.useState();
    
    React.useEffect(()=>{
        try{
            async function getTokens(){
                const response = await axios.post("http://localhost:4000/login",{
                    "code":code
                })
                const obj = response.data;
                setAccessToken(obj.accessToken);
                setRefreshToken(obj.refreshToken);
                setExpiresIn(obj.expiresIn);
                window.history.pushState({},null,"/") // Remove code from url 
            }
            getTokens();
        }catch(err){
            console.log(err)
            window.location("/")
        }
        
    },[]);

    React.useEffect(()=>{
        if(!refreshToken || !expiresIn){
            return ;
        }
        
        const interval = setInterval(async () => {
            // The generation of new access token will take place 60 seconds before expiresIn
            try{
                const response = await axios.post("http://localhost:4000/refresh",{
                    "refreshToken" : refreshToken
                })
                setAccessToken(response.data.accessToken);
                setExpiresIn(response.data.expiresIn);
            }catch(err){
                console.log(err)
                window.location("/")
            }
        }, (expiresIn - 60 ) * 1000)

        return () => clearInterval(interval)
    },[refreshToken,expiresIn])

    return {accessToken,refreshToken,expiresIn};
}
