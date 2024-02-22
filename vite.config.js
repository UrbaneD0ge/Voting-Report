import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	interopDefault: true,
	// specify node version 20
	node: {
		version: '20'
	}
});
