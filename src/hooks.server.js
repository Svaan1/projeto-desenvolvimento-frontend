const tokenId = "userToken"

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve}) {
	await authenticateUserIfTokenExists(event)

	const response = await resolve(event);
	return response;
}

async function authenticateUserIfTokenExists(event) {
	let userCookie = event.cookies.get(tokenId);

	if (userCookie) {
		let userData = JSON.parse(userCookie);

		try {
			let apiResponse = await fetch('https://api.spotify.com/v1/me', {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${userData["access_token"]}`,
					'Content-Type': 'application/json',
				}
			});

			if (apiResponse.ok) {
				let userInfo = await apiResponse.json();

				event.locals.userInfo = {
					name: userInfo["display_name"],
					images: userInfo["images"],
					product: userInfo["product"]
				}

				return
			}

			event.cookies.delete(tokenId, { path: "/" });

		} catch {

			event.cookies.delete(tokenId, { path: "/" });
		}
	}
}

