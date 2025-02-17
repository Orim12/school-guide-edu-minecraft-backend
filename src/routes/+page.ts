import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import Cookies from 'js-cookie';

export const load: PageLoad = async ({ fetch }) => {
	let sessionCookie = Cookies.get();
	console.log(sessionCookie);
	if (!sessionCookie) {
		throw redirect(302, '/login');
	}
	const session = JSON.parse(decodeURIComponent(sessionCookie as string));
	if (!session || !session.user) {
		throw redirect(302, '/login');
	}
	return {
		session
	};
};
