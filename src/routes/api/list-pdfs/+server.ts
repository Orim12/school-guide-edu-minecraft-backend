import { Octokit } from '@octokit/rest';
import { config } from 'dotenv';
import type { RequestHandler } from '@sveltejs/kit';
import { requireAuth } from '$lib/auth';
import Cookies from 'js-cookie';

config();

export const GET: RequestHandler = async ({ request }) => {
	const cookieHeader = request.headers.get('cookie');
	const cookies = new Map<string, string>(cookieHeader?.split('; ').map(c => c.split('=') as [string, string]).filter(c => c.length === 2));
	requireAuth(cookies.get('session'));
	const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

	try {
		const response = await octokit.repos.getContent({
			owner: 'Orim12',
			repo: 'school-guide-edu-minecraft',
			path: 'static/assets/pdf'
		});

		let files: string[] = [];
		if (Array.isArray(response.data)) {
			files = response.data
				.filter((file: { name: string }) => file.name.endsWith('.pdf'))
				.map((file: { name: string }) => file.name);
		}

		return new Response(JSON.stringify(files), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ message: 'Failed to fetch PDF files', error }), { status: 500 });
	}
};
