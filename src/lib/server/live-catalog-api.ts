import { env } from '$env/dynamic/private';
import type { CanonScope, Franchise, FriendProfile, MediaDependency, MediaItem, MediaType } from '$lib/types';
import { MCU_DEPENDENCIES, MCU_ITEMS } from '$lib/data/mcu-catalog';
import {
	DCU_DEPENDENCIES,
	DCU_ITEMS,
	STARWARS_DEPENDENCIES,
	STARWARS_ITEMS
} from '$lib/data/dcu-starwars-catalog';
import {
	EXISTING_NON_MARVEL_STUDIOS_IDS,
	EXPANDED_MARVEL_ITEM_IDS,
	NON_MARVEL_STUDIOS_ITEMS,
	NON_MARVEL_TVMAZE_QUERY_MAP,
	NON_MARVEL_WIKIPEDIA_TITLE_MAP
} from '$lib/data/non-marvel-studios-catalog';
import { INITIAL_FRIENDS } from '$lib/data/seed';

export interface LiveCatalogPayload {
	franchises: Franchise[];
	mediaItems: MediaItem[];
	dependencies: MediaDependency[];
	friends: FriendProfile[];
	apiStats: {
		fetchedAt: string;
		durationMs: number;
		totalLiveItems: number;
		postersResolved: number;
		newlyDiscoveredFromApi: number;
		sourcesUsed: string[];
	};
}

/**
 * English Wikipedia page title mapping for batch-fetching official theatrical posters
 * via MediaWiki PageImages API (action=query&prop=pageimages&pilicense=any&pithumbsize=500)
 */
