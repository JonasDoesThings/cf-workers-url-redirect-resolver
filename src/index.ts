import {getRandom as getRandomUserAgent} from 'random-useragent';

export interface Env {
	ACCEPTED_API_TOKENS: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		const apiToken = request.headers.get("Authorization");
		let target = url.searchParams.get("target");

		if(!apiToken || !env.ACCEPTED_API_TOKENS || env.ACCEPTED_API_TOKENS.length < 1 || !env.ACCEPTED_API_TOKENS.split(" ").includes(apiToken.substring('Bearer '.length))) {
			return new Response("Not Authenticated", {
				status: 401,
			});
		}

		let cache = caches.default;
		const cachedResponse = await cache.match(request);

		if(cachedResponse) {
			return cachedResponse;
		}

		if(!target || target.trim().length < 3) {
			return new Response("Invalid Request", {
				status: 400,
			});
		}

		if(!target.startsWith("https://") && !target.startsWith("http://")) {
			target = `https://${target}`;
		}

		const response = await fetch(target, {
			method: 'GET',
			redirect: 'follow',
			headers: {
				'User-Agent': getRandomUserAgent(),
			},
		});

		const httpResponse = new Response(JSON.stringify({url: response.url}), {
			headers: {
				'Content-Type': 'application/json'
			}
		});

		await cache.put(request, httpResponse);
		return httpResponse;
	},
};
