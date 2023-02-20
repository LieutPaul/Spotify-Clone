import React from 'react'
import useAuth from '../hooks/useAuth'
export default function Dashboard({code}) {
    const {accessToken,refreshToken,expiresIn} = useAuth(code);
    return (
        <>
            <div>
                Access Token - {accessToken}
            </div>
            <div>
                Refresh Token - {refreshToken}
            </div>
            <div>
                Expires In - {expiresIn}
            </div>
        </>
    );
}