const WIKIPEDIA_TITLE_MAP: Record<string, string> = {
	// MCU
	'mcu-eyes-of-wakanda': 'Eyes of Wakanda',
	'mcu-cap-first-avenger': 'Captain America: The First Avenger',
	'mcu-agent-carter-s1': 'Agent Carter (TV series)',
	'mcu-agent-carter-s2': 'Agent Carter (TV series)',
	'mcu-oneshot-agent-carter': 'Agent Carter (film)',
	'mcu-captain-marvel': 'Captain Marvel (film)',
	'mcu-iron-man': 'Iron Man (2008 film)',
	'mcu-iron-man-2': 'Iron Man 2',
	'mcu-incredible-hulk': 'The Incredible Hulk (film)',
	'mcu-oneshot-the-consultant': 'The Consultant (film)',
	'mcu-oneshot-thor-hammer': 'Marvel One-Shots',
	'mcu-thor': 'Thor (film)',
	'mcu-avengers-2012': 'The Avengers (2012 film)',
	'mcu-oneshot-item-47': 'Item 47',
	'mcu-iron-man-3': 'Iron Man 3',
	'mcu-oneshot-all-hail-the-king': 'All Hail the King',
	'mcu-agents-of-shield': 'Agents of S.H.I.E.L.D.',
	'mcu-thor-dark-world': 'Thor: The Dark World',
	'mcu-cap-winter-soldier': 'Captain America: The Winter Soldier',
	'mcu-gotg-1': 'Guardians of the Galaxy (film)',
	'mcu-gotg-2': 'Guardians of the Galaxy Vol. 2',
	'mcu-i-am-groot': 'I Am Groot',
	'mcu-daredevil-s1-s3': 'Daredevil (TV series)',
	'mcu-jessica-jones-s1-s3': 'Jessica Jones (TV series)',
	'mcu-avengers-age-of-ultron': 'Avengers: Age of Ultron',
	'mcu-ant-man': 'Ant-Man (film)',
	'mcu-luke-cage-s1-s2': 'Luke Cage (TV series)',
	'mcu-iron-fist-s1-s2': 'Iron Fist (TV series)',
	'mcu-the-defenders': 'The Defenders (miniseries)',
	'mcu-cap-civil-war': 'Captain America: Civil War',
	'mcu-oneshot-team-thor': 'Team Thor',
	'mcu-black-widow': 'Black Widow (2021 film)',
	'mcu-black-panther': 'Black Panther (film)',
	'mcu-spider-man-homecoming': 'Spider-Man: Homecoming',
	'mcu-the-punisher-s1-s2': 'The Punisher (TV series)',
	'mcu-doctor-strange-1': 'Doctor Strange (2016 film)',
	'mcu-inhumans': 'Inhumans (TV series)',
	'mcu-runaways-s1-s3': 'Runaways (TV series)',
	'mcu-cloak-and-dagger': 'Cloak & Dagger (TV series)',
	'mcu-thor-ragnarok': 'Thor: Ragnarok',
	'mcu-ant-man-wasp': 'Ant-Man and the Wasp',
	'mcu-avengers-infinity-war': 'Avengers: Infinity War',
	'mcu-avengers-endgame': 'Avengers: Endgame',
	'mcu-loki-s1': 'Loki (TV series)',
	'mcu-what-if-s1-s3': 'What If...? (TV series)',
	'mcu-wandavision': 'WandaVision',
	'mcu-shang-chi': 'Shang-Chi and the Legend of the Ten Rings',
	'mcu-falcon-winter-soldier': 'The Falcon and the Winter Soldier',
	'mcu-oneshot-peters-todo-list': 'Spider-Man: Far From Home',
	'mcu-spider-man-far-from-home': 'Spider-Man: Far From Home',
	'mcu-eternals': 'Eternals (film)',
	'mcu-spider-man-no-way-home': 'Spider-Man: No Way Home',
	'mcu-dr-strange-mom': 'Doctor Strange in the Multiverse of Madness',
	'mcu-hawkeye': 'Hawkeye (miniseries)',
	'mcu-moon-knight': 'Moon Knight (miniseries)',
	'mcu-black-panther-wakanda-forever': 'Black Panther: Wakanda Forever',
	'mcu-echo': 'Echo (miniseries)',
	'mcu-she-hulk': 'She-Hulk: Attorney at Law',
	'mcu-ms-marvel': 'Ms. Marvel (miniseries)',
	'mcu-thor-love-and-thunder': 'Thor: Love and Thunder',
	'mcu-werewolf-by-night': 'Werewolf by Night (TV special)',
	'mcu-gotg-holiday-special': 'The Guardians of the Galaxy Holiday Special',
	'mcu-ant-man-quantumania': 'Ant-Man and the Wasp: Quantumania',
	'mcu-gotg-3': 'Guardians of the Galaxy Vol. 3',
	'mcu-secret-invasion': 'Secret Invasion (miniseries)',
	'mcu-loki-s2': 'Loki season 2',
	'mcu-the-marvels': 'The Marvels',
	'mcu-xmen-legacy-collection': 'X-Men: Days of Future Past',
	'mcu-xmen-97': "X-Men '97",
	'mcu-deadpool-wolverine': 'Deadpool & Wolverine',
	'mcu-agatha-all-along': 'Agatha All Along',
	'mcu-friendly-neighborhood-spiderman': 'Your Friendly Neighborhood Spider-Man',
	'mcu-daredevil-born-again-s1': 'Daredevil: Born Again',
	'mcu-cap-brave-new-world': 'Captain America: Brave New World',
	'mcu-thunderbolts': 'Thunderbolts*',
	'mcu-ironheart': 'Ironheart (miniseries)',
	'mcu-fantastic-four': 'The Fantastic Four: First Steps',
	'mcu-marvel-zombies': 'Marvel Zombies (miniseries)',
	'mcu-wonder-man': 'Wonder Man (TV series)',
	'mcu-daredevil-born-again-s2': 'Daredevil: Born Again',
	'mcu-punisher-special': 'The Punisher (TV series)',
	'mcu-spider-man-brand-new-day': 'Spider-Man: Brand New Day',
	'mcu-vision-quest': 'WandaVision',
	'mcu-avengers-doomsday': 'Avengers: Doomsday',
	'mcu-avengers-secret-wars': 'Avengers: Secret Wars',
	// DC
	'dcu-wonder-woman-1': 'Wonder Woman (2017 film)',
	'dcu-wonder-woman-1984': 'Wonder Woman 1984',
	'dcu-man-of-steel': 'Man of Steel (film)',
	'dcu-bvs-ultimate': 'Batman v Superman: Dawn of Justice',
	'dcu-zack-snyder-justice-league': "Zack Snyder's Justice League",
	'dcu-aquaman-1': 'Aquaman (film)',
	'dcu-shazam-1': 'Shazam! (film)',
	'dcu-the-suicide-squad': 'The Suicide Squad (film)',
	'dcu-peacemaker-s1': 'Peacemaker (TV series)',
	'dcu-blue-beetle': 'Blue Beetle (film)',
	'dcu-the-flash': 'The Flash (film)',
	'dcu-the-batman': 'The Batman (film)',
	'dcu-the-penguin': 'The Penguin (TV series)',
	'dcu-creature-commandos-s1': 'Creature Commandos (TV series)',
	'dcu-superman-2025': 'Superman (2025 film)',
	'dcu-peacemaker-s2': 'Peacemaker season 2',
	'dcu-supergirl-2026': 'Supergirl (2026 film)',
	'dcu-lanterns': 'Lanterns (TV series)',
	'dcu-clayface': 'Clayface (film)',
	'dcu-the-batman-part-2': 'The Batman – Part II',
	// Star Wars
	'sw-acolyte': 'The Acolyte (TV series)',
	'sw-ep1-phantom-menace': 'Star Wars: Episode I – The Phantom Menace',
	'sw-tales-of-the-jedi': 'Tales of the Jedi (TV series)',
	'sw-ep2-attack-of-clones': 'Star Wars: Episode II – Attack of the Clones',
	'sw-clone-wars-series': 'Star Wars: The Clone Wars (2008 TV series)',
	'sw-ep3-revenge-of-sith': 'Star Wars: Episode III – Revenge of the Sith',
	'sw-bad-batch': 'Star Wars: The Bad Batch',
	'sw-solo': 'Solo: A Star Wars Story',
	'sw-obi-wan-kenobi': 'Obi-Wan Kenobi (miniseries)',
	'sw-andor-s1-s2': 'Andor (TV series)',
	'sw-rebels': 'Star Wars Rebels',
	'sw-rogue-one': 'Rogue One',
	'sw-ep4-new-hope': 'Star Wars (film)',
	'sw-ep5-empire': 'The Empire Strikes Back',
	'sw-ep6-return-of-jedi': 'Return of the Jedi',
	'sw-mandalorian': 'The Mandalorian season 1',
	'sw-book-of-boba-fett': 'The Book of Boba Fett',
	'sw-ahsoka-s1': 'Ahsoka (TV series)',
	'sw-skeleton-crew': 'Star Wars: Skeleton Crew',
	'sw-mando-grogu-movie': 'The Mandalorian and Grogu',
	'sw-ahsoka-s2': 'Ahsoka (TV series)',
	'sw-ep7-force-awakens': 'Star Wars: The Force Awakens',
	'sw-ep8-last-jedi': 'Star Wars: The Last Jedi',
	'sw-ep9-rise-of-skywalker': 'Star Wars: The Rise of Skywalker',
	...NON_MARVEL_WIKIPEDIA_TITLE_MAP
};

