import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
	getQuotaStatus,
	getSimulatedNewDiscovery,
	HARD_MONTHLY_AI_CALL_LIMIT
} from '$lib/server/sync-engine';

async function runSync(franchiseId: string) {
	const currentQuota = getQuotaStatus();
	if (currentQuota.used >= HARD_MONTHLY_AI_CALL_LIMIT) {
		return json(
			{
				ok: false,
				error: `Hard-Quota-Stop erreicht (${HARD_MONTHLY_AI_CALL_LIMIT} Calls/Monat). 0,00 € Kostenschutz aktiv.`
			},
			{ status: 429 }
		);
	}

	const discovery = getSimulatedNewDiscovery(franchiseId);
	const updatedQuota = getQuotaStatus();

	return json({
		ok: true,
		syncedAt: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
		quota: updatedQuota,
		updates: discovery.syncLog,
		newItem: discovery.newItem,
		newDependency: discovery.newDependency
	});
}

// Wird vom automatischen wöchentlichen Cronjob (vercel.json / pg_cron) aufgerufen
export const GET: RequestHandler = async ({ url }) => {
	const franchiseId = url.searchParams.get('franchiseId') ?? 'mcu';
	return runSync(franchiseId);
};

// Wird vom "Auto-Sync starten"-Button im UI aufgerufen
export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json().catch(() => ({ franchiseId: 'mcu' }));
	return runSync(body.franchiseId ?? 'mcu');
};
