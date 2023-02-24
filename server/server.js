const express = require('express');
const cors = require('cors')
const SpotifyWebApi = require("spotify-web-api-node");
const lyricsFinder = require('lyrics-finder')
require('dotenv').config()

const app=express();
app.use(cors())
app.use(express.json())

app.post("/refresh",(req,res)=>{
    const refreshToken=req.body.refreshToken;
    console.log("Hi")
    const spotifyApi = new SpotifyWebApi({
        redirectUri:"http://localhost:3000",
        clientId : process.env.clientID,
        clientSecret: process.env.clientSecret,
        refreshToken
    });

    spotifyApi.refreshAccessToken()
    .then((data) => {
        res.send({
            accessToken : data.body.access_token,
            expiresIn : data.body.expires_in
        })
    }).catch((err)=> {
        console.log('Could not refresh access token', err);
        res.sendStatus(400).send('Could not refresh access token')
    });
})

app.post("/login",(req,res)=>{
    const code = req.body.code
    const spotifyAPI = new SpotifyWebApi({
        redirectUri:"http://localhost:3000",
        clientId : process.env.clientID,
        clientSecret : process.env.clientSecret
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
});

app.post("/lyrics", async (req,res)=>{
    const lyrics = await lyricsFinder(req.body.artist,req.body.track) || 'No Lyrics Found'
    console.log(lyrics)
    res.send(lyrics);
})
app.listen(4000,()=>{
    console.log("Listening on port 4000")
})