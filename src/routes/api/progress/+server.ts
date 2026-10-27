import { json } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import type { RequestHandler } from './$types';
import type { FriendProfile, UserItemProgress } from '$lib/types';

interface StoredProfileState {
	profileKey: string;
	displayName: string;
	progressMap: Record<string, UserItemProgress>;
	friendsList: FriendProfile[];
	updatedAt: string;
}

// Server-side fallback store (works immediately across PC & Phone on local Wi-Fi even before Supabase is connected)
const serverMemoryProfiles = new Map<string, StoredProfileState>();

function getServerSupabaseClient() {
	const url =
		publicEnv.PUBLIC_SUPABASE_URL ||
		env.SUPABASE_URL ||
		env.NEXT_PUBLIC_SUPABASE_URL ||
		'';
	const key =
		env.SUPABASE_SERVICE_ROLE_KEY ||
		publicEnv.PUBLIC_SUPABASE_ANON_KEY ||
		env.SUPABASE_ANON_KEY ||
		env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
		'';

	if (!url || !key || url.includes('dein-projekt') || key.includes('dein-anon-key')) {
		return null;
	}
	return createClient(url, key);
}

export const GET: RequestHandler = async ({ url }) => {
	const rawProfile = (url.searchParams.get('profile') || 'manu').trim().toLowerCase();
	const profileKey = rawProfile.replace(/[^a-z0-9_-]/g, '') || 'manu';
	const supabase = getServerSupabaseClient();

	if (supabase) {
		try {
			const { data, error } = await supabase
				.from('cloud_sync_profiles')
				.select('*')
				.eq('profile_key', profileKey)
				.maybeSingle();

			// Also load other profiles in Supabase so friends using their own profileKey appear automatically!
			const { data: otherProfiles } = await supabase
				.from('cloud_sync_profiles')
				.select('profile_key, display_name, progress_map')
				.neq('profile_key', profileKey)
				.limit(20);

			const cloudFriends: FriendProfile[] = (otherProfiles ?? []).map((p) => {
				const pMap = (p.progress_map ?? {}) as Record<string, UserItemProgress>;
				const watchedIds = Object.entries(pMap)
					.filter(([, val]) => val?.status === 'watched' || val?.watchedCredits)
					.map(([id]) => id);
				const name = p.display_name || p.profile_key;
				return {
					id: `cloud-${p.profile_key}`,
					name: `${name} ☁️`,
					avatar: name.slice(0, 1).toUpperCase(),
					watchedIds
				};
			});

			if (!error && data) {
				return json({
					ok: true,
					storageMode: 'supabase-cloud',
					profileKey,
					displayName: data.display_name || profileKey,
					progressMap: data.progress_map ?? {},
					friendsList: data.friends_list ?? [],
					cloudFriends,
					updatedAt: data.updated_at
				});
			}

			return json({
				ok: true,
				storageMode: 'supabase-cloud',
				profileKey,
				displayName: profileKey.charAt(0).toUpperCase() + profileKey.slice(1),
				progressMap: {},
				friendsList: [],
				cloudFriends,
				updatedAt: null
			});
		} catch {
			// Fall through to server memory if table isn't created yet
		}
	}

	const existing = serverMemoryProfiles.get(profileKey);
	const cloudFriends: FriendProfile[] = [];
	for (const [k, v] of serverMemoryProfiles.entries()) {
		if (k === profileKey) continue;
		const watchedIds = Object.entries(v.progressMap)
			.filter(([, val]) => val?.status === 'watched' || val?.watchedCredits)
			.map(([id]) => id);
		cloudFriends.push({
			id: `cloud-${k}`,
			name: `${v.displayName} ☁️`,
			avatar: v.displayName.slice(0, 1).toUpperCase(),
			watchedIds
		});
	}

	return json({
		ok: true,
		storageMode: supabase ? 'supabase-needs-table' : 'server-memory',
		profileKey,
		displayName: existing?.displayName || profileKey.charAt(0).toUpperCase() + profileKey.slice(1),
		progressMap: existing?.progressMap ?? {},
		friendsList: existing?.friendsList ?? [],
		cloudFriends,
		updatedAt: existing?.updatedAt ?? null
	});
};

export const POST: RequestHandler = async ({ request }) => {
	const body = (await request.json().catch(() => ({}))) as {
		profileKey?: string;
		displayName?: string;
		progressMap?: Record<string, UserItemProgress>;
		friendsList?: FriendProfile[];
	};

	const rawProfile = (body.profileKey || 'manu').trim().toLowerCase();
	const profileKey = rawProfile.replace(/[^a-z0-9_-]/g, '') || 'manu';
	const displayName =
		(body.displayName || profileKey.charAt(0).toUpperCase() + profileKey.slice(1)).trim();
	const progressMap = body.progressMap ?? {};
	const friendsList = (body.friendsList ?? []).filter((f) => !f.id.startsWith('cloud-'));
	const updatedAt = new Date().toISOString();

	// Always update server memory
	serverMemoryProfiles.set(profileKey, {
		profileKey,
		displayName,
		progressMap,
		friendsList,
		updatedAt
	});

	const supabase = getServerSupabaseClient();
	if (supabase) {
		try {
			const { error } = await supabase.from('cloud_sync_profiles').upsert(
				{
					profile_key: profileKey,
					display_name: displayName,
					progress_map: progressMap,
					friends_list: friendsList,
					updated_at: updatedAt
				},
				{ onConflict: 'profile_key' }
			);

			if (!error) {
				return json({
					ok: true,
					storageMode: 'supabase-cloud',
					profileKey,
					updatedAt
				});
			}
		} catch {
			// Fall through
		}
	}

	return json({
		ok: true,
		storageMode: supabase ? 'supabase-needs-table' : 'server-memory',
		profileKey,
		updatedAt
	});
};
