import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { fetchLiveCatalogFromApis } from '$lib/server/live-catalog-api';

export const GET: RequestHandler = async ({ url }) => {
	const forceRefresh = url.searchParams.get('refresh') === 'true';
	const catalog = await fetchLiveCatalogFromApis(forceRefresh);
	return json(catalog);
};
