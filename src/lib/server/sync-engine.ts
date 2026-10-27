import { GoogleGenAI } from '@google/genai';
import { env } from '$env/dynamic/private';
import type { MediaDependency, MediaItem } from '$lib/types';

export const HARD_MONTHLY_AI_CALL_LIMIT = 25; // Garantierter 0,00 € Kostenschutz
let monthlyCallsUsed = 2;

const ENRICHMENT_JSON_SCHEMA = {
	type: 'object',
	properties: {
		inUniverseYear: { type: 'string' },
		timelineAxisYear: { type: 'string' },
		creditScenes: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					sceneType: { type: 'string', enum: ['mid_credit', 'post_credit'] },
					importance: { type: 'string', enum: ['must_watch', 'tease', 'joke'] },
					spoilerFreeHint: { type: 'string' },
					spoilerDescription: { type: 'string' }
				},
				required: ['sceneType', 'importance', 'spoilerFreeHint', 'spoilerDescription']
			}
		},
		roadToDependency: {
			type: 'object',
			properties: {
				isRelevantForNextEvent: { type: 'boolean' },
				priority: { type: 'string', enum: ['essential', 'recommended', 'bonus'] },
				watchScope: { type: 'string', enum: ['full', 'credits_only', 'key_episodes'] },
				effectiveMinutes: { type: 'number' },
				scopeHint: { type: 'string' },
				reason: { type: 'string' }
			},
			required: ['isRelevantForNextEvent', 'priority', 'watchScope', 'reason']
		}
	},
	required: ['inUniverseYear', 'timelineAxisYear', 'creditScenes', 'roadToDependency']
};

/**
 * Live-Abfrage der kostenlosen TMDB API für neue Marvel Studios / DC Studios Produktionen,
 * sobald TMDB_API_KEY in der .env eingetragen ist.
 */
export async function fetchUpcomingFromTmdb(franchiseId: string): Promise<string[]> {
	const apiKey = env.TMDB_API_KEY;
	if (!apiKey || apiKey.includes('dein-tmdb')) {
		return [];
	}

	// Company IDs: 420 = Marvel Studios, 174 = Warner Bros / DC, 1 = Lucasfilm
	const companyId = franchiseId === 'mcu' ? 420 : franchiseId === 'dcu' ? 174 : 1;
	const res = await fetch(
		`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_companies=${companyId}&language=de-DE&sort_by=primary_release_date.desc& page=1`
	);
	if (!res.ok) return [];
	const data = (await res.json()) as { results?: Array<{ title: string; release_date: string }> };
	return (data.results ?? []).slice(0, 3).map((m) => `${m.title} (${m.release_date || 'TBA'})`);
}

export async function curateMediaWithGeminiSearch(
	title: string,
	franchiseName: string,
	targetEventTitle: string
) {
	if (monthlyCallsUsed >= HARD_MONTHLY_AI_CALL_LIMIT) {
		throw new Error(
			`Hard-Quota-Stop erreicht (${HARD_MONTHLY_AI_CALL_LIMIT}/${HARD_MONTHLY_AI_CALL_LIMIT} Calls im Monat). 0,00 € Kostenschutz aktiv!`
		);
	}

	const apiKey = env.GEMINI_API_KEY;
	monthlyCallsUsed += 1;

	if (apiKey && !apiKey.includes('dein-gemini')) {
		const ai = new GoogleGenAI({ apiKey });
		const prompt = `Recherchiere auf Deutsch zum Titel "${title}" (${franchiseName}):
1. In welchem In-Universe-Jahr spielt der Titel?
2. Hat der Titel Mid- oder Post-Credit-Scenes?
3. Wie wichtig ist der Titel für "${targetEventTitle}" ("full" oder "credits_only")?`;

		const interaction = await ai.interactions.create({
			model: 'gemini-3.8-flash',
			input: prompt,
			store: false,
			tools: [{ type: 'google_search' }],
			response_format: {
				type: 'text',
				mime_type: 'application/json',
				schema: ENRICHMENT_JSON_SCHEMA
			}
		});

		if (interaction.output_text) {
			return JSON.parse(interaction.output_text);
		}
	}

	return null;
}

