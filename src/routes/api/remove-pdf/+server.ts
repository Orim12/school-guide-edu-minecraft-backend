import { Octokit } from '@octokit/rest';
import { config } from 'dotenv';
import type { RequestHandler } from '@sveltejs/kit';
import { requireAuth } from '$lib/auth';

config();

export const DELETE: RequestHandler = async ({ request }) => {
	const cookieHeader = request.headers.get('cookie');
	const cookies = new Map(cookieHeader?.split('; ').map(c => {
		const [key, ...value] = c.split('=');
		return [key, value.join('=')];
	}));
	const session = cookies.get('session');
	requireAuth(session);
	const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
	const { fileName } = await request.json();

	try {
		const { data: fileData } = await octokit.repos.getContent({
			owner: 'Orim12',
			repo: 'school-guide-edu-minecraft',
			path: 'static/assets/pdf/' + fileName
		});

		const sha = Array.isArray(fileData) ? fileData[0].sha : fileData.sha;

		await octokit.repos.deleteFile({
			owner: 'Orim12',
			repo: 'school-guide-edu-minecraft',
			path: 'static/assets/pdf/' + fileName,
			message: 'Remove PDF',
			sha: sha
		});

		return new Response(JSON.stringify({ message: 'PDF removed successfully' }), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ message: 'Failed to remove PDF', error }), { status: 500 });
	}
};
