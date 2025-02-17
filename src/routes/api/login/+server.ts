import { json } from '@sveltejs/kit';
import { checkCredentials } from '$lib/auth';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies }) => {
	let requestBody;
	try {
		requestBody = await request.json();
	} catch (e) {
		return json({ message: 'Invalid request body' }, { status: 400 });
	}

	const { username, password } = requestBody;

	if (checkCredentials(username, password)) {
		const session = { user: username };
		cookies.set('session', JSON.stringify(session), { path: '/', httpOnly: true, sameSite: 'strict' });
		return json({ message: 'Login successful' });
	} else {
		return json({ message: 'Invalid username or password' }, { status: 401 });
	}
};
