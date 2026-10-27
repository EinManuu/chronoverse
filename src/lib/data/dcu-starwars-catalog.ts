import type { MediaDependency, MediaItem } from '$lib/types';

/**
 * Vollständige DC Timeline (DCEU / Snyderverse, Matt Reeves Batverse & James Gunns neues DCU Chapter 1)
 */
export const DCU_ITEMS: MediaItem[] = [
	// --- DCEU / SNYDERVERSE (Vorgeschichte zu Peacemaker & Blue Beetle) ---
	{
		id: 'dcu-wonder-woman-1918',
		franchiseId: 'dcu',
		tmdbId: 297762,
		mediaType: 'movie',
		title: 'Wonder Woman',
		releaseDate: '2017-06-02',
		inUniverseYear: '1918 (DCEU)',
		timelineAxisYear: '1918',
		runtimeMinutes: 141,
		chronologicalOrder: 1,
		releaseOrder: 4,
		phaseOrEra: 'DCEU (Vorgeschichte)',
		synopsis:
			'Amazonenprinzessin Diana verlässt Themyscira im Ersten Weltkrieg mit dem Piloten Steve Trevor, um den Kriegsgott Ares zu besiegen.',
		posterGradient: 'from-amber-800 via-red-950 to-slate-950',
		streamingProvider: 'WOW / Prime',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'dcu-man-of-steel',
		franchiseId: 'dcu',
		tmdbId: 49521,
		mediaType: 'movie',
		title: 'Man of Steel',
		releaseDate: '2013-06-14',
		inUniverseYear: '2013 (DCEU)',
		timelineAxisYear: '2013',
		runtimeMinutes: 143,
		chronologicalOrder: 2,
		releaseOrder: 1,
		phaseOrEra: 'DCEU (Snyderverse)',
		synopsis:
			'Der Start des alten DCEU: Clark Kent offenbart sich der Menschheit als Superman, als General Zod die Erde in ein neues Krypton verwandeln will.',
		posterGradient: 'from-blue-900 via-slate-900 to-zinc-950',
		streamingProvider: 'WOW / Prime',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'dcu-bvs',
		franchiseId: 'dcu',
		tmdbId: 209112,
		mediaType: 'movie',
		title: 'Batman v Superman: Dawn of Justice (Ultimate Edition)',
		releaseDate: '2016-03-25',
		inUniverseYear: '2015 (DCEU)',
		timelineAxisYear: '2015',
		runtimeMinutes: 182,
		chronologicalOrder: 3,
		releaseOrder: 2,
		phaseOrEra: 'DCEU (Snyderverse)',
		synopsis:
			'Nach der Zerstörung von Metropolis sieht Bruce Wayne in Superman eine existenzielle Gefahr – während Lex Luthor Doomsday erschafft.',
		posterGradient: 'from-zinc-800 via-red-950 to-black',
		streamingProvider: 'WOW / Prime',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'dcu-zack-snyders-justice-league',
		franchiseId: 'dcu',
		tmdbId: 791373,
		mediaType: 'movie',
		title: 'Zack Snyder’s Justice League',
		releaseDate: '2021-03-18',
		inUniverseYear: '2017 (DCEU)',
		timelineAxisYear: '2017',
		runtimeMinutes: 242,
		chronologicalOrder: 4,
		releaseOrder: 5,
		phaseOrEra: 'DCEU (Snyderverse)',
		synopsis:
			'Batman und Wonder Woman rekrutieren Flash, Aquaman und Cyborg, um Superman wiederzuerwecken und Steppenwolf sowie Darkseid aufzuhalten.',
		posterGradient: 'from-zinc-700 via-slate-900 to-black',
		streamingProvider: 'WOW / Max',
		isUpcoming: false,
		isEventMilestone: true,
		creditScenes: []
	},
	{
		id: 'dcu-aquaman-1',
		franchiseId: 'dcu',
		tmdbId: 297802,
		mediaType: 'movie',
		title: 'Aquaman',
		releaseDate: '2018-12-21',
		inUniverseYear: '2018 (DCEU)',
		timelineAxisYear: '2018',
		runtimeMinutes: 143,
		chronologicalOrder: 5,
		releaseOrder: 6,
		phaseOrEra: 'DCEU',
		synopsis:
			'Arthur Curry muss den legendären Dreizack von Atlan finden, um seinen Halbbruder König Orm und Black Manta zu besiegen.',
		posterGradient: 'from-teal-800 via-amber-900 to-slate-950',
		streamingProvider: 'WOW / Prime',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-aq1',
				sceneType: 'mid_credit',
				importance: 'tease',
				spoilerFreeHint: 'Black Manta wird gerettet und plant Rache für Teil 2.',
				spoilerDescription: 'Dr. Stephen Shin rettet den verletzten Black Manta auf hoher See.'
			}
		]
	},
	{
		id: 'dcu-the-suicide-squad-2021',
		franchiseId: 'dcu',
		tmdbId: 436969,
		mediaType: 'movie',
		title: 'The Suicide Squad (James Gunn)',
		releaseDate: '2021-08-06',
		inUniverseYear: '2021 (Übergang ins DCU)',
		timelineAxisYear: '2021',
		runtimeMinutes: 132,
		chronologicalOrder: 6,
		releaseOrder: 10,
		phaseOrEra: 'DCU Prolog (Kanon-Brücke)',
		synopsis:
			'Amanda Waller schickt Bloodsport, Peacemaker, Harley Quinn, King Shark und Rick Flag Jr. nach Corto Maltese zum „Projekt Starfish“ (direkte Vorgeschichte zu Peacemaker & Creature Commandos!).',
		posterGradient: 'from-red-800 via-amber-900 to-slate-950',
		streamingProvider: 'WOW / Max',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-tss-1',
				sceneType: 'mid_credit',
				importance: 'joke',
				spoilerFreeHint: 'Weasel hat überlebt!',
				spoilerDescription: 'Weasel wacht am Strand von Corto Maltese hustend wieder auf.'
			},
			{
				id: 'cs-tss-2',
				sceneType: 'post_credit',
				importance: 'must_watch',
				spoilerFreeHint: 'PFLICHT-SZENE für die Serie Peacemaker!',
				spoilerDescription:
					'Christopher Smith (Peacemaker) liegt lebend im Krankenhaus – Wallers Team braucht ihn, um „die Welt zu retten“.'
			}
		]
	},
	{
		id: 'dcu-peacemaker-s1',
		franchiseId: 'dcu',
		tmdbId: 1104921,
		mediaType: 'series',
		title: 'Peacemaker – Staffel 1',
		releaseDate: '2022-01-13',
		inUniverseYear: '2022 (DCU Prolog)',
		timelineAxisYear: '2022',
		runtimeMinutes: 320,
		episodeCount: 8,
		chronologicalOrder: 7,
		releaseOrder: 11,
		phaseOrEra: 'DCU Prolog',
		synopsis:
			'Christopher Smith, Vigilante, Harcourt, Economos und Adebayo bekämpfen die „Project Butterfly“-Invasion und legen Amanda Wallers Task Force X vor der Presse offen.',
		posterGradient: 'from-red-900 via-sky-900 to-slate-950',
		streamingProvider: 'WOW / Max',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'dcu-the-flash',
		franchiseId: 'dcu',
		tmdbId: 298618,
		mediaType: 'movie',
		title: 'The Flash',
		releaseDate: '2023-06-16',
		inUniverseYear: '2023 (Reset der Zeitlinie)',
		timelineAxisYear: '2023',
		runtimeMinutes: 144,
		chronologicalOrder: 8,
		releaseOrder: 13,
		phaseOrEra: 'DCEU Finale (Flashpoint)',
		synopsis:
			'Barry Allen reist in der Zeit zurück, um seine Mutter zu retten, trifft auf Michael Keatons Batman und löst den Reset des alten DCEU-Multiversums aus.',
		posterGradient: 'from-red-700 via-amber-900 to-slate-950',
		streamingProvider: 'WOW / Max',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-flash-1',
				sceneType: 'post_credit',
				importance: 'joke',
				spoilerFreeHint: 'Kurzer Kneipen-Gag mit Aquaman am Ende des Abspanns.',
				spoilerDescription: 'Barry erklärt einem betrunkenen Arthur Curry die verschiedenen Batmen der Zeitlinien.'
			}
		]
	},
	{
		id: 'dcu-blue-beetle',
		franchiseId: 'dcu',
		tmdbId: 565770,
		mediaType: 'movie',
		title: 'Blue Beetle',
		releaseDate: '2023-08-18',
		inUniverseYear: '2023 (DCU Charakter)',
		timelineAxisYear: '2023',
		runtimeMinutes: 127,
		chronologicalOrder: 9,
		releaseOrder: 14,
		phaseOrEra: 'DCU Übergang',
		synopsis:
			'Ein außerirdischer Skarabäus wählt Jaime Reyes als Symbiose-Wirt aus und verleiht ihm die Rüstung von Blue Beetle (Charakter wird ins neue DCU übernommen).',
		posterGradient: 'from-blue-700 via-indigo-950 to-slate-950',
		streamingProvider: 'WOW / Max',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-bb-1',
				sceneType: 'mid_credit',
				importance: 'must_watch',
				spoilerFreeHint: 'Ted Kord lebt! Wichtige Botschaft im Labor.',
				spoilerDescription: 'Über den alten Computer im Kord-Labor trifft eine Nachricht von Ted Kord ein: Er ist noch am Leben!'
			}
		]
	},

	// --- MATT REEVES BATVERSE (Elseworlds) ---
	{
		id: 'dcu-the-batman',
		franchiseId: 'dcu',
		tmdbId: 414906,
		mediaType: 'movie',
		title: 'The Batman (Elseworlds)',
		releaseDate: '2022-03-04',
		inUniverseYear: '2022 (Erde-2)',
		timelineAxisYear: 'Bat-22',
		runtimeMinutes: 176,
		chronologicalOrder: 10,
		releaseOrder: 12,
		phaseOrEra: 'Elseworlds: The Batman Epic Crime Saga',
		synopsis:
			'In seinem zweiten Jahr als Rächer von Gotham jagt Bruce Wayne (Robert Pattinson) den Serienmörder Riddler und deckt die tiefe Korruption rund um Carmine Falcone auf.',
		posterGradient: 'from-red-950 via-zinc-900 to-black',
		streamingProvider: 'WOW / Max',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-bat-1',
				sceneType: 'post_credit',
				importance: 'joke',
				spoilerFreeHint: 'Nur ein kurzes grünes Fragezeichen + Website-Link ganz am Ende.',
				spoilerDescription: 'Auf dem Bildschirm erscheint „Good Bye“ und die URL rataalada.com.'
			}
		]
	},
	{
		id: 'dcu-the-penguin',
		franchiseId: 'dcu',
		tmdbId: 194764,
		mediaType: 'series',
		title: 'The Penguin – Staffel 1 (Elseworlds)',
		releaseDate: '2024-09-19',
		inUniverseYear: '2022 (1 Woche nach The Batman)',
		timelineAxisYear: 'Bat-22',
		runtimeMinutes: 460,
		episodeCount: 8,
		chronologicalOrder: 11,
		releaseOrder: 15,
		phaseOrEra: 'Elseworlds: The Batman Epic Crime Saga',
		synopsis:
			'Direkt nach der Überflutung von Gotham kämpfen Oz Cobb (Colin Farrell) und Sofia Falcone in einem brutalen Gangsterkrieg um die Vorherrschaft in der Unterwelt.',
		posterGradient: 'from-purple-950 via-zinc-900 to-black',
		streamingProvider: 'WOW / Max',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},

	// --- JAMES GUNNS NEUES DCU: CHAPTER 1 – GODS AND MONSTERS ---
	{
		id: 'dcu-creature-commandos-s1',
		franchiseId: 'dcu',
		tmdbId: 219543,
		mediaType: 'series',
		title: 'Creature Commandos – Staffel 1',
		releaseDate: '2024-12-05',
		inUniverseYear: '2024 (Offizieller DCU Start)',
		timelineAxisYear: '2024',
		runtimeMinutes: 160,
		episodeCount: 7,
		chronologicalOrder: 12,
		releaseOrder: 16,
		phaseOrEra: 'Chapter 1: Gods and Monsters',
		synopsis:
			'Nachdem der Kongress menschliche Selbstmordkommandos verboten hat, stellt Amanda Waller unter Rick Flag Sr. die „Task Force M“ aus Monstern zusammen.',
		posterGradient: 'from-emerald-900 via-slate-900 to-zinc-950',
		streamingProvider: 'WOW / Max',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-cc-1',
				sceneType: 'post_credit',
				importance: 'tease',
				spoilerFreeHint: 'In Folge 7 nach dem Abspann: Das neue Team für Staffel 2!',
				spoilerDescription: 'Die Bride trifft auf das erweiterte Team inkl. King Shark, Nosferata, Khalis und einem riesigen neuen GI Robot.'
			}
		]
	},
	{
		id: 'dcu-superman-2025',
		franchiseId: 'dcu',
		tmdbId: 1061474,
		mediaType: 'movie',
		title: 'Superman',
		releaseDate: '2025-07-11',
		inUniverseYear: '2025',
		timelineAxisYear: '2025',
		runtimeMinutes: 129,
		chronologicalOrder: 13,
		releaseOrder: 17,
		phaseOrEra: 'Chapter 1: Gods and Monsters',
		synopsis:
			'Clark Kent versucht in einer Welt voller etablierter Metawesen (Justice Gang: Guy Gardner / Green Lantern, Hawkgirl, Mister Terrific, Metamorpho) gegen Lex Luthor ein Symbol echter Güte zu sein.',
		posterGradient: 'from-blue-800 via-red-900 to-slate-950',
		streamingProvider: 'WOW / Max',
		isUpcoming: false,
		isEventMilestone: true,
		creditScenes: [
			{
				id: 'cs-sup-1',
				sceneType: 'mid_credit',
				importance: 'tease',
				spoilerFreeHint: 'Schöner stiller Moment mit Superman und Krypto.',
				spoilerDescription: 'Superman und Krypto sitzen auf dem Mond und blicken gemeinsam auf die Erde.'
			},
			{
				id: 'cs-sup-2',
				sceneType: 'post_credit',
				importance: 'joke',
				spoilerFreeHint: 'Kurzer humorvoller Dialog mit Mister Terrific.',
				spoilerDescription: 'Superman bemerkt, dass das von Mister Terrific wieder zusammengefügte Gebäude leicht schief ist.'
			}
		]
	},
	{
		id: 'dcu-peacemaker-s2',
		franchiseId: 'dcu',
		tmdbId: 110492,
		mediaType: 'series',
		title: 'Peacemaker – Staffel 2',
		releaseDate: '2025-08-21',
		inUniverseYear: '2025 (1 Monat nach Superman)',
		timelineAxisYear: '2025',
		runtimeMinutes: 340,
		episodeCount: 8,
		chronologicalOrder: 14,
		releaseOrder: 18,
		phaseOrEra: 'Chapter 1: Gods and Monsters',
		synopsis:
			'Rick Flag Sr. wird neuer Direktor von A.R.G.U.S. und jagt Christopher Smith wegen des Todes seines Sohnes, während Peacemaker das Quantenportal in eine Parallelwelt nutzt.',
		posterGradient: 'from-red-900 via-blue-950 to-slate-950',
		streamingProvider: 'WOW / Max',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'dcu-supergirl-2026',
		franchiseId: 'dcu',
		tmdbId: 1064486,
		mediaType: 'movie',
		title: 'Supergirl: Woman of Tomorrow',
		releaseDate: '2026-06-26',
		inUniverseYear: '2026',
		timelineAxisYear: '2026',
		runtimeMinutes: 125,
		chronologicalOrder: 15,
		releaseOrder: 19,
		phaseOrEra: 'Chapter 1: Gods and Monsters',
		synopsis:
			'Kara Zor-El (Milly Alcock) reist nach ihrem Kurzauftritt am Ende von Superman mit Hund Krypto, Ruthye und Kopfgeldjäger Lobo (Jason Momoa) auf einem Rachefeldzug durch das All.',
		posterGradient: 'from-indigo-900 via-rose-900 to-slate-950',
		streamingProvider: 'Kino / Max',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'dcu-clayface-2026',
		franchiseId: 'dcu',
		tmdbId: 1290411,
		mediaType: 'movie',
		title: 'Clayface',
		releaseDate: '2026-09-11',
		inUniverseYear: '2026 (Gotham)',
		timelineAxisYear: '2026',
		runtimeMinutes: 112,
		chronologicalOrder: 16,
		releaseOrder: 20,
		phaseOrEra: 'Chapter 1: Gods and Monsters',
		synopsis:
			'Body-Horror-Thriller im DCU über Basil Karlo, dessen Körper sich in formbaren Ton verwandelt (bereits in Creature Commandos eingeführt).',
		posterGradient: 'from-stone-800 via-amber-950 to-black',
		streamingProvider: 'Kino / Max',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'dcu-lanterns',
		franchiseId: 'dcu',
		tmdbId: 219550,
		mediaType: 'series',
		title: 'Lanterns – Staffel 1',
		releaseDate: '2026-11-15',
		inUniverseYear: '2026',
		timelineAxisYear: '2026',
		runtimeMinutes: 420,
		episodeCount: 8,
		chronologicalOrder: 17,
		releaseOrder: 21,
		phaseOrEra: 'Chapter 1 (Haupt-Event)',
		synopsis:
			'Green-Lantern-Legende Hal Jordan und Rekrut John Stewart (zusammen mit Guy Gardner) untersuchen in Nebraska einen Mordfall, der die zentrale Bedrohung von Chapter 1 enthüllt.',
		posterGradient: 'from-emerald-800 via-green-950 to-black',
		streamingProvider: 'Max / WOW',
		isUpcoming: true,
		isEventMilestone: true,
		creditScenes: []
	},
	{
		id: 'dcu-the-batman-part-ii',
		franchiseId: 'dcu',
		tmdbId: 940721,
		mediaType: 'movie',
		title: 'The Batman – Part II (Elseworlds)',
		releaseDate: '2027-10-01',
		inUniverseYear: 'Winter nach The Penguin',
		timelineAxisYear: 'Bat-27',
		runtimeMinutes: 170,
		chronologicalOrder: 18,
		releaseOrder: 22,
		phaseOrEra: 'Elseworlds: The Batman Epic Crime Saga',
		synopsis:
			'Nach Oz Cobbs Aufstieg an die Spitze der Unterwelt in The Penguin sieht sich Bruce Wayne im winterlichen Gotham einer neuen Verschwörung gegenüber.',
		posterGradient: 'from-red-950 via-stone-900 to-black',
		streamingProvider: 'Kino-Event',
		isUpcoming: true,
		isEventMilestone: true,
		creditScenes: []
	}
];

