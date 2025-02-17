import type { Handle } from '@sveltejs/kit';
import { config } from 'dotenv';

config();

export const handle: Handle = async ({ event, resolve }) => {
	const cookieHeader = event.request.headers.get('cookie');
	const cookies = new Map(cookieHeader?.split('; ').map(c => {
		const [key, ...value] = c.split('=');
		return [key, value.join('=')];
	}));
	const sessionCookie = cookies.get('session');
	event.locals.session = sessionCookie ? JSON.parse(decodeURIComponent(sessionCookie)) : null;
	return resolve(event);
};
