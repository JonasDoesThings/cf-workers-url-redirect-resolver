import {getRandom as getRandomUserAgent} from 'random-useragent';

export interface Env {
	ACCEPTED_API_TOKENS: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		const apiToken = request.headers.get("Authorization");
		const target = url.searchParams.get("target");

		if(!apiToken || !env.ACCEPTED_API_TOKENS || env.ACCEPTED_API_TOKENS.length < 1 || !env.ACCEPTED_API_TOKENS.split(" ").includes(apiToken.substring('Bearer '.length))) {
			return new Response("Not Authenticated", {
				status: 401,
			});
		}

		if(!target || target.trim().length < 3) {
			return new Response("Invalid Request", {
				status: 400,
			});
		}

		const response = await fetch(target, {
			method: 'GET',
			redirect: 'follow',
			headers: {
				'User-Agent': getRandomUserAgent(),
			},
		});

		return new Response(JSON.stringify({url: response.url}), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	},
};
