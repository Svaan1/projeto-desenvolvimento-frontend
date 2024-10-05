/** @type {import('./$types').RequestHandler} */
export async function GET ({}) {
  let request = await fetch('https://backendproject.fly.dev/api/v1/quiz')
  let data = await request.json()

  return new Response(JSON.stringify(data), {
    headers: { 'content-type': 'application/json' }
  })
}
