<script lang="ts">
	import { onMount, untrack } from 'svelte';
	import type { PageData } from './$types';
	import type {
		DependencyPriority,
		Franchise,
		MediaDependency,
		MediaItem,
		UserItemProgress,
		WatchStatus
	} from '$lib/types';
	import {
		CheckCircle2,
		Clock,
		Film,
		Flame,
		Info,
		RefreshCw,
		ShieldCheck,
		Sparkles,
		Tv,
		Users,
		Eye,
		EyeOff,
		X,
		Calendar,
		Compass,
		Zap,
		Share2,
		Search,
		Star,
		UserPlus,
		Cloud,
		Check
	} from 'lucide-svelte';

	let { data }: { data: PageData } = $props();

	// ============================================================================
	// SVELTE 5 RUNES ($state, $derived, $effect) – LIVE API DATA (NO CLIENT SEEDING)
	// ============================================================================
	let franchisesList = $state<Franchise[]>(untrack(() => data.catalog.franchises));
	let allMediaItems = $state<MediaItem[]>(untrack(() => data.catalog.mediaItems));
	let allDependencies = $state<MediaDependency[]>(untrack(() => data.catalog.dependencies));
	let friendsList = $state(untrack(() => data.catalog.friends));
	let apiStats = $state(untrack(() => data.catalog.apiStats));
	let failedPosterIds = $state<Record<string, boolean>>({});
	let searchQuery = $state('');
	let shareCopied = $state(false);
	let newlySyncedItemId = $state<string | null>(null);
	let pendingImportedFriendIds = $state<string[] | null>(null);
	let importedFriendName = $state('');
	let selectedFranchiseId = $state<string>('mcu');
	let sortOrder = $state<'chronological' | 'release'>('chronological');
	let mediaTypeFilter = $state<'all' | 'movie' | 'series' | 'oneshot_special'>('all');
	let statusFilter = $state<'all' | 'unwatched' | 'watched'>('all');
	let phaseFilter = $state<string>('all');

	// Canon / Studio Scope Toggles (Core Studios vs. Expanded Marvel TV vs. Non-Marvel Studios ~1,395h)
	let includeCoreStudios = $state(true);
	let includeExpandedMarvel = $state(true);
	let includeNonMarvelStudios = $state(true);

	// Start with the complete timeline loaded ("Alle Titel"), with 1-click toggle to "Road to..."
	let roadToTargetId = $state<string | null>(null);
	let selectedFriendId = $state<string | null>(null);

	// User Progress Map synced across devices via /api/progress (Supabase) + localStorage fallback
	let progressMap = $state<Record<string, UserItemProgress>>({});

	// Cross-Platform Cloud Profile Sync State
	let activeProfileKey = $state('manu');
	let customProfileInput = $state('');
	let showProfileEditor = $state(false);
	let cloudStorageMode = $state<'supabase-cloud' | 'supabase-needs-table' | 'server-memory'>(
		'server-memory'
	);
	let isCloudSaving = $state(false);
	let lastCloudSyncAt = $state<string | null>(null);
	let cloudLoadedForProfile = $state(false);
	let cloudSaveTimer: ReturnType<typeof setTimeout> | null = null;

	// Native <dialog> modal state for Credit Scenes & Item Details
	let dialogEl = $state<HTMLDialogElement | null>(null);
	let activeModalItem = $state<MediaItem | null>(null);
	let revealedSpoilerIds = $state<Record<string, boolean>>({});
	let hoverRating = $state<number | null>(null);

	// Zero-Maintenance Sync Status
	let isSyncing = $state(false);
	let syncReport = $state<{
		syncedAt: string;
		used: number;
		limit: number;
		updates: string[];
	} | null>(null);

	let hydrated = $state(false);

	async function loadCloudProfile(profileKey: string) {
		cloudLoadedForProfile = false;
		const cleanKey = profileKey.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '') || 'manu';
		activeProfileKey = cleanKey;
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('chronoverse_active_profile', cleanKey);
		}

		// 1. Instant local cache for this profile
		let localProgress: Record<string, UserItemProgress> = {};
		if (typeof localStorage !== 'undefined') {
			const cached =
				localStorage.getItem(`chronoverse_progress_${cleanKey}`) ??
				(cleanKey === 'manu' ? localStorage.getItem('chronoverse_progress_v2') : null);
			if (cached) {
				try {
					localProgress = JSON.parse(cached);
					progressMap = localProgress;
				} catch {
					// ignore invalid JSON
				}
			} else {
				progressMap = {};
			}
		}

		// 2. Fetch cross-device state from /api/progress (Supabase Cloud / Server)
		try {
			const res = await fetch(`/api/progress?profile=${encodeURIComponent(cleanKey)}`);
			if (res.ok) {
				const cloud = await res.json();
				cloudStorageMode = cloud.storageMode ?? cloud.storage ?? 'server-memory';
				const cloudProgress = cloud.progressMap ?? {};
				const hasCloudEntries = Object.keys(cloudProgress).length > 0;
				const hasLocalEntries = Object.keys(localProgress).length > 0;

				if (hasCloudEntries) {
					progressMap = cloudProgress;
				} else if (hasLocalEntries) {
					// Migrate existing local progress up to the cloud profile automatically
					progressMap = localProgress;
					void pushProgressToCloud(cleanKey, localProgress);
				} else {
					progressMap = {};
				}

				// Merge any cloud profiles from other users into the co-watch friend list
				if (Array.isArray(cloud.cloudFriends) && cloud.cloudFriends.length > 0) {
					const byId = new Map(friendsList.map((f) => [f.id, f]));
					for (const cf of cloud.cloudFriends) {
						byId.set(cf.id, cf);
					}
					friendsList = Array.from(byId.values());
				}

				if (cloud.updatedAt) {
					lastCloudSyncAt = new Date(cloud.updatedAt).toLocaleTimeString('de-DE', {
						hour: '2-digit',
						minute: '2-digit'
					});
				}
			}
		} catch {
			// Offline fallback: keep localProgress
		} finally {
			cloudLoadedForProfile = true;
		}
	}

	async function pushProgressToCloud(
		profileKey: string,
		currentProgress: Record<string, UserItemProgress>
	) {
		isCloudSaving = true;
		try {
			const res = await fetch('/api/progress', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					profileKey,
					displayName: profileKey.charAt(0).toUpperCase() + profileKey.slice(1),
					progressMap: currentProgress,
					friendsList
				})
			});
			if (res.ok) {
				const result = await res.json();
				if (result.storageMode || result.storage) {
					cloudStorageMode = result.storageMode ?? result.storage;
				}
				lastCloudSyncAt = new Date().toLocaleTimeString('de-DE', {
					hour: '2-digit',
					minute: '2-digit'
				});
			}
		} catch {
			// Offline fallback: saved in localStorage
		} finally {
			isCloudSaving = false;
		}
	}

	function switchProfile(nextKey: string) {
		const cleaned = nextKey.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
		if (!cleaned) return;
		showProfileEditor = false;
		customProfileInput = '';
		void loadCloudProfile(cleaned);
	}

	onMount(() => {
		const savedProfile = localStorage.getItem('chronoverse_active_profile') || 'manu';
		const savedFriends = localStorage.getItem('chronoverse_friends_v1');
		if (savedFriends) {
			try {
				friendsList = JSON.parse(savedFriends);
			} catch {
				// ignore invalid JSON
			}
		}

		// Check if a friend shared their watch state via URL (?friend_watch=...)
		const params = new URLSearchParams(window.location.search);
		const encodedFriend = params.get('friend_watch');
		if (encodedFriend) {
			try {
				const parsed = JSON.parse(atob(encodedFriend));
				if (Array.isArray(parsed)) {
					pendingImportedFriendIds = parsed;
				}
			} catch {
				// ignore invalid param
			}
		}

		hydrated = true;
		void loadCloudProfile(savedProfile);

		// Mandatory fallback for browsers without native <dialog closedby="any"> support
		// (modern-web-guidance: light-dismiss-a-dialog)
		if (dialogEl && !('closedBy' in HTMLDialogElement.prototype)) {
			dialogEl.addEventListener('click', (event: MouseEvent) => {
				if (!dialogEl || event.target !== dialogEl) return;
				const rect = dialogEl.getBoundingClientRect();
				const isDialogContent =
					rect.top <= event.clientY &&
					event.clientY <= rect.top + rect.height &&
					rect.left <= event.clientX &&
					event.clientX <= rect.left + rect.width;
				if (isDialogContent) return;
				dialogEl.close();
			});
		}
	});

	$effect(() => {
		const serializedProgress = JSON.stringify(progressMap);
		const serializedFriends = JSON.stringify(friendsList);
		const currentProfile = activeProfileKey;

		if (hydrated && cloudLoadedForProfile) {
			localStorage.setItem(`chronoverse_progress_${currentProfile}`, serializedProgress);
			if (currentProfile === 'manu') {
				localStorage.setItem('chronoverse_progress_v2', serializedProgress);
			}
			localStorage.setItem('chronoverse_friends_v1', serializedFriends);

			if (cloudSaveTimer) clearTimeout(cloudSaveTimer);
			cloudSaveTimer = setTimeout(() => {
				void pushProgressToCloud(currentProfile, JSON.parse(serializedProgress));
			}, 350);
		}
	});

	function resetFranchiseProgress() {
		const nextMap = { ...progressMap };
		for (const item of franchiseItems) {
			delete nextMap[item.id];
		}
		progressMap = nextMap;
	}

	// ============================================================================
	// DERIVED DATA ($derived)
	// ============================================================================
	let currentFranchise = $derived(
		franchisesList.find((f) => f.id === selectedFranchiseId) ?? franchisesList[0]
	);

	let franchiseItems = $derived(
		allMediaItems.filter((item) => item.franchiseId === selectedFranchiseId)
	);

	// Breakdown of hours & counts per CanonScope (Core Studios vs Expanded vs Non-Marvel Studios)
	let scopeBreakdown = $derived.by(() => {
		let coreMins = 0,
			coreCount = 0;
		let expandedMins = 0,
			expandedCount = 0;
		let nonStudiosMins = 0,
			nonStudiosCount = 0;

		for (const item of franchiseItems) {
			const scope = item.canonScope ?? 'core_studios';
			const mins = item.isUpcoming ? 0 : item.runtimeMinutes || 0;
			if (scope === 'core_studios') {
				coreMins += mins;
				coreCount++;
			} else if (scope === 'expanded_universe') {
				expandedMins += mins;
				expandedCount++;
			} else {
				nonStudiosMins += mins;
				nonStudiosCount++;
			}
		}

		return {
			coreHours: Math.round(coreMins / 60),
			coreCount,
			expandedHours: Math.round(expandedMins / 60),
			expandedCount,
			nonStudiosHours: Math.floor(nonStudiosMins / 60),
			nonStudiosCount,
			allHours: Math.floor((coreMins + expandedMins + nonStudiosMins) / 60)
		};
	});

	function isCanonScopeEnabled(item: MediaItem): boolean {
		const scope = item.canonScope ?? 'core_studios';
		if (scope === 'core_studios') return includeCoreStudios;
		if (scope === 'expanded_universe') return includeExpandedMarvel;
		if (scope === 'non_marvel_studios') return includeNonMarvelStudios;
		return true;
	}

	let scopedFranchiseItems = $derived(
		franchiseItems.filter((item) => isCanonScopeEnabled(item))
	);

	// Distinct phases/eras for the currently enabled scopes
	let availablePhases = $derived.by(() => {
		const set = new Set<string>();
		for (const item of scopedFranchiseItems) {
			const basePhase = item.phaseOrEra.split(' (')[0];
			set.add(basePhase);
		}
		return Array.from(set);
	});

	// Milestones that can be selected in the "Road to..." dropdown
	let eventMilestones = $derived(
		franchiseItems.filter((item) => item.isEventMilestone && item.isUpcoming)
	);

	let activeMilestone = $derived(
		allMediaItems.find((item) => item.id === roadToTargetId) ?? null
	);

	// Map of requiredMediaId -> MediaDependency for the currently active "Road to..." target
	let dependencyMap = $derived.by(() => {
		const map = new Map<string, MediaDependency>();
		if (!roadToTargetId) return map;
		for (const dep of allDependencies) {
			if (dep.targetMediaId === roadToTargetId) {
				map.set(dep.requiredMediaId, dep);
			}
		}
		return map;
	});

	let selectedFriend = $derived(
		friendsList.find((f) => f.id === selectedFriendId) ?? null
	);

	// Helper: Checks if an item is fulfilled for the current Road-to mode
	// If watchScope === 'credits_only', having watchedCredits === true is enough!
	function isRequirementFulfilled(item: MediaItem): boolean {
		const prog = getItemProgress(item.id);
		const dep = dependencyMap.get(item.id);
		if (dep?.watchScope === 'credits_only') {
			return prog.watchedCredits || prog.status === 'watched';
		}
		return prog.status === 'watched';
	}

	let filteredAndSortedItems = $derived.by(() => {
		let list = [...scopedFranchiseItems];

		// 1. Road-to Filter
		if (roadToTargetId) {
			list = [...franchiseItems].filter(
				(item) => dependencyMap.has(item.id) || item.id === roadToTargetId
			);
		}

		// 1b. Phase / Era Filter
		if (phaseFilter !== 'all') {
			list = list.filter((i) => i.phaseOrEra.startsWith(phaseFilter));
		}

		// 2. Media Type Filter
		if (mediaTypeFilter === 'movie') {
			list = list.filter((i) => i.mediaType === 'movie');
		} else if (mediaTypeFilter === 'series') {
			list = list.filter((i) => i.mediaType === 'series');
		} else if (mediaTypeFilter === 'oneshot_special') {
			list = list.filter((i) => i.mediaType === 'oneshot' || i.mediaType === 'special');
		}

		// 3. Watch Status Filter
		if (statusFilter === 'watched') {
			list = list.filter((i) => isRequirementFulfilled(i));
		} else if (statusFilter === 'unwatched') {
			list = list.filter((i) => !isRequirementFulfilled(i));
		}

		// 4. Friend Co-Watch Filter
		if (selectedFriend) {
			list = list.filter((i) => {
				if (i.id === roadToTargetId) return true;
				const iWatched = isRequirementFulfilled(i);
				const friendWatched = selectedFriend.watchedIds.includes(i.id);
				return !iWatched || !friendWatched;
			});
		}

		// 5. Live Search Query Filter
		const q = searchQuery.trim().toLowerCase();
		if (q) {
			list = list.filter(
				(i) =>
					i.title.toLowerCase().includes(q) ||
					i.synopsis.toLowerCase().includes(q) ||
					i.phaseOrEra.toLowerCase().includes(q) ||
					i.inUniverseYear.toLowerCase().includes(q)
			);
		}

		// 6. Sort Order
		list.sort((a, b) =>
			sortOrder === 'chronological'
				? a.chronologicalOrder - b.chronologicalOrder
				: a.releaseOrder - b.releaseOrder
		);

		return list;
	});

	// Readiness Calculation for "Road to..." Banner (including Credit-Scene time-saver calculation!)
	let roadToStats = $derived.by(() => {
		if (!roadToTargetId) return null;
		const reqItems = franchiseItems.filter((i) => dependencyMap.has(i.id));
		const total = reqItems.length;
		if (total === 0) return null;

		let fulfilledCount = 0;
		let remainingMinutes = 0;
		let savedMinutesViaShortcuts = 0;
		let essentialOpen = 0;

		for (const item of reqItems) {
			const prog = getItemProgress(item.id);
			const dep = dependencyMap.get(item.id);
			const fulfilled = isRequirementFulfilled(item);

			if (dep?.watchScope === 'credits_only' || dep?.watchScope === 'key_episodes') {
				const eff = dep.effectiveMinutes ?? 5;
				savedMinutesViaShortcuts += Math.max(0, item.runtimeMinutes - eff);
			}

			if (fulfilled) {
				fulfilledCount++;
			} else {
				if (dep?.watchScope === 'credits_only' || dep?.watchScope === 'key_episodes') {
					remainingMinutes += dep.effectiveMinutes ?? 5;
				} else if (item.mediaType === 'series' && item.episodeCount && prog.watchedEpisodes > 0) {
					const ratioLeft = Math.max(
						0,
						(item.episodeCount - prog.watchedEpisodes) / item.episodeCount
					);
					remainingMinutes += Math.round(item.runtimeMinutes * ratioLeft);
				} else {
					remainingMinutes += item.runtimeMinutes;
				}
				if (dep?.priority === 'essential') {
					essentialOpen++;
				}
			}
		}

		const percent = Math.round((fulfilledCount / total) * 100);
		const hours = Math.floor(remainingMinutes / 60);
		const mins = remainingMinutes % 60;
		const savedHours = Math.floor(savedMinutesViaShortcuts / 60);
		const savedMins = savedMinutesViaShortcuts % 60;

		return {
			total,
			watchedCount: fulfilledCount,
			percent,
			hours,
			mins,
			essentialOpen,
			savedHours,
			savedMins
		};
	});

	// Overall Franchise Progress (including total, watched & remaining hours to complete the selected scopes!)
	let franchiseProgress = $derived.by(() => {
		const totalItems = scopedFranchiseItems.length;
		const upcomingCount = scopedFranchiseItems.filter((i) => i.isUpcoming).length;
		const released = scopedFranchiseItems.filter((i) => !i.isUpcoming);
		if (totalItems === 0) {
			return {
				watched: 0,
				total: 0,
				upcomingCount: 0,
				percent: 0,
				totalHours: 0,
				watchedHours: 0,
				remainingHours: 0,
				remainingMins: 0,
				remainingMovieHours: 0,
				remainingSeriesHours: 0,
				timePercent: 0
			};
		}

		let watched = 0;
		let totalMinutes = 0;
		let watchedMinutes = 0;
		let remainingMinutes = 0;
		let remainingMovieMinutes = 0;
		let remainingSeriesMinutes = 0;

		for (const item of released) {
			const prog = getItemProgress(item.id);
			const runtime = item.runtimeMinutes || 0;
			totalMinutes += runtime;

			if (prog.status === 'watched') {
				watched++;
				watchedMinutes += runtime;
			} else if (
				item.mediaType === 'series' &&
				item.episodeCount &&
				item.episodeCount > 0 &&
				prog.watchedEpisodes > 0
			) {
				const watchedRatio = Math.min(1, prog.watchedEpisodes / item.episodeCount);
				const doneMins = Math.round(runtime * watchedRatio);
				const leftMins = Math.max(0, runtime - doneMins);
				watchedMinutes += doneMins;
				remainingMinutes += leftMins;
				remainingSeriesMinutes += leftMins;
			} else {
				remainingMinutes += runtime;
				if (item.mediaType === 'series') {
					remainingSeriesMinutes += runtime;
				} else {
					remainingMovieMinutes += runtime;
				}
			}
		}

		return {
			watched,
			total: totalItems,
			upcomingCount,
			percent: Math.round((watched / totalItems) * 100),
			totalHours: Math.floor(totalMinutes / 60),
			watchedHours: Math.floor(watchedMinutes / 60),
			remainingHours: Math.floor(remainingMinutes / 60),
			remainingMins: remainingMinutes % 60,
			remainingMovieHours: Math.round(remainingMovieMinutes / 60),
			remainingSeriesHours: Math.round(remainingSeriesMinutes / 60),
			timePercent: totalMinutes > 0 ? Math.round((watchedMinutes / totalMinutes) * 100) : 0
		};
	});

	// ============================================================================
	// HELPER & ACTIONS
	// ============================================================================
	function getItemProgress(id: string): UserItemProgress {
		return (
			progressMap[id] ?? {
				status: 'unwatched',
				watchedEpisodes: 0,
				watchedCredits: false
			}
		);
	}

	function getAxisYearLabel(item: MediaItem): string {
		if (sortOrder === 'chronological') {
			return item.timelineAxisYear;
		}
		return item.releaseDate.slice(0, 4);
	}

	function selectFranchise(id: string) {
		selectedFranchiseId = id;
		phaseFilter = 'all';
		roadToTargetId = null;
	}

	function toggleWatchStatus(item: MediaItem) {
		const current = getItemProgress(item.id);
		const nextStatus: WatchStatus = current.status === 'watched' ? 'unwatched' : 'watched';
		progressMap[item.id] = {
			status: nextStatus,
			watchedEpisodes: nextStatus === 'watched' ? (item.episodeCount ?? 1) : 0,
			watchedCredits: nextStatus === 'watched' ? true : false
		};
	}

	function adjustEpisodes(item: MediaItem, delta: number) {
		const maxEp = item.episodeCount ?? 1;
		const current = getItemProgress(item.id);
		const nextEp = Math.max(0, Math.min(maxEp, current.watchedEpisodes + delta));
		const nextStatus: WatchStatus =
			nextEp === 0 ? 'unwatched' : nextEp >= maxEp ? 'watched' : 'watching';
		progressMap[item.id] = {
			...current,
			status: nextStatus,
			watchedEpisodes: nextEp
		};
	}

	function toggleCreditsWatched(item: MediaItem) {
		const current = getItemProgress(item.id);
		progressMap[item.id] = {
			...current,
			watchedCredits: !current.watchedCredits
		};
	}

	function setItemRating(item: MediaItem, rating: number) {
		const current = getItemProgress(item.id);
		progressMap[item.id] = {
			...current,
			rating: current.rating === rating ? undefined : rating
		};
	}

	function toggleWatchScopeShortcut(item: MediaItem) {
		if (!roadToTargetId) return;
		allDependencies = allDependencies.map((dep) => {
			if (dep.targetMediaId === roadToTargetId && dep.requiredMediaId === item.id) {
				const nextScope = dep.watchScope === 'credits_only' ? 'full' : 'credits_only';
				return {
					...dep,
					watchScope: nextScope,
					effectiveMinutes: nextScope === 'credits_only' ? 3 : undefined,
					scopeHint:
						nextScope === 'credits_only'
							? '⚡ Zeitspar-Tipp: Nur die Credit-Scene (3 Min.) ist für das Event nötig – kein ganzer Rewatch!'
							: undefined
				};
			}
			return dep;
		});
	}

	function saveImportedFriend() {
		if (!pendingImportedFriendIds) return;
		const cleanName = importedFriendName.trim() || 'Freund';
		const newFriendId = `friend-${Date.now()}`;
		friendsList = [
			...friendsList,
			{
				id: newFriendId,
				name: cleanName,
				avatar: cleanName.slice(0, 1).toUpperCase(),
				watchedIds: pendingImportedFriendIds
			}
		];
		selectedFriendId = newFriendId;
		pendingImportedFriendIds = null;
		importedFriendName = '';
		const cleanUrl = new URL(window.location.href);
		cleanUrl.searchParams.delete('friend_watch');
		window.history.replaceState({}, '', cleanUrl.toString());
	}

	function openItemModal(item: MediaItem) {
		activeModalItem = item;
		revealedSpoilerIds = {};
		dialogEl?.showModal();
	}

	function toggleSpoiler(sceneId: string) {
		revealedSpoilerIds[sceneId] = !revealedSpoilerIds[sceneId];
	}

	async function triggerAutoSync() {
		isSyncing = true;
		try {
			// 1. Refresh live API catalog (Wikidata SPARQL + Wikipedia PageImages + TVMaze)
			const catRes = await fetch('/api/catalog?refresh=true');
			if (catRes.ok) {
				const freshCatalog = await catRes.json();
				franchisesList = freshCatalog.franchises;
				allMediaItems = freshCatalog.mediaItems;
				apiStats = freshCatalog.apiStats;
			}

			// 2. Run Incremental AI / TMDB Discovery Sync
			const res = await fetch('/api/sync', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ franchiseId: selectedFranchiseId })
			});
			const syncData = await res.json();
			if (syncData.ok) {
				if (syncData.newItem && !allMediaItems.some((m) => m.id === syncData.newItem.id)) {
					allMediaItems = [...allMediaItems, syncData.newItem];
					newlySyncedItemId = syncData.newItem.id;
				}
				if (
					syncData.newDependency &&
					!allDependencies.some(
						(d) =>
							d.targetMediaId === syncData.newDependency.targetMediaId &&
							d.requiredMediaId === syncData.newDependency.requiredMediaId
					)
				) {
					allDependencies = [...allDependencies, syncData.newDependency];
				}
				syncReport = {
					syncedAt: syncData.syncedAt,
					used: syncData.quota.used,
					limit: syncData.quota.limit,
					updates: [
						`Live-API-Katalog aktualisiert: ${apiStats.totalLiveItems} Titel & ${apiStats.postersResolved} offizielle Cover-Poster geladen (${apiStats.durationMs} ms).`,
						...syncData.updates
					]
				};
			}
		} finally {
			isSyncing = false;
		}
	}

	async function copyShareLinkForFriends() {
		const watchedIds = Object.entries(progressMap)
			.filter(([, p]) => p.status === 'watched' || p.watchedCredits)
			.map(([id]) => id);
		const url = new URL(window.location.href);
		url.searchParams.set('friend_watch', btoa(JSON.stringify(watchedIds)));
		await navigator.clipboard.writeText(url.toString());
		shareCopied = true;
		setTimeout(() => (shareCopied = false), 3000);
	}

	function formatRuntime(mins: number): string {
		const h = Math.floor(mins / 60);
		const m = mins % 60;
		return h > 0 ? `${h} Std. ${m} Min.` : `${m} Min.`;
	}

	function getMediaTypeBadge(type: MediaItem['mediaType']) {
		switch (type) {
			case 'movie':
				return { label: 'Kino-Film', classes: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30' };
			case 'series':
				return { label: 'Serie', classes: 'bg-purple-500/15 text-purple-300 border-purple-500/30' };
			case 'oneshot':
				return { label: 'One-Shot Kurzfilm', classes: 'bg-amber-500/15 text-amber-300 border-amber-500/30' };
			case 'special':
				return { label: 'Special Presentation', classes: 'bg-teal-500/15 text-teal-300 border-teal-500/30' };
		}
	}

	function getPriorityBadge(priority: DependencyPriority) {
		switch (priority) {
			case 'essential':
				return {
					label: '🔴 Pflichtprogramm',
					classes: 'bg-red-500/20 text-red-200 border-red-500/50 shadow-sm shadow-red-950/50'
				};
			case 'recommended':
				return {
					label: '🟡 Empfohlen für Kontext',
					classes: 'bg-amber-500/20 text-amber-200 border-amber-500/40'
				};
			case 'bonus':
				return {
					label: '🔵 Bonus-Hintergrund',
					classes: 'bg-sky-500/20 text-sky-200 border-sky-500/40'
				};
		}
	}
</script>

<div class="min-h-dvh bg-[#090b10] text-slate-100 pb-24 overflow-x-hidden">
	<!-- Top Header / Navigation (Mobile-First + Cross-Device Cloud Sync Profile) -->
	<header class="sticky top-0 z-30 border-b border-slate-800/80 bg-[#090b10]/95 backdrop-blur-md">
		<div class="mx-auto max-w-6xl px-3 sm:px-4 py-2.5 sm:py-3.5 space-y-2.5 md:space-y-0 md:flex md:flex-wrap md:items-center md:justify-between md:gap-4">
			<!-- Row 1 on Mobile: Brand + Cloud Sync Profile + Quick Actions -->
			<div class="flex items-center justify-between gap-2">
				<div class="flex items-center gap-2.5 min-w-0">
					<div class="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-amber-600 shadow-lg shadow-red-900/30">
						<Film class="h-4 w-4 sm:h-5 sm:w-5 text-white" />
					</div>
					<div class="min-w-0">
						<div class="flex items-center gap-1.5 sm:gap-2">
							<h1 class="text-base sm:text-lg font-bold tracking-tight text-white truncate">ChronoVerse</h1>
							<span class="hidden sm:inline-flex rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
								Cloud-Sync PWA
							</span>
						</div>
						<p class="hidden sm:block text-xs text-slate-400 truncate">
							Plattformübergreifende Timeline, Credit-Scene-Guide & „Road to…“-Filter
						</p>
					</div>
				</div>

				<!-- Mobile Actions (shown right next to logo on <md) -->
				<div class="flex md:hidden items-center gap-1.5">
					<button
						type="button"
						onclick={() => (showProfileEditor = !showProfileEditor)}
						class="inline-flex items-center gap-1 rounded-xl border px-2.5 py-1.5 text-[11px] font-semibold transition cursor-pointer {cloudStorageMode ===
						'supabase-cloud'
							? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-200'
							: 'border-sky-500/40 bg-sky-950/30 text-sky-200'}"
						title="Plattformübergreifendes Cloud-Profil wechseln (Handy ↔ PC)"
					>
						<Cloud class="h-3.5 w-3.5 {isCloudSaving ? 'animate-pulse text-amber-300' : 'text-sky-400'}" />
						<span>{activeProfileKey}</span>
					</button>

					<button
						type="button"
						onclick={copyShareLinkForFriends}
						class="inline-flex items-center gap-1 rounded-xl border border-slate-700/80 bg-slate-900/80 px-2.5 py-1.5 text-[11px] font-medium text-slate-200 cursor-pointer"
						title="Stand per Link teilen"
					>
						<Share2 class="h-3.5 w-3.5 text-sky-400" />
						<span>{shareCopied ? '✓' : 'Teilen'}</span>
					</button>

					<button
						type="button"
						onclick={triggerAutoSync}
						disabled={isSyncing}
						class="inline-flex items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-1.5 text-emerald-200 disabled:opacity-50 cursor-pointer"
						aria-label="Auto-Sync starten"
					>
						<RefreshCw class="h-3.5 w-3.5 text-emerald-400 {isSyncing ? 'animate-spin' : ''}" />
					</button>
				</div>
			</div>

			<!-- Row 2 on Mobile / Center on Desktop: Franchise Switcher Tabs (Full-width 3-col grid on mobile) -->
			<div class="grid grid-cols-3 md:flex items-center gap-1 rounded-xl bg-slate-900/90 p-1 border border-slate-800 w-full md:w-auto">
				{#each franchisesList as franchise (franchise.id)}
					<button
						type="button"
						onclick={() => selectFranchise(franchise.id)}
						class="rounded-lg px-2.5 sm:px-3.5 py-1.5 text-xs font-semibold transition-all text-center truncate cursor-pointer {selectedFranchiseId ===
						franchise.id
							? 'bg-slate-800 text-white shadow-sm border border-slate-700'
							: 'text-slate-400 hover:text-slate-200'}"
					>
						{franchise.shortName}
					</button>
				{/each}
			</div>

			<!-- Desktop Cloud Profile & Sync Buttons -->
			<div class="hidden md:flex items-center gap-2">
				<button
					type="button"
					onclick={() => (showProfileEditor = !showProfileEditor)}
					class="inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition cursor-pointer {cloudStorageMode ===
					'supabase-cloud'
						? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-200 hover:bg-emerald-900/40'
						: 'border-sky-500/40 bg-sky-950/30 text-sky-200 hover:bg-sky-900/40'}"
					title="Plattformübergreifendes Cloud-Profil für PC & Smartphone wechseln"
				>
					<Cloud class="h-3.5 w-3.5 {isCloudSaving ? 'animate-bounce text-amber-300' : 'text-sky-400'}" />
					<span>Profil: <strong>{activeProfileKey}</strong></span>
					<span class="rounded bg-black/30 px-1.5 py-0.5 text-[10px] text-slate-300">
						{isCloudSaving
							? 'speichert…'
							: cloudStorageMode === 'supabase-cloud'
								? 'Supabase ☁️'
								: 'Cloud-Sync ☁️'}
					</span>
				</button>

				<button
					type="button"
					onclick={copyShareLinkForFriends}
					class="inline-flex items-center gap-1.5 rounded-xl border border-slate-700/80 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-800 hover:border-slate-600 transition cursor-pointer"
					title="Teile deinen aktuellen Stand per Link mit Freunden"
				>
					<Share2 class="h-3.5 w-3.5 text-sky-400" />
					<span>{shareCopied ? 'Link kopiert! ✓' : 'Stand teilen'}</span>
				</button>

				<button
					type="button"
					onclick={triggerAutoSync}
					disabled={isSyncing}
					class="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/30 px-3 py-1.5 text-xs font-semibold text-emerald-200 hover:bg-emerald-900/40 transition cursor-pointer disabled:opacity-50"
					title="Prüft TMDB-Listen, Credit-Scene-Keywords & Gemini Grounding (0,00 € Quota-Schutz)"
				>
					<RefreshCw class="h-3.5 w-3.5 text-emerald-400 {isSyncing ? 'animate-spin' : ''}" />
					<span>{isSyncing ? 'Synchronisiere...' : 'Auto-Sync'}</span>
				</button>
			</div>
		</div>

		<!-- Expandable Cross-Device Cloud Profile Switcher Bar -->
		{#if showProfileEditor}
			<div class="border-t border-slate-800/90 bg-slate-950/95 px-3 sm:px-4 py-3">
				<div class="mx-auto max-w-6xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
					<div class="space-y-0.5">
						<div class="flex items-center gap-2 text-xs font-bold text-sky-300">
							<Cloud class="h-4 w-4 text-sky-400" />
							<span>Plattformübergreifendes Cloud-Profil (PC ↔ Smartphone)</span>
							{#if lastCloudSyncAt}
								<span class="text-[11px] font-normal text-emerald-400">
									• Zuletzt synchronisiert um {lastCloudSyncAt} Uhr
								</span>
							{/if}
						</div>
						<p class="text-[11px] text-slate-400">
							Gib auf dem Handy und am PC denselben Profil-Namen ein (z.B. <code class="text-slate-200">manu</code>), um deinen Fortschritt und deine Bewertungen automatisch über Supabase / Cloud abzugleichen – ganz ohne Passwort-Zwang.
						</p>
					</div>

					<div class="flex flex-wrap items-center gap-1.5">
						{#each ['manu', 'max', 'sarah'] as preset}
							<button
								type="button"
								onclick={() => switchProfile(preset)}
								class="rounded-lg border px-2.5 py-1 text-xs font-semibold transition cursor-pointer {activeProfileKey ===
								preset
									? 'border-sky-400 bg-sky-500/20 text-sky-200'
									: 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'}"
							>
								{preset}
							</button>
						{/each}

						<form
							class="flex items-center gap-1.5"
							onsubmit={(e) => {
								e.preventDefault();
								if (customProfileInput.trim()) switchProfile(customProfileInput);
							}}
						>
							<input
								type="text"
								bind:value={customProfileInput}
								placeholder="Eigenes Profil..."
								class="w-32 sm:w-36 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
							/>
							<button
								type="submit"
								class="inline-flex items-center gap-1 rounded-lg bg-sky-500 px-2.5 py-1 text-xs font-bold text-slate-950 hover:bg-sky-400 cursor-pointer"
							>
								<Check class="h-3.5 w-3.5" />
								<span>Wechseln</span>
							</button>
						</form>
					</div>
				</div>
			</div>
		{/if}
	</header>

	<main class="mx-auto max-w-6xl px-3 sm:px-4 pt-4 sm:pt-6 space-y-4 sm:space-y-6">
		<!-- Imported Friend Share Link Banner -->
		{#if pendingImportedFriendIds}
			<div class="rounded-2xl border border-sky-500/40 bg-sky-950/30 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div class="space-y-1">
					<div class="flex items-center gap-2 text-xs font-bold text-sky-300">
						<UserPlus class="h-4 w-4" />
						<span>Geteilter Watch-Stand erkannt ({pendingImportedFriendIds.length} gesehene Titel)!</span>
					</div>
					<p class="text-xs text-slate-300">
						Gib den Namen deines Freundes ein, um euren Stand direkt für den nächsten Filmabend abzugleichen:
					</p>
				</div>
				<div class="flex items-center gap-2">
					<input
						type="text"
						bind:value={importedFriendName}
						placeholder="Name (z.B. Lukas)"
						class="rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
					/>
					<button
						type="button"
						onclick={saveImportedFriend}
						class="rounded-xl bg-sky-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:bg-sky-400 transition cursor-pointer"
					>
						Als Freund speichern
					</button>
				</div>
			</div>
		{/if}

		<!-- Zero-Maintenance Sync Report Toast (if triggered) -->
		{#if syncReport}
			<div class="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div class="space-y-1">
					<div class="flex items-center gap-2 text-xs font-semibold text-emerald-300">
						<ShieldCheck class="h-4 w-4" />
						<span>Zero-Maintenance Sync erfolgreich ({syncReport.syncedAt} Uhr)</span>
						<span class="rounded-md bg-emerald-500/20 px-2 py-0.5 text-[11px]">
							Monats-Kontingent: {syncReport.used} / {syncReport.limit} Calls (0,00 € Garantie)
						</span>
					</div>
					<ul class="text-xs text-slate-300 space-y-0.5 list-disc list-inside">
						{#each syncReport.updates as line}
							<li>{line}</li>
						{/each}
					</ul>
				</div>
				<button
					type="button"
					onclick={() => (syncReport = null)}
					class="self-start sm:self-center text-xs text-slate-400 hover:text-white cursor-pointer"
				>
					Ausblenden
				</button>
			</div>
		{/if}

		<!-- Franchise Hero & Overall Progress -->
		<section class="rounded-2xl border border-slate-800/90 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950 p-4 sm:p-6">
			<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div class="space-y-1.5">
					<div class="flex flex-wrap items-center gap-2">
						<span class="rounded-full border px-2.5 py-0.5 text-xs font-semibold {currentFranchise.badgeBg}">
							{currentFranchise.shortName}
						</span>
						<span class="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300 flex items-center gap-1">
							<ShieldCheck class="h-3.5 w-3.5 text-emerald-400 shrink-0" />
							<span>Live API: {apiStats.totalLiveItems} Titel • {apiStats.postersResolved} Cover ({apiStats.durationMs} ms)</span>
						</span>
						<span class="hidden sm:flex text-xs text-slate-400 items-center gap-1">
							<Sparkles class="h-3.5 w-3.5 text-amber-400" />
							Quelle: {currentFranchise.autoSyncSource}
						</span>
					</div>
					<h2 class="hero-title-clamp font-bold text-white">{currentFranchise.name}</h2>
					<p class="text-xs sm:text-sm text-slate-400">{currentFranchise.tagline}</p>
				</div>

				<!-- Overall Franchise Progress & Remaining Universe Watchtime Box -->
				<div class="w-full md:w-auto md:min-w-[320px] rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 space-y-2">
					<div class="flex items-center justify-between text-xs">
						<span class="text-slate-400 font-medium">Universums-Fortschritt</span>
						<span class="font-bold text-white">
							{franchiseProgress.watched} / {franchiseProgress.total} Titel ({franchiseProgress.percent}%)
						</span>
					</div>
					<div class="h-2 w-full overflow-hidden rounded-full bg-slate-800">
						<div
							class="h-full rounded-full bg-gradient-to-r from-red-500 to-amber-500 transition-all duration-500"
							style="width: {franchiseProgress.percent}%"
						></div>
					</div>
					<div class="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[11px]">
						<span class="text-slate-400 flex items-center gap-1">
							<Clock class="h-3 w-3 text-amber-400" />
							<span>Noch offen bis 100%:</span>
						</span>
						<span class="font-bold text-amber-300">
							{#if franchiseProgress.remainingHours === 0 && franchiseProgress.remainingMins === 0}
								Komplett gesehen! 🎉
							{:else}
								{franchiseProgress.remainingHours} Std. {franchiseProgress.remainingMins} Min.
							{/if}
						</span>
					</div>
					<div class="flex flex-wrap items-center justify-between gap-1 text-[10px] text-slate-400">
						<span>Bereits geschaut: {franchiseProgress.watchedHours} / {franchiseProgress.totalHours} Std. ({franchiseProgress.timePercent}%)</span>
						{#if franchiseProgress.watchedHours > 0 || franchiseProgress.watched > 0}
							<button
								type="button"
								onclick={resetFranchiseProgress}
								class="text-rose-400 hover:text-rose-300 underline cursor-pointer"
							>
								Auf 0 zurücksetzen
							</button>
						{:else}
							<span>🎬 {franchiseProgress.remainingMovieHours}h • 📺 {franchiseProgress.remainingSeriesHours}h offen</span>
						{/if}
					</div>
				</div>
			</div>
		</section>

		<!-- ====================================================================== -->
		<!-- "ROAD TO [UPCOMING MOVIE]" PREP-FILTER (Dein Doomsday-Feature!)         -->
		<!-- ====================================================================== -->
		<section class="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/25 via-slate-900/90 to-emerald-950/25 p-5 shadow-lg shadow-black/40">
			<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
				<div class="space-y-1.5">
					<div class="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider">
						<Flame class="h-4 w-4 text-amber-400" />
						<span>Event-Vorbereitungs-Modus („Road to…“-Filter)</span>
					</div>
					<h3 class="text-lg font-bold text-white">
						Welche Filme & Credit-Scenes brauche ich wirklich für das nächste Event?
					</h3>
					<p class="text-xs text-slate-300 max-w-2xl">
						Filtere die Timeline auf die relevanten Titel herunter – inklusive <strong class="text-cyan-300">⚡ Credit-Scene-Shortcuts</strong>, wenn du für ein Event nicht den ganzen Film schauen musst!
					</p>
				</div>

				<!-- Milestone Selector Buttons -->
				<div class="flex flex-wrap items-center gap-2">
					<button
						type="button"
						onclick={() => (roadToTargetId = null)}
						class="rounded-xl px-3.5 py-2 text-xs font-semibold border transition cursor-pointer {roadToTargetId ===
						null
							? 'bg-slate-100 text-slate-950 border-white shadow'
							: 'bg-slate-900/90 text-slate-300 border-slate-700 hover:border-slate-500'}"
					>
						Alle {franchiseItems.length} Titel anzeigen
					</button>

					{#each eventMilestones as milestone (milestone.id)}
						<button
							type="button"
							onclick={() => (roadToTargetId = milestone.id)}
							class="rounded-xl px-3.5 py-2 text-xs font-semibold border transition flex items-center gap-1.5 cursor-pointer {roadToTargetId ===
							milestone.id
								? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-950/50'
								: 'bg-slate-900/90 text-amber-300 border-amber-500/40 hover:bg-amber-950/40'}"
						>
							<Compass class="h-3.5 w-3.5" />
							<span>Road to: {milestone.title}</span>
						</button>
					{/each}
				</div>
			</div>

			<!-- Active Readiness & Watchtime Dashboard (works for BOTH "Alle Titel" and "Road to...") -->
			<div class="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-4">
				{#if activeMilestone && roadToStats}
					<div class="rounded-xl bg-slate-950/70 border border-slate-800/90 p-3.5">
						<div class="flex items-center justify-between text-xs text-slate-400 mb-1">
							<span>Readiness für <strong class="text-white">{activeMilestone.title}</strong></span>
							<span class="text-amber-300 font-bold">{roadToStats.percent}% bereit</span>
						</div>
						<div class="h-2 w-full overflow-hidden rounded-full bg-slate-800 mb-2">
							<div
								class="h-full rounded-full bg-gradient-to-r from-emerald-500 to-amber-400 transition-all duration-500"
								style="width: {roadToStats.percent}%"
							></div>
						</div>
						<p class="text-[11px] text-slate-400">
							{roadToStats.watchedCount} von {roadToStats.total} Voraussetzungen erfüllt
						</p>
					</div>

					<div class="rounded-xl bg-slate-950/70 border border-slate-800/90 p-3.5 flex items-center gap-3">
						<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-amber-300">
							<Clock class="h-5 w-5" />
						</div>
						<div>
							<div class="text-xs text-slate-400">Effektive Rest-Watchtime (inkl. Shortcuts)</div>
							<div class="text-sm font-bold text-white">
								{#if roadToStats.hours === 0 && roadToStats.mins === 0}
									100 % vorbereitet – Kino kann kommen! 🎉
								{:else}
									Noch {roadToStats.hours} Std. {roadToStats.mins} Min. offen
								{/if}
							</div>
							{#if roadToStats.savedHours > 0 || roadToStats.savedMins > 0}
								<div class="text-[11px] text-cyan-300 font-medium">
									⚡ Du sparst {roadToStats.savedHours} Std. {roadToStats.savedMins} Min. durch „Nur Credit-Scene“-Tipps!
								</div>
							{:else}
								<div class="text-[11px] text-slate-400">
									Davon noch <strong class="text-red-300">{roadToStats.essentialOpen} Pflicht-Titel</strong> offen
								</div>
							{/if}
						</div>
					</div>
				{:else}
					<div class="rounded-xl bg-slate-950/70 border border-slate-800/90 p-3.5">
						<div class="flex items-center justify-between text-xs text-slate-400 mb-1">
							<span>Watchtime-Fortschritt (<strong class="text-white">Gesamtes Universum</strong>)</span>
							<span class="text-amber-300 font-bold">{franchiseProgress.timePercent}% der Zeit</span>
						</div>
						<div class="h-2 w-full overflow-hidden rounded-full bg-slate-800 mb-2">
							<div
								class="h-full rounded-full bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400 transition-all duration-500"
								style="width: {franchiseProgress.timePercent}%"
							></div>
						</div>
						<p class="text-[11px] text-slate-400">
							Bereits <strong class="text-slate-200">{franchiseProgress.watchedHours} Std.</strong> von insgesamt <strong class="text-slate-200">{franchiseProgress.totalHours} Std.</strong> geschaut
						</p>
					</div>

					<div class="rounded-xl bg-slate-950/70 border border-slate-800/90 p-3.5 flex items-center gap-3">
						<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-amber-300">
							<Clock class="h-5 w-5" />
						</div>
						<div>
							<div class="text-xs text-slate-400">Fehlende Zeit bis zur Universums-Vollendung</div>
							<div class="text-sm font-bold text-white">
								{#if franchiseProgress.remainingHours === 0 && franchiseProgress.remainingMins === 0}
									100 % des gesamten Universums gesehen! 🏆
								{:else}
									Noch {franchiseProgress.remainingHours} Std. {franchiseProgress.remainingMins} Min. offen
								{/if}
							</div>
							<div class="text-[11px] text-slate-400">
								Aufgeteilt in <strong class="text-indigo-300">🎬 {franchiseProgress.remainingMovieHours} Std. Filme</strong> & <strong class="text-purple-300">📺 {franchiseProgress.remainingSeriesHours} Std. Serien</strong>
							</div>
						</div>
					</div>
				{/if}

				<!-- Co-Watch Friend Comparison -->
				<div class="rounded-xl bg-slate-950/70 border border-slate-800/90 p-3.5 flex flex-col justify-between">
					<div class="flex items-center justify-between">
						<span class="text-xs text-slate-400 flex items-center gap-1.5">
							<Users class="h-3.5 w-3.5 text-sky-400" />
							<span>Filmabend-Abgleich mit Freunden</span>
						</span>
						{#if selectedFriendId}
							<button
								type="button"
								onclick={() => (selectedFriendId = null)}
								class="text-[11px] text-sky-400 hover:underline cursor-pointer"
							>
								Filter zurücksetzen
							</button>
						{/if}
					</div>
					<div class="flex flex-wrap items-center gap-2 mt-2">
						{#each friendsList as friend (friend.id)}
							<button
								type="button"
								onclick={() =>
									(selectedFriendId = selectedFriendId === friend.id ? null : friend.id)}
								class="flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition cursor-pointer {selectedFriendId ===
								friend.id
									? 'bg-sky-500/20 border-sky-400 text-sky-200'
									: 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'}"
							>
								<span class="flex h-4 w-4 items-center justify-center rounded-full bg-sky-600 text-[10px] font-bold text-white">
									{friend.avatar}
								</span>
								<span>Mit {friend.name}</span>
							</button>
						{/each}
					</div>
				</div>
			</div>
		</section>

		<!-- ====================================================================== -->
		<!-- FILTER & SORTING TOOLBAR                                               -->
		<!-- ====================================================================== -->
		<section class="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-3 sm:p-3.5">
			<!-- Sort Mode: Chronological vs Release Order -->
			<div class="grid grid-cols-2 sm:flex items-center gap-1 rounded-xl bg-slate-950 p-1 border border-slate-800 w-full sm:w-auto">
				<button
					type="button"
					onclick={() => (sortOrder = 'chronological')}
					class="flex items-center justify-center gap-1.5 rounded-lg px-2.5 sm:px-3 py-1.5 text-xs font-medium transition cursor-pointer {sortOrder ===
					'chronological'
						? 'bg-slate-800 text-white shadow-sm'
						: 'text-slate-400 hover:text-slate-200'}"
				>
					<Clock class="h-3.5 w-3.5 text-amber-400 shrink-0" />
					<span class="truncate">Chronologisch (Lore)</span>
				</button>
				<button
					type="button"
					onclick={() => (sortOrder = 'release')}
					class="flex items-center justify-center gap-1.5 rounded-lg px-2.5 sm:px-3 py-1.5 text-xs font-medium transition cursor-pointer {sortOrder ===
					'release'
						? 'bg-slate-800 text-white shadow-sm'
						: 'text-slate-400 hover:text-slate-200'}"
				>
					<Calendar class="h-3.5 w-3.5 text-sky-400 shrink-0" />
					<span class="truncate">Release (Kinostart)</span>
				</button>
			</div>

			<!-- Live Search Input -->
			<div class="relative w-full sm:flex-1 sm:min-w-[200px] sm:max-w-xs">
				<Search class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
				<input
					type="search"
					bind:value={searchQuery}
					placeholder="Suche nach Titel, Charakter, Jahr..."
					class="w-full rounded-xl border border-slate-800 bg-slate-950/90 pl-8 pr-3 py-2 sm:py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-slate-600 focus:outline-none"
				/>
			</div>

			<!-- Media Type Filter (Movies, Series, One-Shots/Specials) -->
			<div class="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
				<button
					type="button"
					onclick={() => (mediaTypeFilter = 'all')}
					class="rounded-lg border px-2.5 py-1.5 text-xs font-medium transition cursor-pointer {mediaTypeFilter ===
					'all'
						? 'bg-slate-800 border-slate-600 text-white'
						: 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'}"
				>
					Alle
				</button>
				<button
					type="button"
					onclick={() => (mediaTypeFilter = 'movie')}
					class="rounded-lg border px-2.5 py-1.5 text-xs font-medium transition cursor-pointer {mediaTypeFilter ===
					'movie'
						? 'bg-indigo-950/80 border-indigo-500/50 text-indigo-200'
						: 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'}"
				>
					🎬 Filme
				</button>
				<button
					type="button"
					onclick={() => (mediaTypeFilter = 'series')}
					class="rounded-lg border px-2.5 py-1.5 text-xs font-medium transition cursor-pointer {mediaTypeFilter ===
					'series'
						? 'bg-purple-950/80 border-purple-500/50 text-purple-200'
						: 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'}"
				>
					📺 Serien
				</button>
				<button
					type="button"
					onclick={() => (mediaTypeFilter = 'oneshot_special')}
					class="rounded-lg border px-2.5 py-1.5 text-xs font-medium transition cursor-pointer {mediaTypeFilter ===
					'oneshot_special'
						? 'bg-amber-950/80 border-amber-500/50 text-amber-200'
						: 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'}"
				>
					⚡ Specials
				</button>

				<span class="hidden sm:inline-block mx-1 h-4 w-px bg-slate-800"></span>

				<!-- Status Filter -->
				<button
					type="button"
					onclick={() =>
						(statusFilter = statusFilter === 'unwatched' ? 'all' : 'unwatched')}
					class="rounded-lg border px-2.5 py-1.5 text-xs font-medium transition cursor-pointer {statusFilter ===
					'unwatched'
						? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
						: 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'}"
				>
					Nur Offene
				</button>
			</div>

			<!-- Canon / Studio Scope Filter Row (Core Studios vs. Expanded Marvel vs. Non-Marvel Studios ~1,395h) -->
			<div class="w-full pt-2.5 border-t border-slate-800/70 flex flex-col sm:flex-row sm:flex-wrap sm:items-center justify-between gap-2">
				<div class="flex flex-wrap items-center gap-1.5 sm:gap-2">
					<span class="w-full sm:w-auto text-[11px] font-semibold text-slate-300 mr-1">
						{selectedFranchiseId === 'mcu' ? 'Marvel-Umfang (bis 1.395 Std.):' : 'Kanon-Umfang:'}
					</span>

					<button
						type="button"
						onclick={() => (includeCoreStudios = !includeCoreStudios)}
						class="inline-flex items-center gap-1.5 rounded-xl border px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold transition text-left cursor-pointer {includeCoreStudios
							? 'bg-red-500/20 border-red-500/50 text-red-200 shadow-sm'
							: 'bg-slate-950/60 border-slate-800 text-slate-500 hover:text-slate-300'}"
					>
						<span>{includeCoreStudios ? '✓' : '○'}</span>
						<span>
							{selectedFranchiseId === 'mcu'
								? `🏛️ Marvel Studios (${scopeBreakdown.coreCount} • ${scopeBreakdown.coreHours}h)`
								: selectedFranchiseId === 'dcu'
									? `🏛️ DCU & Batverse (${scopeBreakdown.coreCount} • ${scopeBreakdown.coreHours}h)`
									: `🏛️ Live-Action Core (${scopeBreakdown.coreCount} • ${scopeBreakdown.coreHours}h)`}
						</span>
					</button>

					<button
						type="button"
						onclick={() => (includeExpandedMarvel = !includeExpandedMarvel)}
						class="inline-flex items-center gap-1.5 rounded-xl border px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold transition text-left cursor-pointer {includeExpandedMarvel
							? 'bg-purple-500/20 border-purple-500/50 text-purple-200 shadow-sm'
							: 'bg-slate-950/60 border-slate-800 text-slate-500 hover:text-slate-300'}"
					>
						<span>{includeExpandedMarvel ? '✓' : '○'}</span>
						<span>
							{selectedFranchiseId === 'mcu'
								? `📺 Expanded Marvel TV (${scopeBreakdown.expandedCount} • ${scopeBreakdown.expandedHours}h)`
								: selectedFranchiseId === 'dcu'
									? `📺 Expanded DCEU (${scopeBreakdown.expandedCount} • ${scopeBreakdown.expandedHours}h)`
									: `📺 Canon Animation (${scopeBreakdown.expandedCount} • ${scopeBreakdown.expandedHours}h)`}
						</span>
					</button>

					{#if scopeBreakdown.nonStudiosCount > 0}
						<button
							type="button"
							onclick={() => (includeNonMarvelStudios = !includeNonMarvelStudios)}
							class="inline-flex items-center gap-1.5 rounded-xl border px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold transition text-left cursor-pointer {includeNonMarvelStudios
								? 'bg-amber-500/20 border-amber-500/50 text-amber-200 shadow-sm'
								: 'bg-slate-950/60 border-slate-800 text-slate-500 hover:text-slate-300'}"
						>
							<span>{includeNonMarvelStudios ? '✓' : '○'}</span>
							<span>
								{selectedFranchiseId === 'mcu'
									? `🌌 Non-Marvel Studios: X-Men, Sony & Co. (${scopeBreakdown.nonStudiosCount} • ${scopeBreakdown.nonStudiosHours}h)`
									: `🌌 Vintage & Legends (${scopeBreakdown.nonStudiosCount} • ${scopeBreakdown.nonStudiosHours}h)`}
							</span>
						</button>
					{/if}
				</div>

				<div class="flex items-center gap-1.5 text-[11px]">
					<button
						type="button"
						onclick={() => {
							includeCoreStudios = true;
							includeExpandedMarvel = false;
							includeNonMarvelStudios = false;
						}}
						class="rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1 text-slate-300 hover:text-white cursor-pointer"
					>
						Nur Core ({scopeBreakdown.coreHours}h)
					</button>
					<button
						type="button"
						onclick={() => {
							includeCoreStudios = true;
							includeExpandedMarvel = true;
							includeNonMarvelStudios = true;
						}}
						class="rounded-lg border border-amber-500/40 bg-amber-950/30 px-2.5 py-1 font-semibold text-amber-200 hover:bg-amber-900/40 cursor-pointer"
					>
						Komplettes Omniversum ({scopeBreakdown.allHours}h)
					</button>
				</div>
			</div>

			<!-- Phase / Era Quick Filter Row -->
			<div class="w-full pt-2 border-t border-slate-800/70 flex flex-wrap items-center gap-1.5">
				<span class="text-[11px] font-semibold text-slate-400 mr-1">Phase / Ära:</span>
				<button
					type="button"
					onclick={() => (phaseFilter = 'all')}
					class="rounded-lg px-2.5 py-1 text-[11px] font-medium transition cursor-pointer {phaseFilter ===
					'all'
						? 'bg-slate-700 text-white'
						: 'bg-slate-950/70 text-slate-400 hover:text-slate-200'}"
				>
					Alle ({scopedFranchiseItems.length})
				</button>
				{#each availablePhases as phase (phase)}
					<button
						type="button"
						onclick={() => (phaseFilter = phaseFilter === phase ? 'all' : phase)}
						class="rounded-lg px-2.5 py-1 text-[11px] font-medium transition cursor-pointer {phaseFilter ===
						phase
							? 'bg-amber-500/25 border border-amber-400/50 text-amber-200'
							: 'bg-slate-950/70 text-slate-400 hover:text-slate-200'}"
					>
						{phase}
					</button>
				{/each}
			</div>
		</section>

		<!-- ====================================================================== -->
		<!-- INTERACTIVE TIMELINE STREAM WITH PROMINENT YEAR MARKERS ON THE AXIS    -->
		<!-- ====================================================================== -->
		<section class="relative space-y-4 sm:space-y-5">
			<!-- Vertical Timeline Spine (directly behind the Year Badges column) -->
			<div
				class="pointer-events-none absolute top-4 bottom-4 left-[24px] sm:left-[48px] w-0.5 bg-gradient-to-b from-red-500/70 via-slate-700 to-amber-500/70"
			></div>

			{#each filteredAndSortedItems as item, index (item.id)}
				{@const progress = getItemProgress(item.id)}
				{@const depInfo = dependencyMap.get(item.id)}
				{@const typeBadge = getMediaTypeBadge(item.mediaType)}
				{@const isTargetMilestone = item.id === roadToTargetId}
				{@const isFulfilled = isRequirementFulfilled(item)}
				{@const mustWatchStingers = item.creditScenes.filter((c) => c.importance === 'must_watch').length}
				{@const axisYear = getAxisYearLabel(item)}
				{@const prevAxisYear = index > 0 ? getAxisYearLabel(filteredAndSortedItems[index - 1]) : null}
				{@const isNewYearOnAxis = axisYear !== prevAxisYear}

				<div class="relative flex items-start gap-2.5 sm:gap-5 {index >= 4 ? 'timeline-card-deferred' : ''}">
					<!-- LEFT AXIS COLUMN: Prominent Year Pill directly on the Timeline Spine (compact w-12 on mobile, w-24 on sm+) -->
					<div class="relative z-10 flex w-12 sm:w-24 shrink-0 flex-col items-center pt-3.5 sm:pt-4">
						<div
							class="flex flex-col items-center justify-center rounded-xl border px-1.5 sm:px-2.5 py-1 sm:py-1.5 text-center shadow-md transition-all {isTargetMilestone
								? 'border-amber-300 bg-amber-500 text-slate-950 shadow-amber-500/30 scale-105'
								: isFulfilled
									? 'border-emerald-500/60 bg-emerald-950/90 text-emerald-200'
									: isNewYearOnAxis
										? 'border-slate-500 bg-slate-800 text-white shadow-black/50'
										: 'border-slate-800 bg-slate-900/95 text-slate-400'}"
						>
							<span class="hidden sm:block text-[9px] uppercase tracking-wider font-semibold opacity-75">
								{sortOrder === 'chronological' ? 'Zeitachse' : 'Release'}
							</span>
							<span class="text-[10px] sm:text-sm font-extrabold tracking-tight leading-tight sm:mt-0.5">
								{axisYear}
							</span>
						</div>

						<!-- Small status indicator dot below the year badge -->
						<div
							class="mt-1.5 h-2.5 w-2.5 rounded-full border {isTargetMilestone
								? 'border-amber-200 bg-amber-400'
								: isFulfilled
									? 'border-emerald-300 bg-emerald-400'
									: progress.status === 'watching'
										? 'border-sky-300 bg-sky-400'
										: 'border-slate-600 bg-slate-800'}"
						></div>
					</div>

					<!-- RIGHT CARD COLUMN: Media Item Card (Container Query enabled via .timeline-card-container) -->
					<article
						class="timeline-card-container flex-1 min-w-0 rounded-2xl border transition-all duration-200 {isTargetMilestone
							? 'border-amber-400/80 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 shadow-lg shadow-amber-950/30'
							: isFulfilled
								? 'border-emerald-500/30 bg-slate-900/45'
								: depInfo?.watchScope === 'credits_only'
									? 'border-cyan-500/40 bg-slate-900/90 hover:border-cyan-400/60'
									: 'border-slate-800 bg-slate-900/85 hover:border-slate-700'}"
					>
						<div class="timeline-card-inner p-3.5 sm:p-5">
							<!-- Left Column inside Card: Official Cover Image + Metadata -->
							<div class="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 flex-1 min-w-0 w-full">
								<!-- Mobile Top Header Row: Cover Poster + Badges + Title side-by-side so synopsis gets full width below on mobile -->
								<div class="flex items-start gap-3 sm:contents w-full">
									<!-- Official Movie / Series Cover Poster (fetched live from API, with aspect-ratio: 2/3) -->
									<button
										type="button"
										onclick={() => openItemModal(item)}
										class="poster-aspect group relative flex w-20 sm:w-24 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br {item.posterGradient} border border-white/15 shadow-lg transition-transform hover:scale-[1.03] cursor-pointer text-left"
										title="Cover & Credit-Scene-Details für {item.title} öffnen"
									>
										{#if item.posterUrl && !failedPosterIds[item.id]}
											{#if index < 2}
												<img
													src={item.posterUrl}
													alt="{item.title} Cover"
													fetchpriority="high"
													width="192"
													height="288"
													onerror={() => (failedPosterIds[item.id] = true)}
													class="poster-aspect h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
												/>
											{:else}
												<img
													src={item.posterUrl}
													alt="{item.title} Cover"
													loading="lazy"
													width="192"
													height="288"
													onerror={() => (failedPosterIds[item.id] = true)}
													class="poster-aspect h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
												/>
											{/if}
											<div class="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-1.5 py-1 flex items-center justify-between">
												<span class="text-[9px] font-bold text-white/90">
													{sortOrder === 'chronological' ? `#${index + 1}` : `#${index + 1}`}
												</span>
												<span class="text-[8px] font-semibold text-amber-300 truncate max-w-[54px]">
													{item.streamingProvider}
												</span>
											</div>
										{:else}
											<div class="flex h-full w-full flex-col justify-between p-2">
												<span class="text-[10px] font-bold uppercase tracking-wider text-white/75">
													{sortOrder === 'chronological' ? `#${index + 1}` : `Rel #${index + 1}`}
												</span>
												<div class="text-[11px] font-bold leading-tight text-white line-clamp-3">
													{item.title}
												</div>
												<span class="text-[9px] text-white/70 font-medium">{item.streamingProvider}</span>
											</div>
										{/if}
									</button>

									<!-- Mobile Title & Primary Badges (next to poster on <sm, merged into main column on sm+) -->
									<div class="flex-1 min-w-0 space-y-1.5 sm:hidden">
										<div class="flex flex-wrap items-center gap-1">
											<span class="rounded-md border px-1.5 py-0.5 text-[10px] font-semibold {typeBadge.classes}">
												{typeBadge.label}
											</span>
											{#if item.canonScope === 'non_marvel_studios'}
												<span class="rounded-md border border-amber-500/40 bg-amber-950/40 px-1.5 py-0.5 text-[10px] font-semibold text-amber-300">
													🌌 Non-Studios
												</span>
											{:else if item.canonScope === 'expanded_universe'}
												<span class="rounded-md border border-purple-500/40 bg-purple-950/40 px-1.5 py-0.5 text-[10px] font-semibold text-purple-300">
													📺 Expanded
												</span>
											{:else}
												<span class="rounded-md border border-red-500/30 bg-red-950/30 px-1.5 py-0.5 text-[10px] font-semibold text-red-300">
													🏛️ Core
												</span>
											{/if}
										</div>

										<h3 class="text-base font-bold leading-snug {isFulfilled ? 'text-slate-200' : 'text-white'}">
											{item.title}
										</h3>

										<div class="text-[11px] text-slate-400">
											⏳ {item.inUniverseYear} • Kinostart: {item.releaseDate.slice(0, 4)}
										</div>

										{#if progress.rating}
											<button
												type="button"
												onclick={() => openItemModal(item)}
												class="inline-flex items-center gap-1 rounded-full bg-amber-500/15 border border-amber-400/40 px-2 py-0.5 text-[11px] font-bold text-amber-300 cursor-pointer"
											>
												<Star class="h-3 w-3 fill-amber-400 text-amber-400" />
												<span>{progress.rating.toLocaleString('de-DE')} / 5</span>
											</button>
										{/if}
									</div>
								</div>

								<div class="space-y-2 flex-1 min-w-0 w-full">
									<!-- Desktop/Tablet Badges Row (hidden on <sm where compact badges are shown next to poster) -->
									<div class="hidden sm:flex flex-wrap items-center gap-1.5">
										<span class="rounded-md border px-2 py-0.5 text-[11px] font-semibold {typeBadge.classes}">
											{typeBadge.label}
										</span>
										{#if item.canonScope === 'non_marvel_studios'}
											<span class="rounded-md border border-amber-500/40 bg-amber-950/40 px-2 py-0.5 text-[11px] font-semibold text-amber-300">
												🌌 Non-Marvel Studios
											</span>
										{:else if item.canonScope === 'expanded_universe'}
											<span class="rounded-md border border-purple-500/40 bg-purple-950/40 px-2 py-0.5 text-[11px] font-semibold text-purple-300">
												📺 Expanded Universe
											</span>
										{:else}
											<span class="rounded-md border border-red-500/30 bg-red-950/30 px-2 py-0.5 text-[11px] font-semibold text-red-300">
												🏛️ Core Studios
											</span>
										{/if}
										<span class="rounded-md bg-slate-800/90 px-2 py-0.5 text-[11px] text-slate-300">
											{item.phaseOrEra}
										</span>
										<span class="rounded-md bg-slate-800/60 px-2 py-0.5 text-[11px] text-slate-400">
											⏳ Spielt: {item.inUniverseYear} • Kinostart: {item.releaseDate.slice(0, 4)}
										</span>
									</div>

									<!-- Event / Road-to Badges (shown on all screen sizes) -->
									{#if newlySyncedItemId === item.id || isTargetMilestone || depInfo}
										<div class="flex flex-wrap items-center gap-1.5">
											{#if newlySyncedItemId === item.id}
												<span class="rounded-md bg-emerald-500 text-slate-950 px-2.5 py-0.5 text-[11px] font-bold animate-pulse">
													✨ NEU PER AUTO-SYNC
												</span>
											{/if}

											{#if isTargetMilestone}
												<span class="rounded-md bg-amber-500 text-slate-950 px-2.5 py-0.5 text-[11px] font-bold">
													🎯 ZIEL-EVENT
												</span>
											{/if}

											{#if depInfo}
												{@const prioBadge = getPriorityBadge(depInfo.priority)}
												<span class="rounded-md border px-2.5 py-0.5 text-[11px] font-semibold {prioBadge.classes}">
													{prioBadge.label}
												</span>

												{#if depInfo.watchScope === 'credits_only'}
													<span class="inline-flex items-center gap-1 rounded-md border border-cyan-400/60 bg-cyan-500/20 px-2.5 py-0.5 text-[11px] font-bold text-cyan-200 shadow-sm shadow-cyan-950">
														<Zap class="h-3 w-3 text-cyan-300 shrink-0" />
														<span>NUR CREDIT-SCENE ({depInfo.effectiveMinutes ?? 3} Min. statt {item.runtimeMinutes} Min.!)</span>
													</span>
												{:else if depInfo.watchScope === 'key_episodes'}
													<span class="inline-flex items-center gap-1 rounded-md border border-cyan-400/60 bg-cyan-500/20 px-2.5 py-0.5 text-[11px] font-bold text-cyan-200">
														<Zap class="h-3 w-3 text-cyan-300 shrink-0" />
														<span>NUR SCHLÜSSEL-FOLGEN ({depInfo.effectiveMinutes ?? 45} Min.)</span>
													</span>
												{/if}
											{/if}
										</div>
									{/if}

									<!-- Desktop Title (hidden on <sm because it is shown right next to the poster) -->
									<div class="hidden sm:flex flex-wrap items-center gap-2">
										<h3
											class="text-base sm:text-lg font-bold {isFulfilled
												? 'text-slate-200'
												: 'text-white'}"
										>
											{item.title}
										</h3>
										{#if progress.rating}
											<button
												type="button"
												onclick={() => openItemModal(item)}
												class="inline-flex items-center gap-1 rounded-full bg-amber-500/15 border border-amber-400/40 px-2 py-0.5 text-[11px] font-bold text-amber-300 hover:bg-amber-500/25 transition cursor-pointer"
												title="Deine Bewertung ändern"
											>
												<Star class="h-3 w-3 fill-amber-400 text-amber-400" />
												<span>{progress.rating.toLocaleString('de-DE')} / 5</span>
											</button>
										{/if}
										{#if depInfo?.watchScope === 'credits_only' && progress.watchedCredits && progress.status !== 'watched'}
											<span class="rounded-full bg-cyan-500/20 border border-cyan-400/40 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-200">
												✓ Für {activeMilestone?.title} erledigt (Credit-Scene gesehen)
											</span>
										{/if}
										{#if selectedFriend}
											{@const friendHasWatched = selectedFriend.watchedIds.includes(item.id)}
											<span
												class="rounded-full px-2 py-0.5 text-[10px] font-semibold border {friendHasWatched
													? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
													: 'bg-rose-950/60 border-rose-500/40 text-rose-300'}"
											>
												{selectedFriend.name}: {friendHasWatched ? 'Schon gesehen' : 'Noch offen!'}
											</span>
										{/if}
									</div>

									<!-- Synopsis -->
									<p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
										{item.synopsis}
									</p>

									<!-- Road-to Dependency Reason + Credit-Scene Shortcut Box -->
									{#if depInfo}
										<div
											class="rounded-xl border px-3.5 py-2.5 text-xs space-y-1.5 {depInfo.watchScope ===
											'credits_only' || depInfo.watchScope === 'key_episodes'
												? 'bg-cyan-950/35 border-cyan-500/40 text-cyan-100'
												: 'bg-amber-500/10 border-amber-500/25 text-amber-200'}"
										>
											{#if depInfo.scopeHint}
												<div class="flex items-center justify-between gap-2 flex-wrap">
													<span class="font-bold text-cyan-300 flex items-center gap-1">
														<Zap class="h-3.5 w-3.5 shrink-0" />
														<span>{depInfo.scopeHint}</span>
													</span>
													{#if depInfo.watchScope === 'credits_only'}
														<button
															type="button"
															onclick={() => openItemModal(item)}
															class="rounded-lg bg-cyan-500/25 border border-cyan-400/50 px-2.5 py-1 text-[11px] font-bold text-cyan-100 hover:bg-cyan-500/40 transition cursor-pointer"
														>
															🍿 Direkt zur Credit-Scene →
														</button>
													{/if}
												</div>
											{/if}
											<div class="flex items-start gap-2">
												<Compass class="h-4 w-4 shrink-0 mt-0.5 {depInfo.watchScope === 'credits_only' ? 'text-cyan-400' : 'text-amber-400'}" />
												<div>
													<strong class="font-semibold">Bezug zu {activeMilestone?.title}:</strong>
													{depInfo.reason}
												</div>
											</div>
										</div>
									{/if}

									<!-- Mid- & Post-Credit Scene Bar -->
									<div class="flex flex-wrap items-center gap-2 pt-1">
										{#if item.creditScenes.length > 0}
											<button
												type="button"
												onclick={() => openItemModal(item)}
												class="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition cursor-pointer {mustWatchStingers >
												0
													? 'border-rose-500/40 bg-rose-950/40 text-rose-200 hover:bg-rose-900/50'
													: 'border-slate-700 bg-slate-800/80 text-slate-200 hover:bg-slate-800'}"
											>
												<span>🍿 {item.creditScenes.length} Credit-Scene{item.creditScenes.length > 1 ? 's' : ''}</span>
												{#if mustWatchStingers > 0}
													<span class="rounded bg-rose-500/30 px-1.5 py-0.2 text-[10px] font-bold text-rose-200">
														Sitzenbleiben!
													</span>
												{:else}
													<span class="text-[10px] text-slate-400">(Optional / Gag)</span>
												{/if}
											</button>

											<button
												type="button"
												onclick={() => toggleCreditsWatched(item)}
												class="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[11px] font-medium transition cursor-pointer {progress.watchedCredits
													? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300'
													: depInfo?.watchScope === 'credits_only'
														? 'border-cyan-500/50 bg-cyan-950/40 text-cyan-200 hover:bg-cyan-900/50'
														: 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'}"
											>
												<CheckCircle2 class="h-3 w-3" />
												<span>
													{#if progress.watchedCredits}
														Credit-Scene gesehen ✓
													{:else if depInfo?.watchScope === 'credits_only'}
														Nur Credit-Scene als gesehen abhaken
													{:else}
														Credits offen
													{/if}
												</span>
											</button>
										{:else if !item.isUpcoming}
											<span class="text-[11px] text-slate-500">
												Keine Post-Credit-Scene (du kannst direkt nach dem Film raus)
											</span>
										{/if}
									</div>
								</div>
							</div>

							<!-- Right Column: Tracking Controls (Full-width touch targets on mobile, right-aligned on desktop) -->
							<div class="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end justify-between w-full md:w-auto gap-2 border-t md:border-t-0 border-slate-800/80 pt-3 md:pt-0 shrink-0">
								{#if item.isUpcoming}
									<span class="rounded-xl border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-center text-xs font-semibold text-amber-300">
										Kinostart: {new Date(item.releaseDate).toLocaleDateString('de-DE')}
									</span>
								{:else}
									<button
										type="button"
										onclick={() => toggleWatchStatus(item)}
										class="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 sm:py-2 text-xs font-bold transition w-full sm:w-auto cursor-pointer {progress.status ===
										'watched'
											? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950/50 hover:bg-emerald-400'
											: 'bg-slate-800 text-slate-100 border border-slate-700 hover:bg-slate-700'}"
									>
										<CheckCircle2 class="h-4 w-4 shrink-0" />
										<span>
											{progress.status === 'watched' ? 'Ganzer Film gesehen' : 'Ganzen Titel abhaken'}
										</span>
									</button>

									{#if depInfo?.watchScope === 'credits_only' && progress.status !== 'watched'}
										<button
											type="button"
											onclick={() => toggleCreditsWatched(item)}
											class="inline-flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 sm:py-1.5 text-[11px] font-bold transition w-full sm:w-auto cursor-pointer {progress.watchedCredits
												? 'border-cyan-400 bg-cyan-500 text-slate-950'
												: 'border-cyan-500/50 bg-cyan-950/50 text-cyan-200 hover:bg-cyan-900/60'}"
										>
											<Zap class="h-3.5 w-3.5 shrink-0" />
											<span>
												{progress.watchedCredits
													? 'Credit-Shortcut erledigt ✓'
													: 'Nur Credit-Scene abhaken (3 Min.)'}
											</span>
										</button>
									{/if}

									{#if item.mediaType === 'series' && item.episodeCount}
										<div class="flex items-center justify-between sm:justify-start gap-1.5 rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 sm:px-2 sm:py-1 text-xs">
											<div class="flex items-center gap-1.5">
												<Tv class="h-3.5 w-3.5 text-purple-400" />
												<span class="text-slate-300 font-medium">
													Folge {progress.watchedEpisodes} / {item.episodeCount}
												</span>
											</div>
											<div class="flex items-center gap-1">
												<button
													type="button"
													onclick={() => adjustEpisodes(item, -1)}
													class="ml-1 rounded-lg bg-slate-800 px-2.5 py-1 sm:px-1.5 sm:py-0.5 text-slate-200 hover:bg-slate-700 font-bold cursor-pointer"
													aria-label="Eine Folge weniger"
												>
													-
												</button>
												<button
													type="button"
													onclick={() => adjustEpisodes(item, 1)}
													class="rounded-lg bg-slate-800 px-2.5 py-1 sm:px-1.5 sm:py-0.5 text-slate-200 hover:bg-slate-700 font-bold cursor-pointer"
													aria-label="Eine Folge weiter"
												>
													+
												</button>
											</div>
										</div>
									{/if}
								{/if}

								<button
									type="button"
									onclick={() => openItemModal(item)}
									class="text-[11px] text-slate-400 hover:text-white inline-flex items-center justify-center gap-1 py-1 cursor-pointer"
								>
									<Info class="h-3.5 w-3.5" />
									<span>Details & Credit-Guide</span>
								</button>
							</div>
						</div>
					</article>
				</div>
			{:else}
				<div class="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-center space-y-2">
					<p class="text-base font-semibold text-white">Keine Einträge für diesen Filter gefunden.</p>
					<p class="text-xs text-slate-400">
						Setze den Status- oder Format-Filter zurück, um wieder alle Titel der Timeline zu sehen.
					</p>
				</div>
			{/each}
		</section>
	</main>

	<!-- ======================================================================== -->
	<!-- NATIVE <dialog closedby="any"> MODAL FOR CREDIT SCENES & DETAILS         -->
	<!-- (Follows modern-web-guidance: light-dismiss-a-dialog & responsive-design)-->
	<!-- ======================================================================== -->
	<dialog
		bind:this={dialogEl}
		{...({ closedby: 'any' } as any)}
		aria-labelledby="dialog-title"
		class="m-auto w-[calc(100vw-1.25rem)] sm:w-full max-w-xl max-h-[90dvh] overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-0 text-slate-100 shadow-2xl"
	>
		{#if activeModalItem}
			{@const modalProgress = getItemProgress(activeModalItem.id)}
			{@const modalDep = dependencyMap.get(activeModalItem.id)}
			<div class="p-5 sm:p-6 space-y-5">
				<div class="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
					<div class="flex items-start gap-4">
						{#if activeModalItem.posterUrl && !failedPosterIds[activeModalItem.id]}
							<img
								src={activeModalItem.posterUrl}
								alt="{activeModalItem.title} Cover"
								width="160"
								height="240"
								class="h-28 w-20 shrink-0 rounded-xl object-cover border border-white/15 shadow-lg"
							/>
						{/if}
						<div>
							<span class="text-xs font-semibold text-amber-400 uppercase tracking-wider">
								{activeModalItem.phaseOrEra} • In-Universe: {activeModalItem.inUniverseYear}
							</span>
							<h2 id="dialog-title" class="text-xl font-bold text-white mt-0.5">
								{activeModalItem.title}
							</h2>
							<p class="text-xs text-slate-400 mt-1">
								Verfügbar auf: <strong class="text-slate-200">{activeModalItem.streamingProvider}</strong> • Gesamtlaufzeit: {formatRuntime(activeModalItem.runtimeMinutes)}
							</p>
							{#if activeModalItem.apiSource}
								<p class="text-[11px] text-emerald-400 mt-1">
									✓ Live geladen über {activeModalItem.apiSource}
								</p>
							{/if}
						</div>
					</div>
					<form method="dialog">
						<button
							type="submit"
							class="rounded-lg border border-slate-700 bg-slate-800 p-1.5 text-slate-300 hover:text-white cursor-pointer"
							aria-label="Dialog schließen"
						>
							<X class="h-4 w-4" />
						</button>
					</form>
				</div>

				{#if modalDep?.watchScope === 'credits_only'}
					<div class="rounded-xl border border-cyan-500/40 bg-cyan-950/30 p-3.5 text-xs text-cyan-100 flex items-start gap-2.5">
						<Zap class="h-4 w-4 text-cyan-300 shrink-0 mt-0.5" />
						<div>
							<strong class="font-bold text-cyan-300">Kein ganzer Film-Rewatch nötig!</strong>
							Für <strong>{activeMilestone?.title}</strong> ist nur die untenstehende Credit-Scene wichtig. Du kannst sie dir auf Disney+ (oder hier als Zusammenfassung) anschauen und direkt als erledigt abhaken.
						</div>
					</div>
				{/if}

				<p class="text-sm text-slate-300 leading-relaxed">
					{activeModalItem.synopsis}
				</p>

				<!-- Personal Rating (0.5–5.0 Stars in Half-Star Steps) & Watch-Scope Customization -->
				<div class="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 flex flex-wrap items-center justify-between gap-3">
					<div class="flex items-center gap-2.5">
						<span class="text-xs font-medium text-slate-400">Deine Bewertung:</span>
						<div
							class="flex items-center gap-1"
							role="group"
							aria-label="Bewertung in halben Sternen von 0,5 bis 5,0"
							onmouseleave={() => (hoverRating = null)}
						>
							{#each [1, 2, 3, 4, 5] as star}
								{@const displayRating = hoverRating ?? modalProgress.rating ?? 0}
								{@const isFull = displayRating >= star}
								{@const isHalf = !isFull && displayRating >= star - 0.5}
								<div class="relative inline-flex h-5 w-5 items-center justify-center transition-transform hover:scale-110">
									<!-- Base Unfilled Star -->
									<Star class="h-5 w-5 text-slate-600" />

									<!-- Full or Half-Clipped Amber Star Overlay -->
									{#if isFull}
										<Star class="pointer-events-none absolute inset-0 h-5 w-5 fill-amber-400 text-amber-400" />
									{:else if isHalf}
										<Star
											class="pointer-events-none absolute inset-0 h-5 w-5 fill-amber-400 text-amber-400"
											style="clip-path: inset(0 50% 0 0);"
										/>
									{/if}

									<!-- Left Half Hit Target (star - 0.5) -->
									<button
										type="button"
										onmouseenter={() => (hoverRating = star - 0.5)}
										onclick={() => activeModalItem && setItemRating(activeModalItem, star - 0.5)}
										class="absolute inset-y-0 left-0 w-1/2 cursor-pointer focus:outline-none"
										aria-label="{(star - 0.5).toLocaleString('de-DE')} Sterne"
										title="{(star - 0.5).toLocaleString('de-DE')} Sterne"
									></button>

									<!-- Right Half Hit Target (star) -->
									<button
										type="button"
										onmouseenter={() => (hoverRating = star)}
										onclick={() => activeModalItem && setItemRating(activeModalItem, star)}
										class="absolute inset-y-0 right-0 w-1/2 cursor-pointer focus:outline-none"
										aria-label="{star} Sterne"
										title="{star} Sterne"
									></button>
								</div>
							{/each}
						</div>

						<span class="min-w-[58px] rounded-md bg-slate-900 border border-slate-800 px-2 py-0.5 text-center text-xs font-bold text-amber-300">
							{#if (hoverRating ?? modalProgress.rating) !== undefined && (hoverRating ?? modalProgress.rating) !== null}
								{(hoverRating ?? modalProgress.rating ?? 0).toLocaleString('de-DE')} / 5 ★
							{:else}
								– / 5 ★
							{/if}
						</span>
					</div>

					{#if modalDep && activeMilestone}
						<button
							type="button"
							onclick={() => activeModalItem && toggleWatchScopeShortcut(activeModalItem)}
							class="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold transition cursor-pointer {modalDep.watchScope ===
							'credits_only'
								? 'border-cyan-500/50 bg-cyan-950/40 text-cyan-200'
								: 'border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600'}"
						>
							<Zap class="h-3.5 w-3.5 text-cyan-400" />
							<span>
								{modalDep.watchScope === 'credits_only'
									? 'Modus: ⚡ Nur Credit-Scene nötig (aktiv)'
									: 'Auf „⚡ Nur Credit-Scene nötig“ umschalten'}
							</span>
						</button>
					{/if}
				</div>

				<!-- Mid- & Post-Credit Scenes Guide -->
				<div class="space-y-3">
					<div class="flex items-center justify-between">
						<h3 class="text-sm font-bold text-white flex items-center gap-2">
							<span>🍿 Mid- & Post-Credit-Scene Spickzettel</span>
						</h3>
						{#if activeModalItem.creditScenes.length > 0}
							<button
								type="button"
								onclick={() => activeModalItem && toggleCreditsWatched(activeModalItem)}
								class="rounded-lg border px-2.5 py-1 text-xs font-medium cursor-pointer {modalProgress.watchedCredits
									? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
									: 'border-cyan-500/40 bg-cyan-950/40 text-cyan-200 hover:bg-cyan-900/50'}"
							>
								{modalProgress.watchedCredits ? '✓ Credit-Scene als gesehen markiert' : 'Credit-Scene als gesehen abhaken'}
							</button>
						{/if}
					</div>

					{#if activeModalItem.creditScenes.length === 0}
						<div class="rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-xs text-slate-400">
							Dieser Titel hat keine Mid- oder Post-Credit-Scene (oder ist noch nicht im Kino erschienen).
						</div>
					{:else}
						{#each activeModalItem.creditScenes as scene (scene.id)}
							<div class="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-2.5">
								<div class="flex items-center justify-between">
									<span class="text-xs font-bold uppercase tracking-wider text-slate-200">
										{scene.sceneType === 'mid_credit' ? 'Mid-Credit-Scene (Mitte des Abspanns)' : 'Post-Credit-Scene (Ganz am Ende)'}
									</span>
									<span
										class="rounded-md px-2 py-0.5 text-[11px] font-semibold {scene.importance ===
										'must_watch'
											? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
											: scene.importance === 'tease'
												? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
												: 'bg-slate-800 text-slate-400'}"
									>
										{scene.importance === 'must_watch'
											? '🔥 Pflicht! Sitzenbleiben'
											: scene.importance === 'tease'
												? '👀 Cooler Teaser'
												: '😄 Nur ein Gag'}
									</span>
								</div>

								<!-- Spoiler-free Cinema Hint -->
								<p class="text-xs text-slate-300">
									<strong class="text-emerald-400">Spoilerfreier Kino-Tipp:</strong>
									{scene.spoilerFreeHint}
								</p>

								<!-- Toggleable Spoiler Description -->
								<div class="pt-1">
									<button
										type="button"
										onclick={() => toggleSpoiler(scene.id)}
										class="inline-flex items-center gap-1.5 text-xs font-medium text-sky-400 hover:text-sky-300 cursor-pointer"
									>
										{#if revealedSpoilerIds[scene.id]}
											<EyeOff class="h-3.5 w-3.5" />
											<span>Spoiler-Beschreibung wieder verbergen</span>
										{:else}
											<Eye class="h-3.5 w-3.5" />
											<span>Kein Rewatch nötig: Komplette Szene hier nachlesen (Spoiler)</span>
										{/if}
									</button>

									{#if revealedSpoilerIds[scene.id]}
										<div class="mt-2 rounded-lg border border-amber-500/30 bg-amber-950/20 p-3 text-xs text-amber-100 leading-relaxed">
											{scene.spoilerDescription}
										</div>
									{/if}
								</div>
							</div>
						{/each}
					{/if}
				</div>

				<div class="flex justify-end pt-2 border-t border-slate-800">
					<form method="dialog">
						<button
							type="submit"
							class="rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700 cursor-pointer"
						>
							Fertig
						</button>
					</form>
				</div>
			</div>
		{/if}
	</dialog>
</div>
