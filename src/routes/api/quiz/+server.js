import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({  }) {
    let request = await fetch("http://localhost:8080/api/v1/quiz");
    let data = await request.json();

    return new Response(JSON.stringify(data),
        { headers: { "content-type": "application/json" } }
    );
}