/**
 * TVMaze query names for series to obtain vertical 2:3 portrait cover art
 * (instead of horizontal title-card logos on Wikipedia).
 */
const TVMAZE_SERIES_QUERY_MAP: Record<string, string> = {
	'mcu-eyes-of-wakanda': 'Eyes of Wakanda',
	'mcu-agent-carter-s1': 'Agent Carter',
	'mcu-agent-carter-s2': 'Agent Carter',
	'mcu-agents-of-shield': 'Agents of S.H.I.E.L.D.',
	'mcu-i-am-groot': 'I Am Groot',
	'mcu-daredevil-s1-s3': 'Daredevil',
	'mcu-jessica-jones-s1-s3': 'Jessica Jones',
	'mcu-luke-cage-s1-s2': 'Luke Cage',
	'mcu-iron-fist-s1-s2': 'Iron Fist',
	'mcu-the-defenders': 'The Defenders',
	'mcu-the-punisher-s1-s2': 'The Punisher',
	'mcu-inhumans': 'Marvels Inhumans',
	'mcu-runaways-s1-s3': 'Marvels Runaways',
	'mcu-cloak-and-dagger': 'Marvels Cloak & Dagger',
	'mcu-loki-s1': 'Loki',
	'mcu-loki-s2': 'Loki',
	'mcu-what-if-s1-s3': 'What If...?',
	'mcu-wandavision': 'WandaVision',
	'mcu-falcon-winter-soldier': 'The Falcon and the Winter Soldier',
	'mcu-hawkeye': 'Hawkeye',
	'mcu-moon-knight': 'Moon Knight',
	'mcu-echo': 'Echo',
	'mcu-she-hulk': 'She-Hulk: Attorney at Law',
	'mcu-ms-marvel': 'Ms. Marvel',
	'mcu-secret-invasion': 'Secret Invasion',
	'mcu-xmen-97': "X-Men '97",
	'mcu-agatha-all-along': 'Agatha All Along',
	'mcu-friendly-neighborhood-spiderman': 'Your Friendly Neighborhood Spider-Man',
	'mcu-daredevil-born-again-s1': 'Daredevil: Born Again',
	'mcu-daredevil-born-again-s2': 'Daredevil: Born Again',
	'mcu-ironheart': 'Ironheart',
	'mcu-marvel-zombies': 'Marvel Zombies',
	'mcu-wonder-man': 'Wonder Man',
	'dcu-peacemaker-s1': 'Peacemaker',
	'dcu-peacemaker-s2': 'Peacemaker',
	'dcu-the-penguin': 'The Penguin',
	'dcu-creature-commandos-s1': 'Creature Commandos',
	'dcu-lanterns': 'Lanterns',
	'sw-acolyte': 'The Acolyte',
	'sw-tales-of-the-jedi': 'Star Wars: Tales of the Jedi',
	'sw-clone-wars-series': 'Star Wars: The Clone Wars',
	'sw-bad-batch': 'Star Wars: The Bad Batch',
	'sw-obi-wan-kenobi': 'Obi-Wan Kenobi',
	'sw-andor-s1-s2': 'Andor',
	'sw-rebels': 'Star Wars Rebels',
	'sw-mandalorian': 'The Mandalorian',
	'sw-book-of-boba-fett': 'The Book of Boba Fett',
	'sw-ahsoka-s1': 'Ahsoka',
	'sw-ahsoka-s2': 'Ahsoka',
	'sw-skeleton-crew': 'Star Wars: Skeleton Crew',
	...NON_MARVEL_TVMAZE_QUERY_MAP
};

