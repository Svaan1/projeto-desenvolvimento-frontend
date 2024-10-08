import { env } from '$env/dynamic/private';

/** @type {import('./$types').RequestHandler} */
export async function GET ({}) {
  let request = await fetch(env.BACKEND_URL + 'api/v1/quiz')
  let data = await request.json()

  return new Response(JSON.stringify(data), {
    headers: { 'content-type': 'application/json' }
  })
}
