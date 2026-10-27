import type { PageServerLoad } from './$types';
import { fetchLiveCatalogFromApis } from '$lib/server/live-catalog-api';

export const load: PageServerLoad = async () => {
	const catalog = await fetchLiveCatalogFromApis(false);
	return {
		catalog
	};
};
