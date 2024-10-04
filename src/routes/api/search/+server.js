import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    const urlSearchParams = url.searchParams;


    const uri = import.meta.env.VITE_BACKEND_URL + `search?q=${urlSearchParams.get('q')}&t=${urlSearchParams.get(('t'))}`;

    let request = await fetch(uri)
    let data = await request.json();

    console.log(uri);

    return new Response(JSON.stringify(data),
        { headers: { "content-type": "application/json" } }
    );
}