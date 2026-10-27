export type MediaType = 'movie' | 'series' | 'oneshot' | 'special';
export type CanonScope = 'core_studios' | 'expanded_universe' | 'non_marvel_studios';
export type CreditSceneType = 'mid_credit' | 'post_credit';
export type CreditImportance = 'must_watch' | 'tease' | 'joke';
export type DependencyPriority = 'essential' | 'recommended' | 'bonus';
export type DependencyWatchScope = 'full' | 'credits_only' | 'key_episodes';
export type WatchStatus = 'unwatched' | 'watching' | 'watched' | 'skipped';

export interface CreditScene {
	id: string;
	sceneType: CreditSceneType;
	importance: CreditImportance;
	spoilerFreeHint: string;
	spoilerDescription: string;
}

export interface MediaDependency {
	targetMediaId: string; // e.g. 'mcu-avengers-doomsday'
	requiredMediaId: string; // e.g. 'mcu-loki-s2'
	priority: DependencyPriority;
	watchScope: DependencyWatchScope; // 'full' | 'credits_only' | 'key_episodes'
	effectiveMinutes?: number; // e.g. 3 mins if only the credit scene is needed
	scopeHint?: string; // e.g. 'Nur die Mid-Credit-Scene (2 Min.) ist für Doomsday wichtig – kein ganzer Rewatch nötig!'
	reason: string;
}

export interface MediaItem {
	id: string;
	franchiseId: string;
	tmdbId: number;
	mediaType: MediaType;
	title: string;
	releaseDate: string;
	inUniverseYear: string;
	timelineAxisYear: string; // Compact year/era label displayed directly on the timeline axis
	runtimeMinutes: number;
	episodeCount?: number;
	chronologicalOrder: number;
	releaseOrder: number;
	phaseOrEra: string;
	synopsis: string;
	posterGradient: string;
	posterUrl?: string; // Live fetched cover image URL from TMDB / Wikipedia / TVMaze API
	apiSource?: string; // e.g. 'Wikidata + Wikipedia/TVMaze Live API' or 'TMDB Live API'
	canonScope?: CanonScope; // 'core_studios' | 'expanded_universe' | 'non_marvel_studios'
	streamingProvider: string;
	isUpcoming: boolean;
	isEventMilestone: boolean;
	creditScenes: CreditScene[];
}

export interface Franchise {
	id: string;
	name: string;
	shortName: string;
	tagline: string;
	accentColor: string;
	badgeBg: string;
	lastSyncedAt: string;
	autoSyncSource: string;
}

export interface UserItemProgress {
	status: WatchStatus;
	watchedEpisodes: number;
	watchedCredits: boolean;
	rating?: number;
}

export interface FriendProfile {
	id: string;
	name: string;
	avatar: string;
	watchedIds: string[];
}