export const DCU_DEPENDENCIES: MediaDependency[] = [
	// --- ROAD TO LANTERNS ---
	{
		targetMediaId: 'dcu-lanterns',
		requiredMediaId: 'dcu-superman-2025',
		priority: 'essential',
		watchScope: 'full',
		reason: 'Führt Guy Gardner (Green Lantern), die Justice Gang und den Status Quo der Metawesen im DCU ein.'
	},
	{
		targetMediaId: 'dcu-lanterns',
		requiredMediaId: 'dcu-peacemaker-s2',
		priority: 'essential',
		watchScope: 'full',
		reason: 'Rick Flag Sr.s Rolle als A.R.G.U.S.-Direktor und die Entdeckung der Dimensionen münden direkt in Lanterns.'
	},
	{
		targetMediaId: 'dcu-lanterns',
		requiredMediaId: 'dcu-creature-commandos-s1',
		priority: 'recommended',
		watchScope: 'key_episodes',
		effectiveMinutes: 45,
		scopeHint: '⚡ Zeitspar-Tipp: Folge 1 & 7 (45 Min.) reichen völlig aus, um Rick Flag Sr. kennenzulernen!',
		reason: 'Führt Rick Flag Sr. ins neue DCU ein.'
	},
	{
		targetMediaId: 'dcu-lanterns',
		requiredMediaId: 'dcu-the-suicide-squad-2021',
		priority: 'recommended',
		watchScope: 'credits_only',
		effectiveMinutes: 10,
		scopeHint: '⚡ Rewatch-Tipp: Nur das Finale zwischen Peacemaker und Rick Flag Jr. + Post-Credit-Scene (10 Min.) wichtig!',
		reason: 'Erklärt, warum Rick Flag Sr. in Creature Commandos & Peacemaker S2 um seinen Sohn trauert.'
	},
	{
		targetMediaId: 'dcu-lanterns',
		requiredMediaId: 'dcu-supergirl-2026',
		priority: 'bonus',
		watchScope: 'full',
		reason: 'Erweitert die kosmischen Sektoren des neuen DCU.'
	},

	// --- ROAD TO THE BATMAN PART II ---
	{
		targetMediaId: 'dcu-the-batman-part-ii',
		requiredMediaId: 'dcu-the-batman',
		priority: 'essential',
		watchScope: 'full',
		reason: 'Der erste Teil von Matt Reeves’ Gotham-Saga.'
	},
	{
		targetMediaId: 'dcu-the-batman-part-ii',
		requiredMediaId: 'dcu-the-penguin',
		priority: 'essential',
		watchScope: 'full',
		reason: 'Schlägt die direkte Brücke zwischen Teil 1 und Teil 2 und endet mit dem Aufleuchten des Bat-Signals.'
	}
];

