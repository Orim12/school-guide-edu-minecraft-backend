import { Octokit } from '@octokit/rest';
import { config } from 'dotenv';
import type { RequestHandler } from '@sveltejs/kit';

config();

export const get: RequestHandler = async () => {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  try {
    const response = await octokit.repos.getContent({
      owner: 'Orim12',
      repo: 'school-guide-edu-minecraft',
      path: 'static/assets/pdf'
    });

    const files = Array.isArray(response.data) ? response.data.map((file: any) => file.name) : [];

    return new Response(JSON.stringify(files), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Failed to fetch PDF files', error }), { status: 500 });
  }
};
