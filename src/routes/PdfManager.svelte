<script>
	import { onMount } from 'svelte';
	let pdfFile;
	let pdfFiles = [];

	function handleFileChange(event) {
		pdfFile = event.target.files[0];
	}

	async function uploadPdf() {
		const formData = new FormData();
		formData.append('file', pdfFile);

		const response = await fetch('/api/upload-pdf', {
			method: 'POST',
			body: formData
		});

		if (response.ok) {
			alert('PDF uploaded successfully');
			await fetchPdfFiles();
		} else {
			alert('Failed to upload PDF');
		}
	}

	async function removePdf(fileName) {
		const response = await fetch('/api/remove-pdf', {
			method: 'DELETE',
			body: JSON.stringify({ fileName })
		});

		if (response.ok) {
			alert('PDF removed successfully');
			await fetchPdfFiles();
		} else {
			alert('Failed to remove PDF');
		}
	}

	async function fetchPdfFiles() {
		const response = await fetch('/api/list-pdfs');
		if (response.ok) {
			pdfFiles = await response.json();
		} else {
			alert('Failed to fetch PDF files');
		}
	}

	onMount(fetchPdfFiles);
</script>

<input type="file" accept="application/pdf" on:change={handleFileChange} />
<button on:click={uploadPdf}>Upload PDF</button>

<ul>
	{#each pdfFiles as file}
		<li>
			{file}
			<button on:click={() => removePdf(file)}>Remove</button>
		</li>
	{/each}
</ul>
