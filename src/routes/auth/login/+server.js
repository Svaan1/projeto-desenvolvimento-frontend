function generateRandomString (length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export function GET() {
    let scope = "streaming \
                 user-read-email \
                 user-read-private"

    let state = generateRandomString(16);

    let spotify_client_id = "f2eb57460af64725a6a4e25aa0265a2e"

    let auth_query_parameters = new URLSearchParams({
        response_type: "code",
        client_id: spotify_client_id,
        scope: scope,
        redirect_uri: "http://localhost:5173/auth/callback",
    });

    return new Response(null, {
        status: 302,
        headers: {
            Location: 'https://accounts.spotify.com/authorize?' + auth_query_parameters.toString()
        }
    });
}