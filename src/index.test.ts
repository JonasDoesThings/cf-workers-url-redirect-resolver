import { unstable_dev } from "wrangler";
import type { UnstableDevWorker } from "wrangler";
import { describe, expect, it, beforeAll, afterAll } from "vitest";

describe("Worker", () => {
	let worker: UnstableDevWorker;

	beforeAll(async () => {
		worker = await unstable_dev("src/index.ts", {
			experimental: { disableExperimentalWarning: true },
			vars: {
				ACCEPTED_API_TOKENS: "justtesting"
			}
		});
	});

	afterAll(async () => {
		await worker.stop();
	});

	it("should resolve the given amazon url", async () => {
		const requestHeaders = {
			'Authorization': 'Bearer justtesting'
		};

		const resp = await worker.fetch('?target=https://amzn.to', {headers: requestHeaders});
		if (resp) {
			expect(resp.status).toBe(200);

			const respData = await resp.json();
			expect((respData as {url: string}).url).toStrictEqual("https://www.amazon.com/");
		}
	});
});
