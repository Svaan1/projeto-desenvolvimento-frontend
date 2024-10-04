

/** @type {import('./$types').RequestHandler} */
export async function GET({  }) {
    let request = await fetch(import.meta.env.VITE_BACKEND_URL + "quiz");
    let data = await request.json();

    return new Response(JSON.stringify(data),
        { headers: { "content-type": "application/json" } }
    );
}