import { Octokit } from '@octokit/rest';
import { config } from 'dotenv';
import type { RequestHandler } from '@sveltejs/kit';

config();

export const post: RequestHandler = async ({ request }) => {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const formData = await request.formData();
  const file = formData.get('file') as File;
  const content = await file.arrayBuffer();
  const base64Content = Buffer.from(content).toString('base64');

  try {
    await octokit.repos.createOrUpdateFileContents({
      owner: 'Orim12',
      repo: 'school-guide-edu-minecraft',
      path: 'static/assets/pdf/' + file.name,
      message: 'Upload PDF',
      content: base64Content
    });

    return new Response(JSON.stringify({ message: 'PDF uploaded successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Failed to upload PDF', error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
