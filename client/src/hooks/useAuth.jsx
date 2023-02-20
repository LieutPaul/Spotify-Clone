import React from 'react'
import axios from 'axios'

export default function useAuth(code) {
    
    const [accessToken,setAccessToken] = React.useState();
    const [refreshToken,setRefreshToken] = React.useState();
    const [expiresIn,setExpiresIn] = React.useState();
    
    React.useEffect(()=>{
        try{
            const response = axios.post("http://localhost:4000/login",{
                "code":code
            })
            response.then((obj)=>{
                console.log(obj.data);
                setAccessToken(obj.data.accessToken);
                setRefreshToken(obj.data.refreshToken);
                setExpiresIn(obj.data.expiresIn);
                window.history.pushState({},null,"/") // Remove code from url 
            })
        }catch(err){
            console.log(err)
            window.location("/")
        }
        
    },[]);

    return {accessToken,refreshToken,expiresIn};
}
