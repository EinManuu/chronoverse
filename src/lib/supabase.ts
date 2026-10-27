import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';
import type { UserItemProgress } from '$lib/types';

export const isSupabaseConfigured = Boolean(
	env.PUBLIC_SUPABASE_URL &&
		env.PUBLIC_SUPABASE_ANON_KEY &&
		!env.PUBLIC_SUPABASE_URL.includes('dein-projekt')
);

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
	if (!isSupabaseConfigured) return null;
	if (!supabaseInstance) {
		supabaseInstance = createClient(
			env.PUBLIC_SUPABASE_URL!,
			env.PUBLIC_SUPABASE_ANON_KEY!
		);
	}
	return supabaseInstance;
}

/**
 * Loads user progress from Supabase if configured & signed in, otherwise returns null
 * so the frontend falls back to localStorage.
 */
export async function fetchCloudProgress(
	userId: string
): Promise<Record<string, UserItemProgress> | null> {
	const client = getSupabaseClient();
	if (!client) return null;

	const { data, error } = await client
		.from('user_progress')
		.select('media_item_id, status, watched_episodes, watched_credits')
		.eq('user_id', userId);

	if (error || !data) return null;

	const map: Record<string, UserItemProgress> = {};
	for (const row of data) {
		map[row.media_item_id] = {
			status: row.status,
			watchedEpisodes: row.watched_episodes,
			watchedCredits: row.watched_credits
		};
	}
	return map;
}

/**
 * Upserts a single item's watch progress to Supabase if configured.
 */
export async function upsertCloudProgress(
	userId: string,
	mediaItemId: string,
	progress: UserItemProgress
): Promise<boolean> {
	const client = getSupabaseClient();
	if (!client) return false;

	const { error } = await client.from('user_progress').upsert(
		{
			user_id: userId,
			media_item_id: mediaItemId,
			status: progress.status,
			watched_episodes: progress.watchedEpisodes,
			watched_credits: progress.watchedCredits,
			updated_at: new Date().toISOString()
		},
		{ onConflict: 'user_id,media_item_id' }
	);

	return !error;
}
