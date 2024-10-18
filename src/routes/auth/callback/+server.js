import { redirect } from "@sveltejs/kit";

export async function GET({ url, cookies }) {
    let code = url.searchParams.get('code');
    let spotify_client_id = 'f2eb57460af64725a6a4e25aa0265a2e';
    let spotify_client_secret = '6eb04d83955c43b48ddde7bb6391accf';

    let params = new URLSearchParams();
    params.append('code', code);
    params.append('redirect_uri', 'http://localhost:5173/auth/callback');
    params.append('grant_type', 'authorization_code');

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: params.toString(),
        headers: {
            'Authorization': 'Basic ' + Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    const responseData = await response.json();

    cookies.set("userToken", JSON.stringify(responseData), {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24
    });

    throw redirect(302, '/');
}
