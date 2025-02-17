<script>
	import { goto } from '$app/navigation';

	let username = '';
	let password = '';
	let error = '';

	async function handleLogin() {
		const response = await fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		});

		const result = await response.json();

		if (response.status === 200) {
			goto('/');
			console.log('Logged in successfully');
		} else {
			error = result.message || 'Invalid username or password';
		}
	}
</script>

<form on:submit|preventDefault={handleLogin}>
	<div>
		<label for="username">Username:</label>
		<input id="username" bind:value={username} required />
	</div>
	<div>
		<label for="password">Password:</label>
		<input id="password" type="password" bind:value={password} required />
	</div>
	<button type="submit">Login</button>
	{#if error}
		<p>{error}</p>
	{/if}
</form>
