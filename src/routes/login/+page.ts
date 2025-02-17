import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch('/api/login', { method: 'POST' });
	let data;

	try {
		data = await response.json();
	} catch (e) {
		data = null;
	}

	if (!data) {
		throw redirect(302, '/login');
	}

	return {
		props: {
			data
		}
	};
};
