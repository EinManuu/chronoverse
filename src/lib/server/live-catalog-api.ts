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

	const chunkSize = 18;
	for (let i = 0; i < uniqueQueries.length; i += chunkSize) {
		const chunk = uniqueQueries.slice(i, i + chunkSize);
		await Promise.all(
			chunk.map(async (q) => {
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
		if (i + chunkSize < uniqueQueries.length) {
			await new Promise((resolve) => setTimeout(resolve, 250));
		}
	}

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

	// Canonical In-Universe Chronological Timeline Map (Year.SubOrder) across all scopes
	const CANONICAL_CHRONO_KEY_MAP: Record<string, number> = {
		// --- MARVEL: Antike & 1940er ---
		'mcu-eyes-of-wakanda': -1260,
		'nms-thor-tales-of-asgard-2011': 965,
		'mcu-cap-first-avenger': 1942.1,
		'nms-captain-america-1944-serial': 1944.1,
		'mcu-agent-carter-s1': 1946.1,
		'mcu-agent-carter-s2': 1947.1,
		'mcu-oneshot-agent-carter': 1947.2,

		// --- MARVEL: 1960er ---
		'nms-xmen-first-class': 1962.1,
		'mcu-fantastic-four': 1965.1,
		'nms-marvel-super-heroes-1966': 1966.1,
		'nms-spiderman-1967-series': 1967.1,
		'nms-fantastic-four-1967-hb': 1967.2,

		// --- MARVEL: 1970er ---
		'nms-xmen-days-of-future-past': 1973.1,
		'nms-spiderman-1977-movie': 1977.1,
		'nms-amazing-spiderman-1977-cbs': 1977.2,
		'nms-incredible-hulk-1977-pilot': 1977.3,
		'nms-incredible-hulk-1977-series': 1978.1,
		'nms-spiderman-strikes-back-1978': 1978.2,
		'nms-japanese-spiderman-1978': 1978.3,
		'nms-dr-strange-1978-tv-movie': 1978.4,
		'nms-new-fantastic-four-1978': 1978.5,
		'nms-incredible-hulk-married-1978': 1978.6,
		'nms-captain-america-1979-reb-brown': 1979.1,
		'nms-xmen-origins-wolverine': 1979.2,
		'nms-spiderman-dragons-challenge-1979': 1979.3,
		'nms-spider-woman-1979-animated': 1979.4,
		'nms-captain-america-2-death-too-soon-1979': 1979.5,

		// --- MARVEL: 1980er ---
		'nms-spiderman-1981-solo': 1981.1,
		'nms-spiderman-amazing-friends-1981': 1981.2,
		'nms-incredible-hulk-1982-animated': 1982.1,
		'nms-xmen-apocalypse': 1983.1,
		'nms-howard-the-duck': 1986.1,
		'nms-incredible-hulk-returns-1988': 1988.1,
		'nms-trial-of-incredible-hulk-1989': 1989.1,
		'nms-punisher-1989-lundgren': 1989.2,

		// --- MARVEL: 1990er ---
		'nms-death-of-incredible-hulk-1990': 1990.1,
		'nms-captain-america-1990': 1990.2,
		'nms-power-pack-1991-special': 1991.1,
		'nms-xmen-dark-phoenix': 1992.1,
		'nms-xmen-tas-90s': 1992.2,
		'nms-fantastic-four-1994-corman': 1994.1,
		'nms-iron-man-tas-1994': 1994.2,
		'nms-fantastic-four-tas-1994': 1994.3,
		'nms-spiderman-tas-90s': 1994.4,
		'mcu-captain-marvel': 1995.1,
		'nms-generation-x-1996': 1996.1,
		'nms-incredible-hulk-tas-1996': 1996.2,
		'mcu-xmen-97': 1997.1,
		'nms-nightman-1997': 1997.2,
		'nms-silver-surfer-tas-1998': 1998.1,
		'nms-nick-fury-hasselhoff-1998': 1998.2,
		'nms-blade-1': 1998.3,
		'nms-spiderman-unlimited-1999': 1999.1,
		'nms-avengers-united-they-stand-1999': 1999.2,

		// --- MARVEL: 2000–2007 ---
		'nms-xmen-2000': 2000.1,
		'nms-xmen-evolution': 2000.2,
		'nms-mutant-x-2001': 2001.1,
		'nms-blade-2': 2002.1,
		'nms-spiderman-raimi-1': 2002.2,
		'nms-daredevil-2003': 2003.1,
		'nms-madame-web': 2003.2,
		'nms-x2-united': 2003.3,
		'nms-hulk-2003': 2003.4,
		'nms-spiderman-tnas-mtv-2003': 2003.5,
		'nms-punisher-2004': 2004.1,
		'nms-spiderman-raimi-2': 2004.2,
		'nms-blade-trinity': 2004.3,
		'nms-elektra-2005': 2005.1,
		'nms-man-thing-2005': 2005.2,
		'nms-fantastic-four-2005': 2005.3,
		'nms-spiderman-raimi-3': 2005.4,
		'nms-ultimate-avengers-1-2006': 2006.1,
		'nms-xmen-last-stand': 2006.2,
		'nms-blade-the-series': 2006.3,
		'nms-ultimate-avengers-2-2006': 2006.4,
		'nms-fantastic-four-wgh-2006': 2006.5,
		'nms-invincible-iron-man-2007': 2007.1,
		'nms-ghost-rider-1': 2007.2,
		'nms-fantastic-four-silver-surfer': 2007.3,
		'nms-doctor-strange-sorcerer-supreme-2007': 2007.4,

		// --- MARVEL: 2008–2011 (Phase 1 Start) ---
		'mcu-iron-man': 2008.1,
		'nms-spectacular-spiderman': 2008.2,
		'nms-next-avengers-2008': 2008.3,
		'nms-punisher-war-zone': 2008.4,
		'nms-wolverine-and-the-xmen-2009': 2009.1,
		'nms-hulk-vs-2009': 2009.2,
		'nms-iron-man-armored-adventures': 2009.3,
		'nms-super-hero-squad-show': 2009.4,
		'mcu-iron-man-2': 2010.05,
		'mcu-incredible-hulk': 2010.1,
		'mcu-oneshot-funny-thing': 2010.15,
		'mcu-thor': 2010.2,
		'mcu-oneshot-consultant': 2010.25,
		'nms-black-panther-2010-animated': 2010.3,
		'nms-planet-hulk-2010': 2010.4,
		'nms-avengers-emh-2010': 2010.5,
		'nms-marvel-anime-iron-man-2010': 2010.6,
		'nms-marvel-anime-wolverine-2011': 2011.1,
		'nms-marvel-anime-xmen-2011': 2011.2,
		'nms-marvel-anime-blade-2011': 2011.3,
		'nms-ghost-rider-2': 2011.4,

		// --- MARVEL: 2012–2015 (Phase 1 Finale & Phase 2) ---
		'nms-ultimate-spiderman-series': 2012.1,
		'mcu-avengers-2012': 2012.2,
		'mcu-oneshot-item-47': 2012.3,
		'nms-amazing-spiderman-1': 2012.4,
		'mcu-iron-man-3': 2013.1,
		'nms-iron-man-rise-of-technovore-2013': 2013.2,
		'nms-avengers-assemble-series': 2013.3,
		'nms-the-wolverine-2013': 2013.4,
		'nms-hulk-agents-of-smash': 2013.5,
		'mcu-agents-of-shield': 2013.6,
		'mcu-thor-dark-world': 2013.7,
		'mcu-oneshot-all-hail-the-king': 2013.8,
		'nms-avengers-confidential-bw-punisher-2014': 2014.1,
		'mcu-cap-winter-soldier': 2014.2,
		'nms-amazing-spiderman-2': 2014.3,
		'mcu-gotg-1': 2014.4,
		'mcu-i-am-groot': 2014.5,
		'mcu-gotg-2': 2014.6,
		'mcu-daredevil-s1-s3': 2015.1,
		'mcu-jessica-jones-s1-s3': 2015.2,
		'mcu-avengers-age-of-ultron': 2015.3,
		'mcu-ant-man': 2015.4,
		'nms-fantastic-four-2015': 2015.5,
		'nms-gotg-animated-series': 2015.6,

		// --- MARVEL: 2016–2019 (Phase 3) ---
		'mcu-luke-cage-s1-s2': 2016.05,
		'nms-deadpool-1': 2016.1,
		'mcu-iron-fist-s1-s2': 2016.15,
		'mcu-the-defenders': 2016.2,
		'mcu-cap-civil-war': 2016.3,
		'mcu-oneshot-team-thor': 2016.35,
		'mcu-black-widow': 2016.4,
		'mcu-black-panther': 2016.5,
		'mcu-spider-man-homecoming': 2016.6,
		'mcu-friendly-neighborhood-spiderman': 2016.65,
		'mcu-the-punisher-s1-s2': 2016.7,
		'mcu-doctor-strange-1': 2016.8,
		'nms-legion-s1-s3': 2017.1,
		'nms-marvel-future-avengers': 2017.2,
		'nms-marvels-spiderman-2017': 2017.3,
		'mcu-inhumans': 2017.4,
		'nms-the-gifted-s1-s2': 2017.5,
		'mcu-runaways-s1-s3': 2017.6,
		'mcu-cloak-and-dagger': 2017.7,
		'mcu-thor-ragnarok': 2017.8,
		'nms-deadpool-2': 2018.1,
		'mcu-ant-man-wasp': 2018.2,
		'nms-marvel-rising-secret-warriors-2018': 2018.3,
		'nms-venom-1': 2018.4,
		'nms-spiderverse-1': 2018.5,
		'mcu-avengers-infinity-war': 2018.8,
		'mcu-avengers-endgame': 2019.1,

		// --- MARVEL: 2020–2029 (Multiverse Saga) ---
		'mcu-live-88987': 2020.1,
		'nms-new-mutants': 2020.2,
		'mcu-loki-s1': 2021.1,
		'mcu-what-if-s1-s3': 2021.2,
		'nms-modok-s1': 2021.3,
		'nms-spidey-amazing-friends-2021': 2021.4,
		'nms-hit-monkey-s1-s2': 2021.5,
		'nms-morbius': 2022.1,
		'nms-moon-girl-devil-dinosaur': 2023.1,
		'nms-spiderverse-2': 2023.2,
		'mcu-wandavision': 2023.5,
		'mcu-shang-chi': 2024.1,
		'mcu-falcon-winter-soldier': 2024.2,
		'mcu-oneshot-peters-todo-list': 2024.3,
		'mcu-spider-man-far-from-home': 2024.35,
		'mcu-eternals': 2024.4,
		'nms-venom-2': 2024.45,
		'mcu-spider-man-no-way-home': 2024.5,
		'mcu-dr-strange-mom': 2024.6,
		'mcu-hawkeye': 2024.7,
		'mcu-deadpool-wolverine': 2024.8,
		'nms-venom-3': 2024.85,
		'nms-kraven-the-hunter': 2024.9,
		'mcu-moon-knight': 2025.1,
		'mcu-black-panther-wakanda-forever': 2025.2,
		'mcu-echo': 2025.3,
		'mcu-she-hulk': 2025.4,
		'mcu-ms-marvel': 2025.5,
		'mcu-thor-love-and-thunder': 2025.6,
		'mcu-werewolf-by-night': 2025.7,
		'mcu-marvel-zombies': 2025.75,
		'mcu-gotg-holiday-special': 2025.8,
		'mcu-ant-man-quantumania': 2026.1,
		'mcu-gotg-3': 2026.2,
		'mcu-secret-invasion': 2026.3,
		'mcu-loki-s2': 2026.35,
		'mcu-the-marvels': 2026.4,
		'mcu-agatha-all-along': 2026.5,
		'mcu-ironheart': 2026.55,
		'mcu-wonder-man': 2026.6,
		'mcu-daredevil-born-again-s1': 2026.7,
		'mcu-cap-brave-new-world': 2026.8,
		'mcu-thunderbolts': 2027.1,
		'mcu-daredevil-born-again-s2': 2027.2,
		'mcu-punisher-special': 2027.3,
		'mcu-spider-man-brand-new-day': 2027.4,
		'mcu-vision-quest': 2027.5,
		'mcu-avengers-doomsday': 2027.6,
		'mcu-avengers-secret-wars': 2027.7,
		'mcu-live-1293690': 2028.1,
		'mcu-live-1386618': 2028.2,
		'nms-logan': 2029.1,

		// --- DC UNIVERSE ---
		'dcu-wonder-woman-1918': 1918.1,
		'dcu-man-of-steel': 2013.1,
		'dcu-bvs': 2015.1,
		'dcu-live-297761': 2016.1,
		'dcu-live-141052': 2017.1,
		'dcu-zack-snyders-justice-league': 2017.2,
		'dcu-aquaman-1': 2018.1,
		'dcu-live-495764': 2020.1,
		'dcu-the-suicide-squad-2021': 2021.1,
		'dcu-peacemaker-s1': 2022.1,
		'dcu-live-436270': 2022.2,
		'dcu-the-batman': 2022.3,
		'dcu-the-penguin': 2022.4,
		'dcu-live-594767': 2023.1,
		'dcu-the-flash': 2023.2,
		'dcu-blue-beetle': 2023.3,
		'dcu-live-572802': 2023.4,
		'dcu-creature-commandos-s1': 2024.1,
		'dcu-superman-2025': 2025.1,
		'dcu-peacemaker-s2': 2025.2,
		'dcu-supergirl-2026': 2026.1,
		'dcu-clayface-2026': 2026.2,
		'dcu-lanterns': 2026.3,
		'dcu-the-batman-part-ii': 2027.1,

		// --- STAR WARS (VSY = negative, NSY = positive) ---
		'starwars-live-202998': -232.0,
		'sw-acolyte': -132.0,
		'sw-ep1-phantom-menace': -32.0,
		'sw-ep2-attack-of-clones': -22.2,
		'starwars-live-12180': -22.1,
		'starwars-live-3122': -21.5,
		'sw-clone-wars': -21.0,
		'starwars-live-251091': -20.0,
		'sw-ep3-revenge-of-sith': -19.0,
		'sw-bad-batch': -18.5,
		'starwars-live-289219': -18.0,
		'starwars-live-63722': -15.2,
		'starwars-live-25': -15.1,
		'sw-solo': -10.0,
		'starwars-live-288055': -9.5,
		'sw-obi-wan-kenobi': -9.0,
		'sw-andor-s1-s2': -5.0,
		'starwars-live-287663': -4.5,
		'sw-rebels': -4.0,
		'sw-rogue-one': -0.1,
		'sw-ep4-new-hope': 0.0,
		'starwars-live-74849': 1.0,
		'sw-ep5-empire': 3.0,
		'starwars-live-1884': 3.2,
		'starwars-live-10372': 3.3,
		'starwars-live-3478': 3.5,
		'sw-ep6-return-of-jedi': 4.0,
		'sw-mandalorian': 9.1,
		'sw-book-of-boba-fett': 9.2,
		'sw-ahsoka-s1': 10.1,
		'sw-skeleton-crew': 10.2,
		'sw-mando-grogu-movie': 11.1,
		'sw-ahsoka-s2': 11.2,
		'starwars-live-71412': 30.1,
		'starwars-live-85536': 30.2,
		'starwars-live-79093': 34.0,
		'starwars-live-1417668': 50.0
	};

	const LIVE_ITEM_ERA_OVERRIDES: Record<string, { inUniverseYear: string; timelineAxisYear: string }> = {
		'starwars-live-202998': { inUniverseYear: '232 VSY (Hohe Republik)', timelineAxisYear: '232 VSY' },
		'starwars-live-12180': { inUniverseYear: '22 VSY (Klonkriege)', timelineAxisYear: '22 VSY' },
		'starwars-live-3122': { inUniverseYear: '22–19 VSY (Legends)', timelineAxisYear: '21 VSY*' },
		'starwars-live-251091': { inUniverseYear: '20 VSY – 9 NSY', timelineAxisYear: '20 VSY' },
		'starwars-live-289219': { inUniverseYear: '18 VSY', timelineAxisYear: '18 VSY' },
		'starwars-live-63722': { inUniverseYear: '15 VSY (Legends)', timelineAxisYear: '15 VSY' },
		'starwars-live-25': { inUniverseYear: '15 VSY (Legends)', timelineAxisYear: '15 VSY*' },
		'starwars-live-288055': { inUniverseYear: 'ca. 10 VSY', timelineAxisYear: '10 VSY' },
		'starwars-live-287663': { inUniverseYear: '5 VSY', timelineAxisYear: '5 VSY' },
		'starwars-live-74849': { inUniverseYear: '1 NSY (Legends)', timelineAxisYear: '1 NSY*' },
		'starwars-live-1884': { inUniverseYear: '3 NSY (Legends)', timelineAxisYear: '3 NSY*' },
		'starwars-live-10372': { inUniverseYear: '3 NSY (Legends)', timelineAxisYear: '3 NSY*' },
		'starwars-live-3478': { inUniverseYear: '3.5 NSY (Legends)', timelineAxisYear: '3 NSY*' },
		'starwars-live-71412': { inUniverseYear: '32 VSY – 34 NSY (Anthologie)', timelineAxisYear: 'Multi' },
		'starwars-live-85536': { inUniverseYear: 'Klassische Saga (Anthologie)', timelineAxisYear: 'Multi' },
		'starwars-live-79093': { inUniverseYear: '34–35 NSY', timelineAxisYear: '34 NSY' },
		'starwars-live-1417668': { inUniverseYear: 'ca. 50 NSY', timelineAxisYear: '50 NSY' }
	};

	for (const item of allItems) {
		const override = LIVE_ITEM_ERA_OVERRIDES[item.id];
		if (override) {
			item.inUniverseYear = override.inUniverseYear;
			item.timelineAxisYear = override.timelineAxisYear;
		}
	}

	// Normalize chronologicalOrder and releaseOrder per franchise into clean sequential integers (1, 2, 3...)
	for (const fId of ['mcu', 'dcu', 'starwars'] as const) {
		const fItems = allItems.filter((i) => i.franchiseId === fId);

		// 1. Chronological Order (by CANONICAL_CHRONO_KEY_MAP, falling back to release year)
		fItems.sort((a, b) => {
			const keyA = CANONICAL_CHRONO_KEY_MAP[a.id] ?? parseInt(a.releaseDate.slice(0, 4), 10) + 0.99;
			const keyB = CANONICAL_CHRONO_KEY_MAP[b.id] ?? parseInt(b.releaseDate.slice(0, 4), 10) + 0.99;
			if (keyA !== keyB) return keyA - keyB;
			return a.releaseDate.localeCompare(b.releaseDate);
		});
		fItems.forEach((item, idx) => {
			item.chronologicalOrder = idx + 1;
		});

		// 2. Release Order (strictly by releaseDate YYYY-MM-DD, with chronologicalOrder as tie-breaker)
		fItems.sort((a, b) => {
			const cmp = a.releaseDate.localeCompare(b.releaseDate);
			if (cmp !== 0) return cmp;
			return a.chronologicalOrder - b.chronologicalOrder;
		});
		fItems.forEach((item, idx) => {
			item.releaseOrder = idx + 1;
		});
	}

	// Sort allItems by chronologicalOrder by default
	allItems.sort((a, b) => a.chronologicalOrder - b.chronologicalOrder);

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