/**
 * Vollständige Star Wars Timeline (Episoden I–IX, Spin-Offs, Animations-Klassiker & Mandoverse)
 */
export const STARWARS_ITEMS: MediaItem[] = [
	{
		id: 'sw-acolyte',
		franchiseId: 'starwars',
		tmdbId: 114479,
		mediaType: 'series',
		title: 'The Acolyte',
		releaseDate: '2024-06-04',
		inUniverseYear: '132 VSY',
		timelineAxisYear: '132 VSY',
		runtimeMinutes: 290,
		episodeCount: 8,
		chronologicalOrder: 1,
		releaseOrder: 18,
		phaseOrEra: 'Die Hohe Republik',
		synopsis:
			'Hundert Jahre vor Episode I untersucht Jedi-Meister Sol eine Mordserie an Jedi und stößt auf den dunklen Machtnutzer Qimir (und Darth Plagueis).',
		posterGradient: 'from-red-950 via-amber-950 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'sw-ep1-phantom-menace',
		franchiseId: 'starwars',
		tmdbId: 1893,
		mediaType: 'movie',
		title: 'Episode I – Die dunkle Bedrohung',
		releaseDate: '1999-05-19',
		inUniverseYear: '32 VSY',
		timelineAxisYear: '32 VSY',
		runtimeMinutes: 136,
		chronologicalOrder: 2,
		releaseOrder: 4,
		phaseOrEra: 'Niedergang der Jedi (Prequels)',
		synopsis:
			'Qui-Gon Jinn und Obi-Wan Kenobi entdecken auf Tatooine den außergewöhnlich machtsensitiven Sklavenjungen Anakin Skywalker und kämpfen gegen Darth Maul.',
		posterGradient: 'from-red-900 via-amber-900 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'sw-ep2-attack-of-clones',
		franchiseId: 'starwars',
		tmdbId: 1894,
		mediaType: 'movie',
		title: 'Episode II – Angriff der Klonkrieger',
		releaseDate: '2002-05-16',
		inUniverseYear: '22 VSY',
		timelineAxisYear: '22 VSY',
		runtimeMinutes: 142,
		chronologicalOrder: 3,
		releaseOrder: 5,
		phaseOrEra: 'Niedergang der Jedi (Prequels)',
		synopsis:
			'Während Obi-Wan auf Kamino eine geheime Klonarmee entdeckt, verliebt sich Anakin in Padmé Amidala – und die Klonkriege gegen Count Dooku brechen aus.',
		posterGradient: 'from-amber-800 via-blue-950 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'sw-clone-wars',
		franchiseId: 'starwars',
		tmdbId: 4194,
		mediaType: 'series',
		title: 'The Clone Wars (Staffel 1–7)',
		releaseDate: '2008-10-03',
		inUniverseYear: '22–19 VSY',
		timelineAxisYear: '21 VSY',
		runtimeMinutes: 2900,
		episodeCount: 133,
		chronologicalOrder: 4,
		releaseOrder: 7,
		phaseOrEra: 'Klonkriege',
		synopsis:
			'Anakin Skywalker bildet seine Padawan-Schülerin Ahsoka Tano aus, während Captain Rex, Bo-Katan Kryze und Maul die Geschicke von Mandalore prägen.',
		posterGradient: 'from-blue-900 via-indigo-950 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'sw-ep3-revenge-of-sith',
		franchiseId: 'starwars',
		tmdbId: 1895,
		mediaType: 'movie',
		title: 'Episode III – Die Rache der Sith',
		releaseDate: '2005-05-19',
		inUniverseYear: '19 VSY',
		timelineAxisYear: '19 VSY',
		runtimeMinutes: 140,
		chronologicalOrder: 5,
		releaseOrder: 6,
		phaseOrEra: 'Niedergang der Jedi (Prequels)',
		synopsis:
			'Kanzler Palpatine verführt Anakin Skywalker zur Dunklen Seite, ruft die Order 66 aus und lässt Darth Vader auf Mustafar erstehen.',
		posterGradient: 'from-red-900 via-orange-950 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: true,
		creditScenes: []
	},
	{
		id: 'sw-bad-batch',
		franchiseId: 'starwars',
		tmdbId: 105971,
		mediaType: 'series',
		title: 'The Bad Batch (Staffel 1–3)',
		releaseDate: '2021-05-04',
		inUniverseYear: '19–18 VSY',
		timelineAxisYear: '19 VSY',
		runtimeMinutes: 1100,
		episodeCount: 47,
		chronologicalOrder: 6,
		releaseOrder: 13,
		phaseOrEra: 'Herrschaft des Imperiums',
		synopsis:
			'Die genetisch veränderte Klon-Einheit 99 schützt das Klon-Mädchen Omega vor dem Geheimprojekt „Necromancer“ des Imperators auf Mount Tantiss.',
		posterGradient: 'from-zinc-800 via-red-950 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'sw-solo',
		franchiseId: 'starwars',
		tmdbId: 348350,
		mediaType: 'movie',
		title: 'Solo: A Star Wars Story',
		releaseDate: '2018-05-25',
		inUniverseYear: '13–10 VSY',
		timelineAxisYear: '10 VSY',
		runtimeMinutes: 135,
		chronologicalOrder: 7,
		releaseOrder: 11,
		phaseOrEra: 'Herrschaft des Imperiums',
		synopsis:
			'Der junge Han Solo lernt Chewbacca und Lando Calrissian kennen und fliegt den legendären Kessel-Flug mit dem Millennium Falken.',
		posterGradient: 'from-amber-800 via-stone-900 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'sw-obi-wan-kenobi',
		franchiseId: 'starwars',
		tmdbId: 92830,
		mediaType: 'series',
		title: 'Obi-Wan Kenobi',
		releaseDate: '2022-05-27',
		inUniverseYear: '9 VSY',
		timelineAxisYear: '9 VSY',
		runtimeMinutes: 255,
		episodeCount: 6,
		chronologicalOrder: 8,
		releaseOrder: 15,
		phaseOrEra: 'Herrschaft des Imperiums',
		synopsis:
			'Zehn Jahre nach Episode III verlässt Obi-Wan sein Exil auf Tatooine, um die entführte 10-jährige Prinzessin Leia vor den Inquisitoren und Darth Vader zu retten.',
		posterGradient: 'from-amber-900 via-sky-950 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'sw-andor-s1-s2',
		franchiseId: 'starwars',
		tmdbId: 83867,
		mediaType: 'series',
		title: 'Andor (Staffel 1 & 2)',
		releaseDate: '2022-09-21',
		inUniverseYear: '5 VSY – 0 VSY',
		timelineAxisYear: '5 VSY',
		runtimeMinutes: 980,
		episodeCount: 24,
		chronologicalOrder: 9,
		releaseOrder: 16,
		phaseOrEra: 'Zeitalter der Rebellion',
		synopsis:
			'Die Geburt der Rebellenallianz aus der Perspektive von Cassian Andor, Mon Mothma und Luthen Rael – mündet direkt in Rogue One.',
		posterGradient: 'from-amber-900 via-stone-900 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-andor-1',
				sceneType: 'post_credit',
				importance: 'must_watch',
				spoilerFreeHint: 'In Staffel 1 Folge 12 unbedingt bis ganz nach dem Abspann warten!',
				spoilerDescription:
					'Die Bauteile aus dem Narkina-5-Gefängnis werden von Droiden im All in die Superlaser-Schüssel des ersten Todessterns eingebaut.'
			}
		]
	},
	{
		id: 'sw-rebels',
		franchiseId: 'starwars',
		tmdbId: 60554,
		mediaType: 'series',
		title: 'Star Wars Rebels (Staffel 1–4)',
		releaseDate: '2014-10-03',
		inUniverseYear: '5 VSY – 0 VSY',
		timelineAxisYear: '4 VSY',
		runtimeMinutes: 1650,
		episodeCount: 75,
		chronologicalOrder: 10,
		releaseOrder: 8,
		phaseOrEra: 'Zeitalter der Rebellion',
		synopsis:
			'Die Crew der Ghost (Ezra Bridger, Sabine Wren, Hera Syndulla, Kanan Jarrus, Chopper) kämpft gemeinsam mit Ahsoka Tano gegen Großadmiral Thrawn.',
		posterGradient: 'from-orange-800 via-indigo-950 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'sw-rogue-one',
		franchiseId: 'starwars',
		tmdbId: 330459,
		mediaType: 'movie',
		title: 'Rogue One: A Star Wars Story',
		releaseDate: '2016-12-16',
		inUniverseYear: '0 VSY',
		timelineAxisYear: '0 VSY',
		runtimeMinutes: 133,
		chronologicalOrder: 11,
		releaseOrder: 10,
		phaseOrEra: 'Zeitalter der Rebellion',
		synopsis:
			'Jyn Erso und Cassian Andor stehlen auf Scarif unter Einsatz ihres Lebens die Konstruktionspläne des ersten Todessterns.',
		posterGradient: 'from-teal-900 via-stone-900 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'sw-ep4-new-hope',
		franchiseId: 'starwars',
		tmdbId: 11,
		mediaType: 'movie',
		title: 'Episode IV – Eine neue Hoffnung',
		releaseDate: '1977-05-25',
		inUniverseYear: '0 VSY / 0 NSY',
		timelineAxisYear: '0 NSY',
		runtimeMinutes: 121,
		chronologicalOrder: 12,
		releaseOrder: 1,
		phaseOrEra: 'Zeitalter der Rebellion (Klassische Trilogie)',
		synopsis:
			'Luke Skywalker schließt sich Obi-Wan Kenobi, Han Solo und Prinzessin Leia an und zerstört in der Schlacht von Yavin den Todesstern.',
		posterGradient: 'from-amber-700 via-blue-950 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: true,
		creditScenes: []
	},
	{
		id: 'sw-ep5-empire',
		franchiseId: 'starwars',
		tmdbId: 1891,
		mediaType: 'movie',
		title: 'Episode V – Das Imperium schlägt zurück',
		releaseDate: '1980-05-21',
		inUniverseYear: '3 NSY',
		timelineAxisYear: '3 NSY',
		runtimeMinutes: 124,
		chronologicalOrder: 13,
		releaseOrder: 2,
		phaseOrEra: 'Zeitalter der Rebellion (Klassische Trilogie)',
		synopsis:
			'Nach der Schlacht auf Hoth wird Luke auf Dagobah von Meister Yoda ausgebildet und erfährt in der Wolkenstadt von Darth Vader die Wahrheit über seinen Vater.',
		posterGradient: 'from-sky-900 via-slate-900 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'sw-ep6-return-of-jedi',
		franchiseId: 'starwars',
		tmdbId: 1892,
		mediaType: 'movie',
		title: 'Episode VI – Die Rückkehr der Jedi-Ritter',
		releaseDate: '1983-05-25',
		inUniverseYear: '4 NSY',
		timelineAxisYear: '4 NSY',
		runtimeMinutes: 131,
		chronologicalOrder: 14,
		releaseOrder: 3,
		phaseOrEra: 'Zeitalter der Rebellion (Klassische Trilogie)',
		synopsis:
			'In der Schlacht von Endor zerstören die Rebellen den zweiten Todesstern, während Luke seinen Vater Anakin Skywalker erlöst und den Imperator stürzt.',
		posterGradient: 'from-emerald-900 via-slate-900 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: true,
		creditScenes: []
	},
	{
		id: 'sw-mandalorian',
		franchiseId: 'starwars',
		tmdbId: 82856,
		mediaType: 'series',
		title: 'The Mandalorian (Staffel 1–3)',
		releaseDate: '2019-11-12',
		inUniverseYear: '9 NSY',
		timelineAxisYear: '9 NSY',
		runtimeMinutes: 960,
		episodeCount: 24,
		chronologicalOrder: 15,
		releaseOrder: 12,
		phaseOrEra: 'Die Neue Republik (Mandoverse)',
		synopsis:
			'Kopfgeldjäger Din Djarin nimmt das machtsensitive Findelkind Grogu unter seinen Schutz, gewinnt das Dunkelschwert und hilft Bo-Katan bei der Rückeroberung von Mandalore.',
		posterGradient: 'from-zinc-700 via-amber-950 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-mando-1',
				sceneType: 'post_credit',
				importance: 'must_watch',
				spoilerFreeHint: 'Staffel 2 Finale (Kapitel 16) hat eine Post-Credit-Scene, die Book of Boba Fett einleitet.',
				spoilerDescription: 'Boba Fett und Fennec Shand kehren in Jabbas Palast auf Tatooine zurück und übernehmen den Thron.'
			}
		]
	},
	{
		id: 'sw-book-of-boba-fett',
		franchiseId: 'starwars',
		tmdbId: 115036,
		mediaType: 'series',
		title: 'Das Buch von Boba Fett',
		releaseDate: '2021-12-29',
		inUniverseYear: '9 NSY',
		timelineAxisYear: '9 NSY',
		runtimeMinutes: 340,
		episodeCount: 7,
		chronologicalOrder: 16,
		releaseOrder: 14,
		phaseOrEra: 'Die Neue Republik (Mandoverse)',
		synopsis:
			'Boba Fett regiert Mos Espa – während die Folgen 5 bis 7 eigentlich „The Mandalorian Staffel 2.5“ sind und zeigen, wie Grogu von Luke Skywalker zu Din Djarin zurückkehrt!',
		posterGradient: 'from-emerald-950 via-amber-950 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-bobf-1',
				sceneType: 'post_credit',
				importance: 'tease',
				spoilerFreeHint: 'Folge 7 hat eine Post-Credit-Scene mit Cobb Vanth.',
				spoilerDescription: 'Marschall Cobb Vanth wird im Bacta-Tank von Boba Fetts Festung kybernetisch geheilt.'
			}
		]
	},
	{
		id: 'sw-ahsoka-s1',
		franchiseId: 'starwars',
		tmdbId: 114461,
		mediaType: 'series',
		title: 'Ahsoka – Staffel 1',
		releaseDate: '2023-08-22',
		inUniverseYear: '9–10 NSY',
		timelineAxisYear: '10 NSY',
		runtimeMinutes: 350,
		episodeCount: 8,
		chronologicalOrder: 17,
		releaseOrder: 17,
		phaseOrEra: 'Die Neue Republik (Mandoverse)',
		synopsis:
			'Ahsoka Tano und Sabine Wren reisen nach Peridea in einer fremden Galaxis, doch Großadmiral Thrawn gelingt die Rückkehr in die bekannte Galaxis.',
		posterGradient: 'from-sky-900 via-indigo-950 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'sw-skeleton-crew',
		franchiseId: 'starwars',
		tmdbId: 202879,
		mediaType: 'series',
		title: 'Star Wars: Skeleton Crew',
		releaseDate: '2024-12-02',
		inUniverseYear: '9–10 NSY',
		timelineAxisYear: '10 NSY',
		runtimeMinutes: 310,
		episodeCount: 8,
		chronologicalOrder: 18,
		releaseOrder: 19,
		phaseOrEra: 'Die Neue Republik (Mandoverse)',
		synopsis:
			'Vier Kinder vom verborgenen Schatzplaneten At Attin verirren sich in der Galaxis und treffen auf den Piraten und Ex-Jedi-Schüler Jod Na Nawood.',
		posterGradient: 'from-teal-900 via-slate-900 to-amber-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'sw-mando-grogu-movie',
		franchiseId: 'starwars',
		tmdbId: 1229171,
		mediaType: 'movie',
		title: 'The Mandalorian & Grogu',
		releaseDate: '2026-05-22',
		inUniverseYear: '11 NSY',
		timelineAxisYear: '11 NSY',
		runtimeMinutes: 132,
		chronologicalOrder: 19,
		releaseOrder: 20,
		phaseOrEra: 'Kino-Event (Mandoverse)',
		synopsis:
			'Din Djarin und sein Lehrling Grogu treten gemeinsam mit Zeb Orrelios und Rotta the Hutt für die Neue Republik gegen die imperialen Kriegsherren an.',
		posterGradient: 'from-amber-800 via-emerald-950 to-black',
		streamingProvider: 'Kino / Disney+',
		isUpcoming: true,
		isEventMilestone: true,
		creditScenes: []
	},
	{
		id: 'sw-ahsoka-s2',
		franchiseId: 'starwars',
		tmdbId: 1144612,
		mediaType: 'series',
		title: 'Ahsoka – Staffel 2',
		releaseDate: '2026-11-20',
		inUniverseYear: '11 NSY',
		timelineAxisYear: '11 NSY',
		runtimeMinutes: 360,
		episodeCount: 8,
		chronologicalOrder: 20,
		releaseOrder: 21,
		phaseOrEra: 'Die Neue Republik (Mandoverse)',
		synopsis:
			'Während Großadmiral Thrawn den Krieg gegen die Neue Republik eröffnet, erforschen Baylan Skoll, Ahsoka und Sabine die Götter von Mortis auf Peridea.',
		posterGradient: 'from-indigo-900 via-sky-950 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: true,
		isEventMilestone: true,
		creditScenes: []
	}
];