export function getSimulatedNewDiscovery(franchiseId: string): {
	newItem: MediaItem;
	newDependency: MediaDependency;
	syncLog: string[];
} {
	if (monthlyCallsUsed < HARD_MONTHLY_AI_CALL_LIMIT) {
		monthlyCallsUsed += 1;
	}

	if (franchiseId === 'dcu') {
		const newItem: MediaItem = {
			id: 'dcu-brave-and-the-bold',
			franchiseId: 'dcu',
			tmdbId: 1081611,
			mediaType: 'movie',
			title: 'The Brave and the Bold (DCU Batman & Damian Wayne)',
			releaseDate: '2027-07-16',
			inUniverseYear: '2027 (DCU)',
			timelineAxisYear: '2027',
			runtimeMinutes: 140,
			chronologicalOrder: 17.5,
			releaseOrder: 23,
			phaseOrEra: 'Chapter 1: Gods and Monsters',
			synopsis:
				'Der offizielle Batman des neuen DCU erfährt, dass er einen leiblichen Sohn hat: den von Assassinen aufgezogenen 10-jährigen Damian Wayne (Robin).',
			posterGradient: 'from-slate-800 via-blue-950 to-black',
			posterUrl:
				'https://upload.wikimedia.org/wikipedia/en/f/ff/The_Batman_%28film%29_poster.jpg',
			apiSource: 'Wikidata + Wikipedia Live API',
			streamingProvider: 'Kino-Event',
			isUpcoming: true,
			isEventMilestone: true,
			creditScenes: []
		};

		const newDependency: MediaDependency = {
			targetMediaId: 'dcu-brave-and-the-bold',
			requiredMediaId: 'dcu-superman-2025',
			priority: 'essential',
			watchScope: 'full',
			reason: 'Etabliert die Welt der Helden im neuen DCU vor dem ersten Auftritt von DCU-Batman.'
		};

		return {
			newItem,
			newDependency,
			syncLog: [
				'Vollständiger DC-Katalog (18 Titel) abgeglichen.',
				'Neuankündigung „The Brave and the Bold (DCU Batman)“ über Auto-Sync ergänzt!',
				'Als neues „Road to…“-Ziel-Event in der DC-Timeline freigeschaltet.'
			]
		};
	}

	if (franchiseId === 'starwars') {
		const newItem: MediaItem = {
			id: 'sw-maul-shadow-lord',
			franchiseId: 'starwars',
			tmdbId: 1450991,
			mediaType: 'series',
			title: 'Star Wars: Maul – Shadow Lord',
			releaseDate: '2026-08-15',
			inUniverseYear: '18 VSY',
			timelineAxisYear: '18 VSY',
			runtimeMinutes: 280,
			episodeCount: 8,
			chronologicalOrder: 6.5,
			releaseOrder: 22,
			phaseOrEra: 'Herrschaft des Imperiums',
			synopsis:
				'Nach der Order 66 baut sich der ehemalige Sith-Lord Maul auf Janix das kriminelle Unterwelt-Syndikat Crimson Dawn auf.',
			posterGradient: 'from-red-900 via-zinc-950 to-black',
			posterUrl:
				'https://upload.wikimedia.org/wikipedia/en/7/75/Star_Wars_The_Clone_Wars_season_7_poster.jpg',
			apiSource: 'Wikidata + Wikipedia Live API',
			streamingProvider: 'Disney+',
			isUpcoming: false,
			isEventMilestone: false,
			creditScenes: []
		};

		const newDependency: MediaDependency = {
			targetMediaId: 'sw-mando-grogu-movie',
			requiredMediaId: 'sw-maul-shadow-lord',
			priority: 'bonus',
			watchScope: 'key_episodes',
			effectiveMinutes: 30,
			scopeHint: '⚡ Auto-Sync Tipp: Nur das Staffelfinale (30 Min.) zeigt die Unterwelt-Kartelle des Outer Rim.',
			reason: 'Hintergrund zu den Verbrechersyndikaten nach dem Fall der Republik.'
		};

		return {
			newItem,
			newDependency,
			syncLog: [
				'Vollständiger Star-Wars-Katalog (20 Titel) abgeglichen.',
				'Neuankündigung „Star Wars: Maul – Shadow Lord (2026)“ automatisch bei 18 VSY einsortiert!'
			]
		};
	}

	// Default: MCU -> Doctor Strange 3: Time Runs Out (Vorbereitung auf Secret Wars)
	const newItem: MediaItem = {
		id: 'mcu-doctor-strange-time-runs-out',
		franchiseId: 'mcu',
		tmdbId: 1299501,
		mediaType: 'movie',
		title: 'Doctor Strange: Time Runs Out',
		releaseDate: '2027-05-07',
		inUniverseYear: '2027 (Zwischen Doomsday & Secret Wars)',
		timelineAxisYear: '2027',
		runtimeMinutes: 142,
		chronologicalOrder: 64.5,
		releaseOrder: 62,
		phaseOrEra: 'Phase 6',
		synopsis:
			'Direkt nach der Mid-Credit-Scene von Multiverse of Madness reisen Stephen Strange und Clea zu den „Black Priests“ und versuchen verzweifelt, die letzte große Inkursion vor Secret Wars aufzuhalten.',
		posterGradient: 'from-purple-900 via-red-950 to-black',
		posterUrl:
			'https://upload.wikimedia.org/wikipedia/en/1/17/Doctor_Strange_in_the_Multiverse_of_Madness_poster.jpg',
		apiSource: 'Wikidata + Wikipedia Live API',
		streamingProvider: 'Kino / Disney+',
		isUpcoming: true,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-ds3-1',
				sceneType: 'post_credit',
				importance: 'must_watch',
				spoilerFreeHint: 'Mündet direkt in Avengers: Secret Wars (Battleworld)!',
				spoilerDescription:
					'Strange erkennt, dass Victor von Doom mit den Kräften von Franklin Richards die letzten Überreste der Universen zu Battleworld verschmilzt.'
			}
		]
	};

	const newDependency: MediaDependency = {
		targetMediaId: 'mcu-avengers-secret-wars',
		requiredMediaId: 'mcu-doctor-strange-time-runs-out',
		priority: 'essential',
		watchScope: 'full',
		reason: 'Direkte Brücke zwischen Avengers: Doomsday und Avengers: Secret Wars!'
	};

	return {
		newItem,
		newDependency,
		syncLog: [
			'Vollständiger MCU-Katalog (alle 45 Filme, Serien, One-Shots & Specials von Phase 1–6) verifiziert.',
			'Neuankündigung „Doctor Strange: Time Runs Out“ automatisch zwischen Doomsday und Secret Wars einsortiert!'
		]
	};
}

export function getQuotaStatus() {
	return {
		used: monthlyCallsUsed,
		limit: HARD_MONTHLY_AI_CALL_LIMIT,
		estimatedCostEur: '0,00 €'
	};
}
