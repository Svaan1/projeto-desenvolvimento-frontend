import { env } from '$env/dynamic/private';

export async function GET({ url }) {

    let code = url.searchParams.get('code');

    let params = new URLSearchParams();

    params.append('code', code);
    params.append('redirect_uri', 'http://localhost:5173/auth/callback');
    params.append('grant_type', 'authorization_code');


    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: params.toString(),
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(env.SPOTIFY_CLIENT_ID + ':' + env.SPOTIFY_CLIENT_SECRET).toString('base64')),
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    });

    const responseData = await response.json();

    return new Response(JSON.stringify(responseData), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}