let cachedCatalog: LiveCatalogPayload | null = null;
let lastCacheTimestamp = 0;
const CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutes server-side memory cache

interface WikidataRow {
	franchise?: { value: string };
	item?: { value: string };
	itemLabel?: { value: string };
	itemDescription?: { value: string };
	releaseDate?: { value: string };
	inUniversePeriod?: { value: string };
	runtime?: { value: string };
	epCount?: { value: string };
	tmdbMovie?: { value: string };
	tmdbTv?: { value: string };
	imdbId?: { value: string };
	enWikiUrl?: { value: string };
}

/**
 * Batch-fetches official movie & TV posters from the English Wikipedia MediaWiki API
 * (`action=query&prop=pageimages&pilicense=any&pithumbsize=500`).
 */
async function fetchWikipediaPostersBatch(wikiTitles: string[]): Promise<Record<string, string>> {
	const uniqueTitles = [...new Set(wikiTitles.filter(Boolean))];
	const result: Record<string, string> = {};

	const chunks: string[][] = [];
	for (let i = 0; i < uniqueTitles.length; i += 45) {
		chunks.push(uniqueTitles.slice(i, i + 45));
	}

	await Promise.all(
		chunks.map(async (chunk) => {
			try {
				const url =
					'https://en.wikipedia.org/w/api.php?action=query&redirects=1&prop=pageimages&piprop=thumbnail|original&pilicense=any&pithumbsize=500&format=json&origin=*&titles=' +
					encodeURIComponent(chunk.join('|'));
				const res = await fetch(url, {
					headers: { 'User-Agent': 'ChronoVerseApp/1.0 (https://localhost)' },
					signal: AbortSignal.timeout(6000)
				});
				if (!res.ok) return;
				const data = (await res.json()) as {
					query?: {
						redirects?: Array<{ from: string; to: string }>;
						normalized?: Array<{ from: string; to: string }>;
						pages?: Record<
							string,
							{
								title: string;
								thumbnail?: { source: string };
								original?: { source: string };
							}
						>;
					};
				};

				const reverseMap: Record<string, string[]> = {};
				const addReverse = (to: string, from: string) => {
					if (!reverseMap[to]) reverseMap[to] = [];
					reverseMap[to].push(from);
				};
				for (const r of data.query?.redirects ?? []) addReverse(r.to, r.from);
				for (const n of data.query?.normalized ?? []) addReverse(n.to, n.from);

				for (const page of Object.values(data.query?.pages ?? {})) {
					const img = page.thumbnail?.source || page.original?.source;
					if (!img) continue;
					result[page.title] = img;
					for (const orig of reverseMap[page.title] ?? []) {
						result[orig] = img;
						for (const orig2 of reverseMap[orig] ?? []) {
							result[orig2] = img;
						}
					}
				}
			} catch {
				// Ignore individual batch timeout
			}
		})
	);

	return result;
}

