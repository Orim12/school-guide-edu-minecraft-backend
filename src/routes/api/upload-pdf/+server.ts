import { Octokit } from '@octokit/rest';
import { config } from 'dotenv';
import type { RequestHandler } from '@sveltejs/kit';
import { requireAuth } from '$lib/auth';
import Cookies from 'js-cookie';

config();

export const POST: RequestHandler = async ({ request }) => {
  const cookieHeader = request.headers.get('cookie');
  const cookies = new Map(cookieHeader?.split('; ').map(c => {
    const [key, ...v] = c.split('=');
    return [key, v.join('=')];
  }));
  const session = cookies.get('session');
  requireAuth(session);
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const formData = await request.formData();
  const file = formData.get('file') as Blob;

  try {
    const arrayBuffer = await file.arrayBuffer();
    const base64Content = Buffer.from(arrayBuffer).toString('base64');

    await octokit.repos.createOrUpdateFileContents({
      owner: 'Orim12',
      repo: 'school-guide-edu-minecraft',
      path: 'static/assets/pdf/' + (file as any).name,
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