export const STARWARS_DEPENDENCIES: MediaDependency[] = [
	// --- ROAD TO THE MANDALORIAN & GROGU ---
	{
		targetMediaId: 'sw-mando-grogu-movie',
		requiredMediaId: 'sw-mandalorian',
		priority: 'essential',
		watchScope: 'full',
		reason: 'Direkte Vorgeschichte von Din Djarin und Grogu (Staffel 1–3).'
	},
	{
		targetMediaId: 'sw-mando-grogu-movie',
		requiredMediaId: 'sw-book-of-boba-fett',
		priority: 'essential',
		watchScope: 'key_episodes',
		effectiveMinutes: 135,
		scopeHint:
			'⚡ Zeitspar-Tipp: Du musst NUR Folge 5, 6 & 7 schauen (135 Min. statt 340 Min.)! Ohne diese 3 Folgen versteht man nicht, warum Grogu in Staffel 3 plötzlich wieder bei Mando ist!',
		reason: 'Folge 5–7 zeigen Mandos neues N-1-Sternenjäger-Schiff und Grogus Entscheidung gegen Lukes Jedi-Training.'
	},
	{
		targetMediaId: 'sw-mando-grogu-movie',
		requiredMediaId: 'sw-ahsoka-s1',
		priority: 'recommended',
		watchScope: 'full',
		reason: 'Erklärt die Rückkehr von Großadmiral Thrawn und den Zustand der Neuen Republik.'
	},
	{
		targetMediaId: 'sw-mando-grogu-movie',
		requiredMediaId: 'sw-clone-wars',
		priority: 'bonus',
		watchScope: 'key_episodes',
		effectiveMinutes: 90,
		scopeHint: '⚡ Zeitspar-Tipp: Der Kinofilm von 2008 führt Jabbas Sohn „Rotta the Hutt“ ein, der in The Mandalorian & Grogu zurückkehrt!',
		reason: 'Stellt Rotta the Hutt und die Kultur von Mandalore vor.'
	},

	// --- ROAD TO AHSOKA STAFFEL 2 ---
	{
		targetMediaId: 'sw-ahsoka-s2',
		requiredMediaId: 'sw-ahsoka-s1',
		priority: 'essential',
		watchScope: 'full',
		reason: 'Direkte erste Staffel – endet mit dem Cliffhanger auf Peridea und Thrawns Ankunft auf Dathomir.'
	},
	{
		targetMediaId: 'sw-ahsoka-s2',
		requiredMediaId: 'sw-rebels',
		priority: 'essential',
		watchScope: 'key_episodes',
		effectiveMinutes: 180,
		scopeHint: '⚡ Zeitspar-Tipp: Staffel 4 Folge 10–15 (ca. 3 Std. statt 27 Std.) reichen völlig für Ezras & Thrawns Vorgeschichte!',
		reason: 'Ahsoka ist die direkte Live-Action-Fortsetzung des Finales von Star Wars Rebels.'
	},
	{
		targetMediaId: 'sw-ahsoka-s2',
		requiredMediaId: 'sw-clone-wars',
		priority: 'recommended',
		watchScope: 'key_episodes',
		effectiveMinutes: 65,
		scopeHint: '⚡ Zeitspar-Tipp: Nur den „Mortis-Arc“ (Staffel 3, Folge 15–17, 65 Min.) schauen – erklärt die gigantischen Statuen am Ende von Ahsoka Staffel 1!',
		reason: 'Erklärt die Macht-Götter von Mortis (Vater, Sohn, Tochter), denen Baylan Skoll auf Peridea folgt.'
	}
];
