import { env } from '$env/dynamic/private';

/** @type {import('./$types').RequestHandler} */
export async function GET ({ url }) {
  const urlSearchParams = url.searchParams
  const uri = env.BACKEND_URL + `search?q=${urlSearchParams.get(
    'q'
  )}&t=${urlSearchParams.get('t')}`

  let request = await fetch(uri)
  let data = await request.json()

  return new Response(JSON.stringify(data), {
    headers: { 'content-type': 'application/json' }
  })
}
