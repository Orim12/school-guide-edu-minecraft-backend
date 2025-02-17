import { redirect } from '@sveltejs/kit';

export function requireAuth(session: string | null) {
	if (!session) {
		throw redirect(302, '/login');
	}
	const parsedSession = JSON.parse(decodeURIComponent(session));
	if (!parsedSession || !parsedSession.user) {
		throw redirect(302, '/login');
	}
}

export function checkCredentials(username: string, password: string): boolean {
	return username === import.meta.env.VITE_AUTH_USERNAME && password === import.meta.env.VITE_AUTH_PASSWORD;
}