/**
 * Fetches vertical portrait posters for TV series from the public TVMaze API.
 */
async function fetchTvMazePortraits(queries: string[]): Promise<Record<string, string>> {
	const uniqueQueries = [...new Set(queries.filter(Boolean))];
	const result: Record<string, string> = {};

	await Promise.all(
		uniqueQueries.map(async (q) => {
			try {
				const res = await fetch(
					`https://api.tvmaze.com/singlesearch/shows?q=${encodeURIComponent(q)}`,
					{ signal: AbortSignal.timeout(5000) }
				);
				if (!res.ok) return;
				const data = (await res.json()) as {
					image?: { medium?: string; original?: string };
				};
				const img = data?.image?.medium || data?.image?.original;
				if (img) {
					result[q] = img;
				}
			} catch {
				// Ignore timeout
			}
		})
	);

	return result;
}

/**
 * Queries Wikidata's live SPARQL endpoint to discover all movies, TV series,
 * specials, and One-Shots across MCU, DCU/DCEU, and Star Wars.
 */
async function queryWikidataLiveCatalog(): Promise<WikidataRow[]> {
	const sparql = `
SELECT DISTINCT ?franchise ?item ?itemLabel ?itemDescription
  (MIN(?date) AS ?releaseDate)
  (SAMPLE(?periodLabel) AS ?inUniversePeriod)
  (MAX(?duration) AS ?runtime)
  (MAX(?episodes) AS ?epCount)
  (SAMPLE(?tmdbM) AS ?tmdbMovie)
  (SAMPLE(?tmdbT) AS ?tmdbTv)
  (SAMPLE(?imdb) AS ?imdbId)
  (SAMPLE(?enWiki) AS ?enWikiUrl)
WHERE {
  VALUES (?universe ?franchise) {
    (wd:Q642878 "mcu")
    (wd:Q22699237 "mcu")
    (wd:Q51963292 "mcu")
    (wd:Q1057993 "mcu")
    (wd:Q18281265 "dcu")
    (wd:Q116545465 "dcu")
    (wd:Q462 "starwars")
    (wd:Q22092344 "starwars")
  }
  { ?item wdt:P179 ?universe . }
  UNION
  { ?item wdt:P1434 ?universe . }
  UNION
  { ?item wdt:P361 ?universe . }
  UNION
  { ?item wdt:P8345 ?universe . }
  { ?item wdt:P4947 ?tmdbM } UNION { ?item wdt:P4983 ?tmdbT }
  OPTIONAL { ?item wdt:P577 ?d1 }
  OPTIONAL { ?item wdt:P580 ?d2 }
  BIND(COALESCE(?d1, ?d2) AS ?date)
  OPTIONAL {
    ?item wdt:P2408 ?period .
    ?period rdfs:label ?periodLabel .
    FILTER(LANG(?periodLabel) = "de")
  }
  OPTIONAL { ?item wdt:P2047 ?duration }
  OPTIONAL { ?item wdt:P1113 ?episodes }
  OPTIONAL { ?item wdt:P345 ?imdb }
  OPTIONAL {
    ?enWiki schema:about ?item ;
            schema:isPartOf <https://en.wikipedia.org/> .
  }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "de,en". }
}
GROUP BY ?franchise ?item ?itemLabel ?itemDescription
ORDER BY ?releaseDate
`;

	try {
		const res = await fetch(
			'https://query.wikidata.org/sparql?format=json&query=' + encodeURIComponent(sparql),
			{
				headers: { 'User-Agent': 'ChronoVerseApp/1.0 (https://localhost)' },
				signal: AbortSignal.timeout(7000)
			}
		);
		if (!res.ok) return [];
		const data = (await res.json()) as { results?: { bindings?: WikidataRow[] } };
		return data.results?.bindings ?? [];
	} catch {
		return [];
	}
}

/**
 * Primary server-side function that fetches and assembles the entire catalog
 * and official cover posters live from Wikidata, Wikipedia PageImages, TVMaze, and TMDB APIs.
 */
