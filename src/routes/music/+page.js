/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    let request = await fetch("/api/quiz");
    let data = await request.json();

    return {
        music: data
    };
}