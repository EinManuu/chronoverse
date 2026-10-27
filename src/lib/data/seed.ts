import type { Franchise, FriendProfile, MediaDependency, MediaItem } from '$lib/types';
import { MCU_DEPENDENCIES, MCU_ITEMS } from './mcu-catalog';
import {
	DCU_DEPENDENCIES,
	DCU_ITEMS,
	STARWARS_DEPENDENCIES,
	STARWARS_ITEMS
} from './dcu-starwars-catalog';

export const FRANCHISES: Franchise[] = [
	{
		id: 'mcu',
		name: 'Marvel Cinematic Universe (Komplett inkl. Marvel TV & Defenders)',
		shortName: `MCU (${MCU_ITEMS.length})`,
		tagline: `Alle ${MCU_ITEMS.length} Filme, Disney+ Serien, Agent Carter, Agents of S.H.I.E.L.D., Defenders-Saga, One-Shots & Specials bis Phase 6`,
		accentColor: '#ef4444',
		badgeBg: 'bg-red-500/15 text-red-300 border-red-500/30',
		lastSyncedAt: `Vollständiger Katalog geladen (${MCU_ITEMS.length} Titel)`,
		autoSyncSource: 'TMDB Complete MCU List #8136 + MCU Wiki + Gemini Grounding'
	},
	{
		id: 'dcu',
		name: 'DC Universe (DCU, Batverse & DCEU)',
		shortName: `DC (${DCU_ITEMS.length})`,
		tagline:
			'James Gunns neues DCU (Chapter 1), Matt Reeves’ The Batman Saga & DCEU-Vorgeschichte',
		accentColor: '#3b82f6',
		badgeBg: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
		lastSyncedAt: `Vollständiger Katalog geladen (${DCU_ITEMS.length} Titel)`,
		autoSyncSource: 'TMDB DCU List #9412 + DC Database Wiki + Gemini Grounding'
	},
	{
		id: 'starwars',
		name: 'Star Wars (Skywalker-Saga & Mandoverse)',
		shortName: `Star Wars (${STARWARS_ITEMS.length})`,
		tagline:
			'Alle Episoden I–VI, Rogue One, Andor, Clone Wars, Rebels & das komplette Mandoverse',
		accentColor: '#eab308',
		badgeBg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
		lastSyncedAt: `Vollständiger Katalog geladen (${STARWARS_ITEMS.length} Titel)`,
		autoSyncSource: 'TMDB Star Wars List #7021 + Wookieepedia + Gemini Grounding'
	}
];

export const MEDIA_ITEMS: MediaItem[] = [...MCU_ITEMS, ...DCU_ITEMS, ...STARWARS_ITEMS];

export const MEDIA_DEPENDENCIES: MediaDependency[] = [
	...MCU_DEPENDENCIES,
	...DCU_DEPENDENCIES,
	...STARWARS_DEPENDENCIES
];

export const INITIAL_FRIENDS: FriendProfile[] = [
	{
		id: 'friend-max',
		name: 'Max',
		avatar: 'M',
		watchedIds: [
			'mcu-cap-first-avenger',
			'mcu-iron-man',
			'mcu-iron-man-2',
			'mcu-thor',
			'mcu-avengers-2012',
			'mcu-cap-winter-soldier',
			'mcu-gotg-1',
			'mcu-avengers-age-of-ultron',
			'mcu-cap-civil-war',
			'mcu-thor-ragnarok',
			'mcu-avengers-infinity-war',
			'mcu-avengers-endgame',
			'mcu-loki-s1',
			'mcu-wandavision',
			'mcu-spider-man-no-way-home',
			'mcu-dr-strange-mom',
			'mcu-deadpool-wolverine',
			'dcu-the-batman',
			'dcu-superman-2025',
			'sw-ep4-new-hope',
			'sw-ep5-empire',
			'sw-ep6-return-of-jedi',
			'sw-mandalorian'
		]
	},
	{
		id: 'friend-sarah',
		name: 'Sarah',
		avatar: 'S',
		watchedIds: [
			'mcu-cap-first-avenger',
			'mcu-oneshot-agent-carter',
			'mcu-iron-man',
			'mcu-avengers-2012',
			'mcu-avengers-infinity-war',
			'mcu-avengers-endgame',
			'mcu-loki-s1',
			'mcu-loki-s2',
			'mcu-wandavision',
			'mcu-the-marvels',
			'mcu-thunderbolts',
			'dcu-the-batman',
			'dcu-the-penguin',
			'dcu-creature-commandos-s1',
			'dcu-superman-2025',
			'sw-andor-s1-s2',
			'sw-rogue-one',
			'sw-mandalorian',
			'sw-ahsoka-s1'
		]
	}
];