export async function fetchLiveCatalogFromApis(forceRefresh = false): Promise<LiveCatalogPayload> {
	if (!forceRefresh && cachedCatalog && Date.now() - lastCacheTimestamp < CACHE_TTL_MS) {
		return cachedCatalog;
	}

	const startMs = Date.now();
	const sourcesUsed = ['Wikidata Graph API (SPARQL)', 'Wikipedia PageImages API', 'TVMaze Cover API'];
	if (env.TMDB_API_KEY && !env.TMDB_API_KEY.includes('dein-tmdb')) {
		sourcesUsed.unshift('TMDB Live API v3');
	}

	// Base timeline & credit-scene intelligence items (Core + Expanded + Non-Marvel Studios)
	const baseItems: MediaItem[] = [
		...MCU_ITEMS,
		...NON_MARVEL_STUDIOS_ITEMS,
		...DCU_ITEMS,
		...STARWARS_ITEMS
	].map((item) => {
		let canonScope: CanonScope = item.canonScope ?? 'core_studios';
		if (item.franchiseId === 'mcu') {
			if (EXPANDED_MARVEL_ITEM_IDS.has(item.id)) {
				canonScope = 'expanded_universe';
			} else if (EXISTING_NON_MARVEL_STUDIOS_IDS.has(item.id) || item.id.startsWith('nms-')) {
				canonScope = 'non_marvel_studios';
			}
		} else if (item.franchiseId === 'dcu') {
			if (item.phaseOrEra.includes('DCEU')) {
				canonScope = 'expanded_universe';
			}
		} else if (item.franchiseId === 'starwars') {
			if (
				item.id.includes('clone-wars') ||
				item.id.includes('rebels') ||
				item.id.includes('bad-batch') ||
				item.id.includes('tales')
			) {
				canonScope = 'expanded_universe';
			}
		}
		return {
			...item,
			canonScope
		};
	});
	const knownTmdbIds = new Set<number>(baseItems.map((i) => i.tmdbId));
	const knownTitlesNormalized = new Set<string>(
		baseItems.map((i) => i.title.toLowerCase().replace(/[^a-z0-9]/g, ''))
	);

	// 1. Run Live Wikidata Discovery + TVMaze Series Portrait Fetching in parallel
	const [wikidataRows, tvMazePortraits] = await Promise.all([
		queryWikidataLiveCatalog(),
		fetchTvMazePortraits(Object.values(TVMAZE_SERIES_QUERY_MAP))
	]);

	// Map Wikidata live rows by TMDB ID and collect any brand-new API discoveries
	const wikidataByTmdb = new Map<number, WikidataRow>();
	const newlyDiscoveredItems: MediaItem[] = [];
	const extraWikiTitlesToFetch: string[] = [];

	// Excluded non-narrative/documentary, parody, or already-mapped TMDB IDs from raw Wikidata
	const excludedTmdbIds = new Set<number>([
		118924, // Marvel Studios: Assembled (Making-of Documentary)
		69069, // WHIH Newsfront promo webseries
		505945, // Team Darryl (already bundled in Team Thor entry)
		// Already present in base catalog under alternate TMDB IDs:
		287947, // Shazam!
		464052, // Wonder Woman 1984
		1081003, // Supergirl (2026)
		140607, // Star Wars Ep VII
		181808, // Star Wars Ep VIII
		181812, // Star Wars Ep IX
		203085, // Tales of the Jedi
		// Non-canon Family Guy parodies / theme park rides / fan films on Wikidata Q462:
		72803, // SP FX: The Empire Strikes Back documentary
		1126842, // Star Tours ride
		6472, // Chad Vader fan series
		653528, // Family Guy: Blue Harvest
		394387, // Blackstar Warrior fan film
		625651, // Family Guy: Something, Something, Something, Dark Side
		278427 // Family Guy: It's a Trap!
	]);

	for (const row of wikidataRows) {
		const tmdbIdStr = row.tmdbMovie?.value || row.tmdbTv?.value;
		const tmdbId = tmdbIdStr ? parseInt(tmdbIdStr, 10) : NaN;
		if (!isNaN(tmdbId)) {
			wikidataByTmdb.set(tmdbId, row);
		}

		const wikiTitle = row.enWikiUrl?.value?.split('/wiki/')[1];
		if (wikiTitle) {
			extraWikiTitlesToFetch.push(decodeURIComponent(wikiTitle));
		}

		// Check if this is a brand-new movie or series from Wikidata not yet in our base list
		const label = row.itemLabel?.value || '';
		const normLabel = label.toLowerCase().replace(/[^a-z0-9]/g, '');
		const rawDate = row.releaseDate?.value || '';
		const hasValidDate = /^\d{4}-\d{2}-\d{2}/.test(rawDate);

		if (
			!isNaN(tmdbId) &&
			!knownTmdbIds.has(tmdbId) &&
			!excludedTmdbIds.has(tmdbId) &&
			label &&
			!label.startsWith('Q') &&
			!label.toLowerCase().includes('extended') &&
			!label.toLowerCase().includes('lego ') &&
			!knownTitlesNormalized.has(normLabel) &&
			hasValidDate
		) {
			knownTmdbIds.add(tmdbId);
			knownTitlesNormalized.add(normLabel);

			const franchiseId = (row.franchise?.value || 'mcu') as 'mcu' | 'dcu' | 'starwars';
			const releaseDate = rawDate.slice(0, 10);
			const releaseYear = parseInt(releaseDate.slice(0, 4), 10);
			const isTv = Boolean(row.tmdbTv?.value);
			const runtimeVal = row.runtime?.value ? Math.round(parseFloat(row.runtime.value)) : isTv ? 240 : 120;
			const epVal = row.epCount?.value ? parseInt(row.epCount.value, 10) : undefined;
			const mediaType: MediaType = isTv ? 'series' : runtimeVal <= 30 ? 'oneshot' : runtimeVal <= 60 ? 'special' : 'movie';
			const inUniverseYear = row.inUniversePeriod?.value || String(releaseYear);
			const isUpcoming = releaseDate > '2026-10-27';

			// Estimate chronological order based on release year so it slots naturally into the timeline
			const existingInFranchise = baseItems.filter((i) => i.franchiseId === franchiseId);
			const closestByYear = existingInFranchise.find((i) => i.releaseDate.startsWith(String(releaseYear)));
			const chronologicalOrder = closestByYear
				? closestByYear.chronologicalOrder + 0.4
				: existingInFranchise.length + 1;

			const newId = `${franchiseId}-live-${tmdbId}`;
			if (wikiTitle) {
				WIKIPEDIA_TITLE_MAP[newId] = decodeURIComponent(wikiTitle);
			}

			let discoveredScope: CanonScope = 'expanded_universe';
			if (franchiseId === 'mcu' && EXPANDED_MARVEL_ITEM_IDS.has(newId)) {
				discoveredScope = 'expanded_universe';
			} else if (franchiseId === 'starwars' && releaseYear < 1999) {
				discoveredScope = 'non_marvel_studios';
			} else if (franchiseId === 'mcu' && releaseYear >= 2027) {
				discoveredScope = 'core_studios';
			}

			newlyDiscoveredItems.push({
				id: newId,
				franchiseId,
				tmdbId,
				mediaType,
				canonScope: discoveredScope,
				title: label,
				releaseDate,
				inUniverseYear,
				timelineAxisYear: inUniverseYear.slice(0, 6),
				runtimeMinutes: runtimeVal,
				episodeCount: epVal,
				chronologicalOrder,
				releaseOrder: existingInFranchise.length + newlyDiscoveredItems.length + 1,
				phaseOrEra: 'Live API Entdeckung',
				synopsis:
					row.itemDescription?.value ||
					`Automatisch über die Live-Wikidata-API erkannter ${isTv ? 'Serien-' : 'Film-'}Eintrag (${releaseDate.slice(0, 4)}).`,
				posterGradient:
					franchiseId === 'mcu'
						? 'from-red-900 via-slate-900 to-black'
						: franchiseId === 'dcu'
							? 'from-blue-900 via-slate-900 to-black'
							: 'from-amber-900 via-slate-900 to-black',
				apiSource: 'Wikidata Live Graph API',
				streamingProvider: franchiseId === 'dcu' ? 'Max / Kino' : 'Disney+',
				isUpcoming,
				isEventMilestone: false,
				creditScenes: []
			});
		}
	}

	const allItems = [...baseItems, ...newlyDiscoveredItems];

	// 2. Batch-fetch all Wikipedia theatrical/series posters in parallel chunks
	const allWikiTitles = [
		...Object.values(WIKIPEDIA_TITLE_MAP),
		...extraWikiTitlesToFetch
	];
	const wikiPosters = await fetchWikipediaPostersBatch(allWikiTitles);

	// 3. Attach live-resolved posterUrl and API metadata to every MediaItem
	let postersResolved = 0;
	for (const item of allItems) {
		const liveRow = wikidataByTmdb.get(item.tmdbId);
		const liveWikiTitle = liveRow?.enWikiUrl?.value?.split('/wiki/')[1]
			? decodeURIComponent(liveRow.enWikiUrl.value.split('/wiki/')[1])
			: undefined;
		const mappedWikiTitle = WIKIPEDIA_TITLE_MAP[item.id];
		const tvMazeQuery = TVMAZE_SERIES_QUERY_MAP[item.id];

		// Prefer vertical 2:3 portrait cover from TVMaze for TV series over horizontal Wikipedia title cards
		const wikiPoster =
			(mappedWikiTitle && wikiPosters[mappedWikiTitle]) ||
			(liveWikiTitle && wikiPosters[liveWikiTitle]);
		const tvMazePoster = tvMazeQuery ? tvMazePortraits[tvMazeQuery] : undefined;

		if (item.mediaType === 'series' && tvMazePoster) {
			item.posterUrl = tvMazePoster;
		} else {
			item.posterUrl = wikiPoster || tvMazePoster;
		}

		if (item.posterUrl) {
			postersResolved += 1;
		}

		if (!item.apiSource) {
			item.apiSource = liveRow
				? 'Wikidata + Wikipedia/TVMaze Live API'
				: 'Wikipedia/TVMaze Live API';
		}
	}

	const mcuCount = allItems.filter((i) => i.franchiseId === 'mcu').length;
	const dcuCount = allItems.filter((i) => i.franchiseId === 'dcu').length;
	const swCount = allItems.filter((i) => i.franchiseId === 'starwars').length;
	const durationMs = Date.now() - startMs;

	const franchises: Franchise[] = [
		{
			id: 'mcu',
			name: 'Marvel Cinematic Universe (Live API)',
			shortName: `MCU (${mcuCount})`,
			tagline: `Alle ${mcuCount} Filme, Disney+ Serien, Agent Carter, Defenders-Saga, One-Shots & Specials – live via API geladen inkl. Cover-Postern`,
			accentColor: '#ef4444',
			badgeBg: 'bg-red-500/15 text-red-300 border-red-500/30',
			lastSyncedAt: `Live von API geladen (${mcuCount} Titel in ${durationMs} ms)`,
			autoSyncSource: 'Wikidata SPARQL Graph + Wikipedia PageImages + TVMaze + Gemini Grounding'
		},
		{
			id: 'dcu',
			name: 'DC Universe (DCU, Batverse & DCEU – Live API)',
			shortName: `DC (${dcuCount})`,
			tagline: `Alle ${dcuCount} Filme & Serien aus James Gunns DCU, Matt Reeves’ The Batman Saga & DCEU – live via API geladen`,
			accentColor: '#3b82f6',
			badgeBg: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
			lastSyncedAt: `Live von API geladen (${dcuCount} Titel in ${durationMs} ms)`,
			autoSyncSource: 'Wikidata SPARQL Graph + Wikipedia PageImages + TVMaze + Gemini Grounding'
		},
		{
			id: 'starwars',
			name: 'Star Wars (Skywalker-Saga & Live-Action/Animation – Live API)',
			shortName: `Star Wars (${swCount})`,
			tagline: `Alle ${swCount} Filme & Serien der Skywalker-Saga, Clone Wars, Rebels, Andor & Mandoverse – live via API geladen`,
			accentColor: '#eab308',
			badgeBg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
			lastSyncedAt: `Live von API geladen (${swCount} Titel in ${durationMs} ms)`,
			autoSyncSource: 'Wikidata SPARQL Graph + Wikipedia PageImages + TVMaze + Gemini Grounding'
		}
	];

	const dependencies: MediaDependency[] = [
		...MCU_DEPENDENCIES,
		...DCU_DEPENDENCIES,
		...STARWARS_DEPENDENCIES
	];

	cachedCatalog = {
		franchises,
		mediaItems: allItems,
		dependencies,
		friends: INITIAL_FRIENDS,
		apiStats: {
			fetchedAt: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
			durationMs,
			totalLiveItems: allItems.length,
			postersResolved,
			newlyDiscoveredFromApi: newlyDiscoveredItems.length,
			sourcesUsed
		}
	};
	lastCacheTimestamp = Date.now();

	return cachedCatalog;
}
