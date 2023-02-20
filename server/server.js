const express = require('express');
const cors = require('cors')
const SpotifyWebApi = require("spotify-web-api-node");

const app=express();
app.use(cors())
app.use(express.json())

app.post("/login",(req,res)=>{
    const code = req.body.code
    
    const spotifyAPI = new SpotifyWebApi({
        redirectUri:"http://localhost:3000",
        clientId:"51ce5ef38f294a3da14e48aeaefcbc64",
        clientSecret:"5adeb782ad524e6ba014ff45665714dd"
    })
    
    spotifyAPI.authorizationCodeGrant(code)
    .then((data)=>{
        res.send({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    })
    .catch((err)=>{
        console.log(err)
        res.sendStatus(400)
    })
})
app.listen(4000,()=>{
    console.log("Listening on port 4000")
})