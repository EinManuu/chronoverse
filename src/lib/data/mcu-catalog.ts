import type { MediaDependency, MediaItem } from '$lib/types';

/**
 * KOMPLETTE Marvel Cinematic Universe (MCU) Timeline (75 Titel!):
 * - Alle Kinofilme (Phase 1 bis Phase 6)
 * - Alle Marvel Television Serien (Agent Carter, Agents of S.H.I.E.L.D., Inhumans, Runaways, Cloak & Dagger)
 * - Die komplette Defenders-Saga (Daredevil S1–3, Jessica Jones S1–3, Luke Cage S1–2, Iron Fist S1–2, The Defenders, The Punisher S1–2)
 * - Alle Marvel One-Shots & Kurzfilme
 * - Alle Disney+ Live-Action & Animations-Serien sowie Special Presentations
 * - Wichtige Multiverse-Legacy-Filme (X-Men / Deadpool / Blade / Spider-Man), die direkt in Doomsday & Secret Wars münden
 */
export const MCU_ITEMS: MediaItem[] = [
	// ==========================================================================
	// 1. HISTORISCHE ÄRA (Vor 2008)
	// ==========================================================================
	{
		id: 'mcu-eyes-of-wakanda',
		franchiseId: 'mcu',
		tmdbId: 241554,
		mediaType: 'series',
		title: 'Eyes of Wakanda',
		releaseDate: '2025-08-06',
		inUniverseYear: '1260 v. Chr. – 1896',
		timelineAxisYear: 'Antike',
		runtimeMinutes: 120,
		episodeCount: 4,
		chronologicalOrder: 0.5,
		releaseOrder: 70,
		phaseOrEra: 'Phase 6 (Historisch)',
		synopsis:
			'Krieger der geheimen wakandanischen Organisation „Hatut Zeraze“ reisen durch die Jahrhunderte der Menschheitsgeschichte, um gestohlene Vibranium-Artefakte zurückzuholen.',
		posterGradient: 'from-amber-900 via-purple-950 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'mcu-cap-first-avenger',
		franchiseId: 'mcu',
		tmdbId: 1771,
		mediaType: 'movie',
		title: 'Captain America: The First Avenger',
		releaseDate: '2011-07-22',
		inUniverseYear: '1942–1945',
		timelineAxisYear: '1942',
		runtimeMinutes: 124,
		chronologicalOrder: 1,
		releaseOrder: 5,
		phaseOrEra: 'Phase 1',
		synopsis:
			'Steve Rogers wird im Zweiten Weltkrieg zum Supersoldaten Captain America und kämpft gegen HYDRA und den Tesserakt.',
		posterGradient: 'from-blue-900 via-slate-900 to-red-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-cap1',
				sceneType: 'post_credit',
				importance: 'tease',
				spoilerFreeHint: 'Erster Ausblick auf Marvels The Avengers.',
				spoilerDescription: 'Nick Fury rekrutiert Steve Rogers am Boxsack für die Avengers-Initiative.'
			}
		]
	},
	{
		id: 'mcu-agent-carter-s1',
		franchiseId: 'mcu',
		tmdbId: 61550,
		mediaType: 'series',
		title: 'Marvel’s Agent Carter – Staffel 1',
		releaseDate: '2015-01-06',
		inUniverseYear: '1946',
		timelineAxisYear: '1946',
		runtimeMinutes: 336,
		episodeCount: 8,
		chronologicalOrder: 1.4,
		releaseOrder: 16,
		phaseOrEra: 'Marvel Television (Historisch)',
		synopsis:
			'Nach dem Ende des Zweiten Weltkriegs arbeitet Peggy Carter für die SSR und hilft heimlich Howard Stark und dessen Butler Edwin Jarvis (der später auch in Avengers: Endgame auftritt!), Starks Namen reinzuwaschen.',
		posterGradient: 'from-rose-900 via-blue-950 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'mcu-agent-carter-s2',
		franchiseId: 'mcu',
		tmdbId: 615502,
		mediaType: 'series',
		title: 'Marvel’s Agent Carter – Staffel 2',
		releaseDate: '2016-01-19',
		inUniverseYear: '1947',
		timelineAxisYear: '1947',
		runtimeMinutes: 420,
		episodeCount: 10,
		chronologicalOrder: 1.7,
		releaseOrder: 19,
		phaseOrEra: 'Marvel Television (Historisch)',
		synopsis:
			'Peggy Carter reist von New York nach Los Angeles, um mit Edwin Jarvis und Daniel Sousa die mysteriöse „Nullmaterie“ (Darkforce) und Whitney Frost zu untersuchen.',
		posterGradient: 'from-red-900 via-amber-950 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'mcu-oneshot-agent-carter',
		franchiseId: 'mcu',
		tmdbId: 211387,
		mediaType: 'oneshot',
		title: 'Marvel One-Shot: Agent Carter',
		releaseDate: '2013-09-03',
		inUniverseYear: '1946–1947',
		timelineAxisYear: '1947',
		runtimeMinutes: 15,
		chronologicalOrder: 2,
		releaseOrder: 10,
		phaseOrEra: 'Phase 2 (One-Shot)',
		synopsis:
			'Peggy Carter sichert im Alleingang das mysteriöse Zodiac-Serum und wird von Howard Stark offiziell zur Mitgründung von S.H.I.E.L.D. nach Washington berufen.',
		posterGradient: 'from-rose-900 via-slate-900 to-amber-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'mcu-captain-marvel',
		franchiseId: 'mcu',
		tmdbId: 299537,
		mediaType: 'movie',
		title: 'Captain Marvel',
		releaseDate: '2019-03-08',
		inUniverseYear: '1995',
		timelineAxisYear: '1995',
		runtimeMinutes: 124,
		chronologicalOrder: 3,
		releaseOrder: 36,
		phaseOrEra: 'Phase 3',
		synopsis:
			'Vers (Carol Danvers) stürzt 1995 auf die Erde, trifft einen jungen Nick Fury und entdeckt ihre Vergangenheit sowie die Kraft des Tesserakts.',
		posterGradient: 'from-red-800 via-blue-900 to-amber-900',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-cm-1',
				sceneType: 'mid_credit',
				importance: 'must_watch',
				spoilerFreeHint: 'Direkte Brücke zu Avengers: Endgame!',
				spoilerDescription:
					'Carol Danvers taucht im Avengers-Hauptquartier 2018 auf und fragt die Überlebenden: „Wo ist Fury?“'
			},
			{
				id: 'cs-cm-2',
				sceneType: 'post_credit',
				importance: 'joke',
				spoilerFreeHint: 'Witzige Szene mit Katze Goose auf Furys Schreibtisch.',
				spoilerDescription: 'Goose würgt den verschluckten Tesserakt wie einen Haarballen auf Furys Schreibtisch aus.'
			}
		]
	},

	// ==========================================================================
	// 2. PHASE 1 (2008–2012)
	// ==========================================================================
	{
		id: 'mcu-iron-man',
		franchiseId: 'mcu',
		tmdbId: 1726,
		mediaType: 'movie',
		title: 'Iron Man',
		releaseDate: '2008-05-02',
		inUniverseYear: '2008',
		timelineAxisYear: '2008',
		runtimeMinutes: 126,
		chronologicalOrder: 4,
		releaseOrder: 1,
		phaseOrEra: 'Phase 1',
		synopsis:
			'Der Urknall des MCU: Tony Stark baut in Gefangenschaft seine erste Rüstung und gibt sich der Welt als Iron Man zu erkennen.',
		posterGradient: 'from-red-900 via-amber-950 to-slate-900',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-im1',
				sceneType: 'post_credit',
				importance: 'must_watch',
				spoilerFreeHint: 'Legendäre Szene nach dem Abspann – begründet das vernetzte MCU!',
				spoilerDescription: 'Nick Fury stellt Tony Stark die „Avengers-Initiative“ vor.'
			}
		]
	},
	{
		id: 'mcu-iron-man-2',
		franchiseId: 'mcu',
		tmdbId: 10138,
		mediaType: 'movie',
		title: 'Iron Man 2',
		releaseDate: '2010-05-07',
		inUniverseYear: '2010',
		timelineAxisYear: '2010',
		runtimeMinutes: 124,
		chronologicalOrder: 5,
		releaseOrder: 3,
		phaseOrEra: 'Phase 1',
		synopsis:
			'Tony Stark kämpft gegen eine Palladium-Vergiftung und Ivan Vanko (Whiplash), während Natasha Romanoff (Black Widow) ihren ersten Auftritt hat.',
		posterGradient: 'from-red-950 via-orange-950 to-slate-900',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-im2',
				sceneType: 'post_credit',
				importance: 'tease',
				spoilerFreeHint: 'Leitet direkt zu Thor (2011) über.',
				spoilerDescription: 'Agent Coulson entdeckt Thors Hammer Mjölnir in einem Krater in New Mexico.'
			}
		]
	},
	{
		id: 'mcu-incredible-hulk',
		franchiseId: 'mcu',
		tmdbId: 1724,
		mediaType: 'movie',
		title: 'The Incredible Hulk',
		releaseDate: '2008-06-13',
		inUniverseYear: '2010',
		timelineAxisYear: '2010',
		runtimeMinutes: 112,
		chronologicalOrder: 6,
		releaseOrder: 2,
		phaseOrEra: 'Phase 1',
		synopsis:
			'Bruce Banner ist auf der Flucht vor General Thaddeus „Thunderbolt“ Ross, der Emil Blonsky in die Bestie Abomination verwandelt (und Samuel Sterns / The Leader einführt!).',
		posterGradient: 'from-emerald-950 via-green-900 to-slate-900',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-hulk',
				sceneType: 'post_credit',
				importance: 'tease',
				spoilerFreeHint: 'Kurzer Auftritt von Tony Stark am Ende des Films.',
				spoilerDescription: 'Tony Stark sucht General Ross in einer Bar auf und erzählt ihm von einem neuen Team.'
			}
		]
	},
	{
		id: 'mcu-oneshot-funny-thing',
		franchiseId: 'mcu',
		tmdbId: 76122,
		mediaType: 'oneshot',
		title: 'Marvel One-Shot: A Funny Thing Happened on the Way to Thor’s Hammer',
		releaseDate: '2011-10-25',
		inUniverseYear: '2010',
		timelineAxisYear: '2010',
		runtimeMinutes: 4,
		chronologicalOrder: 7,
		releaseOrder: 6,
		phaseOrEra: 'Phase 1 (One-Shot)',
		synopsis:
			'Agent Coulson hält auf dem Weg nach New Mexico an einer Tankstelle und legt im Alleingang zwei bewaffnete Räuber schlafen.',
		posterGradient: 'from-slate-800 via-amber-950 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'mcu-thor',
		franchiseId: 'mcu',
		tmdbId: 10195,
		mediaType: 'movie',
		title: 'Thor',
		releaseDate: '2011-05-06',
		inUniverseYear: '2010',
		timelineAxisYear: '2010',
		runtimeMinutes: 115,
		chronologicalOrder: 8,
		releaseOrder: 4,
		phaseOrEra: 'Phase 1',
		synopsis:
			'Der arrogante Donnergott Thor wird ohne seine Kräfte auf die Erde verbannt, während sein Bruder Loki in Asgard den Thron an sich reißt.',
		posterGradient: 'from-sky-900 via-slate-900 to-indigo-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-thor1',
				sceneType: 'post_credit',
				importance: 'must_watch',
				spoilerFreeHint: 'Wichtiges Setup für Marvels The Avengers (2012)!',
				spoilerDescription:
					'Nick Fury zeigt Erik Selvig den Tesserakt – und man sieht im Spiegel, dass Loki Selvig gedanklich kontrolliert.'
			}
		]
	},
	{
		id: 'mcu-oneshot-consultant',
		franchiseId: 'mcu',
		tmdbId: 76535,
		mediaType: 'oneshot',
		title: 'Marvel One-Shot: The Consultant',
		releaseDate: '2011-09-13',
		inUniverseYear: '2010',
		timelineAxisYear: '2010',
		runtimeMinutes: 4,
		chronologicalOrder: 9,
		releaseOrder: 7,
		phaseOrEra: 'Phase 1 (One-Shot)',
		synopsis:
			'Agent Coulson und Agent Sitwell schicken Tony Stark zu General Ross, um zu verhindern, dass Abomination in die Avengers aufgenommen wird.',
		posterGradient: 'from-zinc-800 via-slate-900 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'mcu-avengers-2012',
		franchiseId: 'mcu',
		tmdbId: 24428,
		mediaType: 'movie',
		title: 'Marvel’s The Avengers',
		releaseDate: '2012-05-04',
		inUniverseYear: '2012',
		timelineAxisYear: '2012',
		runtimeMinutes: 143,
		chronologicalOrder: 10,
		releaseOrder: 8,
		phaseOrEra: 'Phase 1 (Finale)',
		synopsis:
			'Iron Man, Captain America, Thor, Hulk, Black Widow und Hawkeye schließen sich in der Schlacht von New York erstmals gegen Loki und die Chitauri-Armee zusammen.',
		posterGradient: 'from-blue-900 via-indigo-950 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: true,
		creditScenes: [
			{
				id: 'cs-av1-1',
				sceneType: 'mid_credit',
				importance: 'must_watch',
				spoilerFreeHint: 'Erster Auftritt des großen Antagonisten der gesamten Infinity-Saga!',
				spoilerDescription: 'Thanos dreht sich im All um und lächelt bei dem Gedanken, die Menschen herauszufordern.'
			},
			{
				id: 'cs-av1-2',
				sceneType: 'post_credit',
				importance: 'joke',
				spoilerFreeHint: 'Kult-Szene im Schawarma-Imbiss nach der Schlacht.',
				spoilerDescription: 'Die völlig erschöpften Avengers essen schweigend Schawarma in einem verwüsteten Restaurant.'
			}
		]
	},
	{
		id: 'mcu-oneshot-item-47',
		franchiseId: 'mcu',
		tmdbId: 119569,
		mediaType: 'oneshot',
		title: 'Marvel One-Shot: Item 47',
		releaseDate: '2012-09-25',
		inUniverseYear: '2012',
		timelineAxisYear: '2012',
		runtimeMinutes: 12,
		chronologicalOrder: 11,
		releaseOrder: 9,
		phaseOrEra: 'Phase 1 (One-Shot)',
		synopsis:
			'Ein junges Paar findet nach der Schlacht von New York eine funktionierende Chitauri-Waffe („Item 47“) und überfällt damit Banken.',
		posterGradient: 'from-indigo-900 via-slate-900 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},

	// ==========================================================================
	// 3. PHASE 2 + MARVEL TELEVISION & DEFENDERS-SAGA START (2013–2015)
	// ==========================================================================
	{
		id: 'mcu-iron-man-3',
		franchiseId: 'mcu',
		tmdbId: 68721,
		mediaType: 'movie',
		title: 'Iron Man 3',
		releaseDate: '2013-05-03',
		inUniverseYear: '2012–2013',
		timelineAxisYear: '2013',
		runtimeMinutes: 130,
		chronologicalOrder: 12,
		releaseOrder: 11,
		phaseOrEra: 'Phase 2',
		synopsis:
			'Traumatisiert von New York sieht sich Tony Stark mit dem Terroristen „Mandarin“ und Aldrich Killians Extremis-Soldaten konfrontiert.',
		posterGradient: 'from-amber-900 via-red-950 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-im3',
				sceneType: 'post_credit',
				importance: 'joke',
				spoilerFreeHint: 'Lustige Therapiesitzung am Ende des Abspanns.',
				spoilerDescription: 'Tony hat seine ganze Lebensgeschichte Bruce Banner erzählt, der dabei eingeschlafen ist.'
			}
		]
	},
	{
		id: 'mcu-agents-of-shield',
		franchiseId: 'mcu',
		tmdbId: 1403,
		mediaType: 'series',
		title: 'Marvel’s Agents of S.H.I.E.L.D. (Staffel 1–7)',
		releaseDate: '2013-09-24',
		inUniverseYear: '2013–2020',
		timelineAxisYear: '2013',
		runtimeMinutes: 5700,
		episodeCount: 136,
		chronologicalOrder: 12.5,
		releaseOrder: 12,
		phaseOrEra: 'Marvel Television',
		synopsis:
			'Ein durch das T.A.H.I.T.I.-Projekt wiederbelebter Agent Phil Coulson stellt ein Spezialteam (Daisy „Quake“ Johnson, Melinda May, Fitz-Simmons) zusammen und erlebt den Fall von S.H.I.E.L.D. durch HYDRA hautnah.',
		posterGradient: 'from-slate-800 via-sky-950 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'mcu-thor-dark-world',
		franchiseId: 'mcu',
		tmdbId: 76338,
		mediaType: 'movie',
		title: 'Thor: The Dark Kingdom',
		releaseDate: '2013-11-08',
		inUniverseYear: '2013',
		timelineAxisYear: '2013',
		runtimeMinutes: 112,
		chronologicalOrder: 13,
		releaseOrder: 13,
		phaseOrEra: 'Phase 2',
		synopsis:
			'Jane Foster nimmt versehentlich den Äther (Realitätsstein) in sich auf, woraufhin Thor ein riskantes Bündnis mit Loki gegen den Dunkelelfen Malekith eingeht.',
		posterGradient: 'from-red-950 via-slate-900 to-indigo-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-tdw-1',
				sceneType: 'mid_credit',
				importance: 'must_watch',
				spoilerFreeHint: 'Erklärt zum ersten Mal das Konzept der „Infinity-Steine“ und führt den Collector ein!',
				spoilerDescription:
					'Sif und Volstagg übergeben dem Collector auf Knowhere den Äther. Zum ersten Mal fällt der Begriff „Infinity Stones“.'
			},
			{
				id: 'cs-tdw-2',
				sceneType: 'post_credit',
				importance: 'tease',
				spoilerFreeHint: 'Thor kehrt zu Jane nach London zurück.',
				spoilerDescription: 'Thor und Jane küssen sich in London, während ein Frostbiest aus Jotunheim Tauben jagt.'
			}
		]
	},
	{
		id: 'mcu-oneshot-all-hail-the-king',
		franchiseId: 'mcu',
		tmdbId: 253980,
		mediaType: 'oneshot',
		title: 'Marvel One-Shot: All Hail the King',
		releaseDate: '2014-02-04',
		inUniverseYear: '2013',
		timelineAxisYear: '2013',
		runtimeMinutes: 14,
		chronologicalOrder: 14,
		releaseOrder: 14,
		phaseOrEra: 'Phase 2 (One-Shot)',
		synopsis:
			'Trevor Slattery wird im Seagate-Gefängnis von einem Agenten des ECHTEN Mandarin (Wenwu aus Shang-Chi) entführt.',
		posterGradient: 'from-amber-900 via-emerald-950 to-slate-900',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'mcu-cap-winter-soldier',
		franchiseId: 'mcu',
		tmdbId: 100402,
		mediaType: 'movie',
		title: 'Captain America: The Return of the First Avenger (Winter Soldier)',
		releaseDate: '2014-04-04',
		inUniverseYear: '2014',
		timelineAxisYear: '2014',
		runtimeMinutes: 136,
		chronologicalOrder: 15,
		releaseOrder: 15,
		phaseOrEra: 'Phase 2',
		synopsis:
			'Steve Rogers und Black Widow decken auf, dass S.H.I.E.L.D. seit Jahrzehnten von HYDRA unterwandert ist – und treffen auf den totgeglaubten Bucky Barnes.',
		posterGradient: 'from-slate-800 via-blue-950 to-zinc-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-cws-1',
				sceneType: 'mid_credit',
				importance: 'must_watch',
				spoilerFreeHint: 'Führt Wanda (Scarlet Witch) und Pietro Maximoff vor Avengers: Age of Ultron ein!',
				spoilerDescription:
					'Baron von Strucker betrachtet Lokis Zepter und die Zwillinge Wanda und Pietro Maximoff in seinen Zellen.'
			},
			{
				id: 'cs-cws-2',
				sceneType: 'post_credit',
				importance: 'tease',
				spoilerFreeHint: 'Kurzer Epilog mit Bucky Barnes im Museum.',
				spoilerDescription: 'Bucky betrachtet im Smithsonian-Museum die Ausstellung über sein eigenes früheres Leben.'
			}
		]
	},
	{
		id: 'mcu-gotg-1',
		franchiseId: 'mcu',
		tmdbId: 118340,
		mediaType: 'movie',
		title: 'Guardians of the Galaxy',
		releaseDate: '2014-08-01',
		inUniverseYear: '2014',
		timelineAxisYear: '2014',
		runtimeMinutes: 121,
		chronologicalOrder: 16,
		releaseOrder: 16,
		phaseOrEra: 'Phase 2',
		synopsis:
			'Star-Lord, Gamora, Drax, Rocket und Groot raufen sich zusammen, um den Machtstein (Orb) vor Ronan dem Ankläger und Thanos zu schützen.',
		posterGradient: 'from-purple-900 via-fuchsia-950 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-gotg1-1',
				sceneType: 'mid_credit',
				importance: 'tease',
				spoilerFreeHint: 'Süße Szene mit Baby Groot im Blumentopf.',
				spoilerDescription: 'Baby Groot tanzt zu den Jackson 5, friert aber sofort ein, sobald Drax hinschaut.'
			},
			{
				id: 'cs-gotg1-2',
				sceneType: 'post_credit',
				importance: 'joke',
				spoilerFreeHint: 'Skurriler Comic-Cameo beim Collector.',
				spoilerDescription: 'Howard the Duck trinkt im zerstörten Museum des Collectors einen Cocktail.'
			}
		]
	},
	{
		id: 'mcu-i-am-groot',
		franchiseId: 'mcu',
		tmdbId: 114468,
		mediaType: 'series',
		title: 'Ich bin Groot (Staffel 1 & 2 Kurzfilme)',
		releaseDate: '2022-08-10',
		inUniverseYear: '2014',
		timelineAxisYear: '2014',
		runtimeMinutes: 45,
		episodeCount: 10,
		chronologicalOrder: 16.5,
		releaseOrder: 50,
		phaseOrEra: 'Phase 4–5 (Kurzserie)',
		synopsis:
			'Zehn animierte Kurzgeschichten über Baby Groots chaotische Abenteuer im Weltall zwischen Guardians Vol. 1 und Vol. 2.',
		posterGradient: 'from-emerald-900 via-amber-950 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'mcu-gotg-2',
		franchiseId: 'mcu',
		tmdbId: 283995,
		mediaType: 'movie',
		title: 'Guardians of the Galaxy Vol. 2',
		releaseDate: '2017-05-05',
		inUniverseYear: '2014',
		timelineAxisYear: '2014',
		runtimeMinutes: 136,
		chronologicalOrder: 17,
		releaseOrder: 26,
		phaseOrEra: 'Phase 3',
		synopsis:
			'Nur wenige Monate nach Teil 1 begegnet Peter Quill seinem leiblichen Vater Ego, einem lebendigen Planeten mit düsteren Absichten.',
		posterGradient: 'from-fuchsia-900 via-amber-900 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-gotg2-1',
				sceneType: 'mid_credit',
				importance: 'tease',
				spoilerFreeHint: 'Der Film hat insgesamt 5 Abspannszenen – darunter das Setup für Adam Warlock (Vol. 3)!',
				spoilerDescription: 'Ayesha erschafft eine goldene Brutkammer für „Adam“ (Adam Warlock).'
			}
		]
	},
	{
		id: 'mcu-daredevil-s1-s3',
		franchiseId: 'mcu',
		tmdbId: 61889,
		mediaType: 'series',
		title: 'Marvel’s Daredevil (Staffel 1–3)',
		releaseDate: '2015-04-10',
		inUniverseYear: '2014–2017',
		timelineAxisYear: '2015',
		runtimeMinutes: 2050,
		episodeCount: 39,
		chronologicalOrder: 17.2,
		releaseOrder: 17,
		phaseOrEra: 'Defenders-Saga',
		synopsis:
			'Der blinde Anwalt Matt Murdock kämpft nachts in Hell’s Kitchen als Daredevil gegen Wilson Fisk (Kingpin), Frank Castle (Punisher), die Hand und Bullseye.',
		posterGradient: 'from-red-950 via-rose-950 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'mcu-jessica-jones-s1-s3',
		franchiseId: 'mcu',
		tmdbId: 38472,
		mediaType: 'series',
		title: 'Marvel’s Jessica Jones (Staffel 1–3)',
		releaseDate: '2015-11-20',
		inUniverseYear: '2015–2018',
		timelineAxisYear: '2015',
		runtimeMinutes: 1980,
		episodeCount: 39,
		chronologicalOrder: 17.4,
		releaseOrder: 18,
		phaseOrEra: 'Defenders-Saga',
		synopsis:
			'Privatdetektivin Jessica Jones muss sich in New York ihrem größten Trauma stellen: dem gedankenkontrollierenden Kilgrave (David Tennant).',
		posterGradient: 'from-purple-950 via-indigo-950 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'mcu-avengers-age-of-ultron',
		franchiseId: 'mcu',
		tmdbId: 99861,
		mediaType: 'movie',
		title: 'Avengers: Age of Ultron',
		releaseDate: '2015-05-01',
		inUniverseYear: '2015',
		timelineAxisYear: '2015',
		runtimeMinutes: 141,
		chronologicalOrder: 18,
		releaseOrder: 17,
		phaseOrEra: 'Phase 2',
		synopsis:
			'Tony Stark und Bruce Banner erschaffen mithilfe des Gedankensteins die KI Ultron, die die Menschheit auslöschen will – während Vision und Wanda zu Avengers werden.',
		posterGradient: 'from-red-900 via-zinc-900 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: true,
		creditScenes: [
			{
				id: 'cs-aou-1',
				sceneType: 'mid_credit',
				importance: 'must_watch',
				spoilerFreeHint: 'Direkter Startschuss für Avengers: Infinity War!',
				spoilerDescription:
					'Thanos streift sich den leeren Infinity-Handschuh über und sagt: „Gut, dann mache ich es eben selbst.“'
			}
		]
	},
	{
		id: 'mcu-ant-man',
		franchiseId: 'mcu',
		tmdbId: 102899,
		mediaType: 'movie',
		title: 'Ant-Man',
		releaseDate: '2015-07-17',
		inUniverseYear: '2015',
		timelineAxisYear: '2015',
		runtimeMinutes: 117,
		chronologicalOrder: 19,
		releaseOrder: 18,
		phaseOrEra: 'Phase 2 (Finale)',
		synopsis:
			'Meisterdieb Scott Lang übernimmt für Hank Pym den Ant-Man-Anzug und betritt zum ersten Mal den subatomaren Quantenraum.',
		posterGradient: 'from-red-800 via-zinc-900 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-am1-1',
				sceneType: 'mid_credit',
				importance: 'tease',
				spoilerFreeHint: 'Hank Pym zeigt seiner Tochter Hope den neuen Wasp-Anzug.',
				spoilerDescription: 'Hope van Dyne bekommt den Prototypen des Wasp-Anzugs präsentiert.'
			},
			{
				id: 'cs-am1-2',
				sceneType: 'post_credit',
				importance: 'must_watch',
				spoilerFreeHint: 'Direkte Szene aus Captain America: Civil War!',
				spoilerDescription:
					'Steve Rogers und Sam Wilson haben Bucky gefunden; Sam sagt: „Ich kenne da jemanden“ (Scott Lang).'
			}
		]
	},
	{
		id: 'mcu-luke-cage-s1-s2',
		franchiseId: 'mcu',
		tmdbId: 62126,
		mediaType: 'series',
		title: 'Marvel’s Luke Cage (Staffel 1–2)',
		releaseDate: '2016-09-30',
		inUniverseYear: '2015–2017',
		timelineAxisYear: '2016',
		runtimeMinutes: 1400,
		episodeCount: 26,
		chronologicalOrder: 19.3,
		releaseOrder: 21,
		phaseOrEra: 'Defenders-Saga',
		synopsis:
			'Mit kugelsicherer Haut und übermenschlicher Stärke verteidigt Luke Cage Harlem gegen Cottonmouth, Mariah Dillard und Bushmaster.',
		posterGradient: 'from-amber-800 via-yellow-950 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'mcu-iron-fist-s1-s2',
		franchiseId: 'mcu',
		tmdbId: 62127,
		mediaType: 'series',
		title: 'Marvel’s Iron Fist (Staffel 1–2)',
		releaseDate: '2017-03-17',
		inUniverseYear: '2016–2017',
		timelineAxisYear: '2016',
		runtimeMinutes: 1200,
		episodeCount: 23,
		chronologicalOrder: 19.5,
		releaseOrder: 23,
		phaseOrEra: 'Defenders-Saga',
		synopsis:
			'Milliardärserbe Danny Rand kehrt nach 15 Jahren aus der mystischen Stadt K’un-Lun nach New York zurück, um als unsterblicher Iron Fist die „Hand“ zu bekämpfen.',
		posterGradient: 'from-emerald-900 via-amber-950 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'mcu-the-defenders',
		franchiseId: 'mcu',
		tmdbId: 62285,
		mediaType: 'series',
		title: 'Marvel’s The Defenders (Miniserie)',
		releaseDate: '2017-08-18',
		inUniverseYear: '2016',
		timelineAxisYear: '2016',
		runtimeMinutes: 400,
		episodeCount: 8,
		chronologicalOrder: 19.7,
		releaseOrder: 28,
		phaseOrEra: 'Defenders-Saga (Crossover)',
		synopsis:
			'Daredevil, Jessica Jones, Luke Cage und Iron Fist verbünden sich, um New York vor Elektra und der uralten Geheimorganisation „Die Hand“ zu retten (direkte Vorgeschichte zu Daredevil Staffel 3!).',
		posterGradient: 'from-red-900 via-purple-950 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},

	// ==========================================================================
	// 4. PHASE 3 (2016–2019: Finale der Infinity-Saga)
	// ==========================================================================
	{
		id: 'mcu-cap-civil-war',
		franchiseId: 'mcu',
		tmdbId: 271110,
		mediaType: 'movie',
		title: 'Captain America: Civil War',
		releaseDate: '2016-05-06',
		inUniverseYear: '2016',
		timelineAxisYear: '2016',
		runtimeMinutes: 147,
		chronologicalOrder: 20,
		releaseOrder: 20,
		phaseOrEra: 'Phase 3',
		synopsis:
			'Das Sokovia-Abkommen und Baron Zemos Intrige spalten die Avengers in Team Cap und Team Iron Man – inklusive den ersten Auftritten von Spider-Man und Black Panther.',
		posterGradient: 'from-blue-900 via-red-900 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: true,
		creditScenes: [
			{
				id: 'cs-cw-1',
				sceneType: 'mid_credit',
				importance: 'tease',
				spoilerFreeHint: 'Erster Blick auf Wakanda vor Black Panther.',
				spoilerDescription: 'Bucky lässt sich in Wakanda unter T’Challas Schutz wieder in den Kälteschlaf versetzen.'
			},
			{
				id: 'cs-cw-2',
				sceneType: 'post_credit',
				importance: 'tease',
				spoilerFreeHint: 'Kurzer Teaser für Spider-Man: Homecoming.',
				spoilerDescription: 'Peter Parker entdeckt das leuchtende Spinnen-Signal in Tonys neuem Web-Shooter.'
			}
		]
	},
	{
		id: 'mcu-oneshot-team-thor',
		franchiseId: 'mcu',
		tmdbId: 413279,
		mediaType: 'oneshot',
		title: 'Marvel One-Shot: Team Thor (Teil 1, 2 & Team Darryl)',
		releaseDate: '2016-08-28',
		inUniverseYear: '2016 (Non-Canon Mockumentary)',
		timelineAxisYear: '2016',
		runtimeMinutes: 12,
		chronologicalOrder: 20.5,
		releaseOrder: 22,
		phaseOrEra: 'Phase 3 (One-Shot)',
		synopsis:
			'Taika Waititis kultige Mockumentary-Kurzfilme darüber, was Thor (und später der Grandmaster) während Civil War in einer WG mit dem Büroangestellten Darryl in Australien getrieben haben.',
		posterGradient: 'from-amber-800 via-slate-900 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'mcu-black-widow',
		franchiseId: 'mcu',
		tmdbId: 497698,
		mediaType: 'movie',
		title: 'Black Widow',
		releaseDate: '2021-07-09',
		inUniverseYear: '2016',
		timelineAxisYear: '2016',
		runtimeMinutes: 134,
		chronologicalOrder: 21,
		releaseOrder: 41,
		phaseOrEra: 'Phase 4 (Spielt in Phase 3)',
		synopsis:
			'Direkt nach Civil War trifft Natasha Romanoff ihre Ziehschwester Yelena Belova und ihren Ziehvater Red Guardian wieder, um den Roten Raum endgültig zu zerstören.',
		posterGradient: 'from-red-900 via-zinc-900 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-bw-1',
				sceneType: 'post_credit',
				importance: 'must_watch',
				spoilerFreeHint:
					'Spielt NACH Avengers: Endgame (2023)! Sehr wichtig für die Serie Hawkeye & Thunderbolts*.',
				spoilerDescription:
					'Valentina Allegra de Fontaine gibt Yelena an Natashas Grab den Auftrag, Clint Barton (Hawkeye) zu jagen.'
			}
		]
	},
	{
		id: 'mcu-black-panther',
		franchiseId: 'mcu',
		tmdbId: 284054,
		mediaType: 'movie',
		title: 'Black Panther',
		releaseDate: '2018-02-16',
		inUniverseYear: '2016',
		timelineAxisYear: '2016',
		runtimeMinutes: 134,
		chronologicalOrder: 22,
		releaseOrder: 32,
		phaseOrEra: 'Phase 3',
		synopsis:
			'T’Challa kehrt nach dem Tod seines Vaters als König nach Wakanda zurück und wird von Erik Killmonger herausgefordert.',
		posterGradient: 'from-purple-950 via-zinc-900 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-bp-1',
				sceneType: 'mid_credit',
				importance: 'tease',
				spoilerFreeHint: 'T’Challa öffnet Wakanda vor der UNO der Welt.',
				spoilerDescription: 'T’Challa verkündet vor den Vereinten Nationen in Wien das Ende von Wakandas Isolation.'
			},
			{
				id: 'cs-bp-2',
				sceneType: 'post_credit',
				importance: 'tease',
				spoilerFreeHint: 'Kurzes Wiedersehen mit Bucky Barnes vor Infinity War.',
				spoilerDescription: 'Ein geheilter Bucky („White Wolf“) wacht in einer Hütte in Wakanda auf und dankt Shuri.'
			}
		]
	},
	{
		id: 'mcu-spider-man-homecoming',
		franchiseId: 'mcu',
		tmdbId: 315635,
		mediaType: 'movie',
		title: 'Spider-Man: Homecoming',
		releaseDate: '2017-07-07',
		inUniverseYear: '2016',
		timelineAxisYear: '2016',
		runtimeMinutes: 133,
		chronologicalOrder: 23,
		releaseOrder: 27,
		phaseOrEra: 'Phase 3',
		synopsis:
			'Der 15-jährige Peter Parker will sich Tony Stark beweisen und legt sich mit Adrian Toomes (Vulture) an, der außerirdische Chitauri-Waffen verkauft.',
		posterGradient: 'from-red-700 via-blue-900 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-sm1-1',
				sceneType: 'mid_credit',
				importance: 'tease',
				spoilerFreeHint: 'Führt Mac Gargan (Scorpion) im Gefängnis ein.',
				spoilerDescription: 'Adrian Toomes weigert sich im Gefängnis gegenüber Mac Gargan, Spider-Mans Identität zu verraten.'
			},
			{
				id: 'cs-sm1-2',
				sceneType: 'post_credit',
				importance: 'joke',
				spoilerFreeHint: 'Berühmter Meta-Gag mit Captain America über „Geduld“.',
				spoilerDescription:
					'Captain America hält ein Lehrvideo darüber, wie wichtig Geduld ist – selbst wenn sie sich manchmal gar nicht auszahlt.'
			}
		]
	},
	{
		id: 'mcu-the-punisher-s1-s2',
		franchiseId: 'mcu',
		tmdbId: 67178,
		mediaType: 'series',
		title: 'Marvel’s The Punisher (Staffel 1–2)',
		releaseDate: '2017-11-17',
		inUniverseYear: '2016–2018',
		timelineAxisYear: '2016',
		runtimeMinutes: 1380,
		episodeCount: 26,
		chronologicalOrder: 23.5,
		releaseOrder: 31,
		phaseOrEra: 'Defenders-Saga',
		synopsis:
			'Ex-Marine Frank Castle (Jon Bernthal) deckt nach der Rache für den Mord an seiner Familie eine tiefe CIA-Verschwörung rund um seinen ehemaligen Kameraden Billy Russo (Jigsaw) auf.',
		posterGradient: 'from-zinc-800 via-neutral-950 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'mcu-doctor-strange-1',
		franchiseId: 'mcu',
		tmdbId: 284052,
		mediaType: 'movie',
		title: 'Doctor Strange',
		releaseDate: '2016-11-04',
		inUniverseYear: '2016–2017',
		timelineAxisYear: '2016',
		runtimeMinutes: 115,
		chronologicalOrder: 24,
		releaseOrder: 24,
		phaseOrEra: 'Phase 3',
		synopsis:
			'Nach einem schweren Autounfall erlernt der brillante Neurochirurg Stephen Strange in Kamar-Taj die mystischen Künste und schützt das Auge von Agamotto (Zeitstein).',
		posterGradient: 'from-indigo-900 via-teal-950 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-ds1-1',
				sceneType: 'mid_credit',
				importance: 'tease',
				spoilerFreeHint: 'Direkte Szene für Thor: Tag der Entscheidung (Ragnarok).',
				spoilerDescription: 'Strange bietet Thor (mit einem sich ständig nachfüllenden Bierglas) Hilfe bei der Suche nach Odin an.'
			},
			{
				id: 'cs-ds1-2',
				sceneType: 'post_credit',
				importance: 'must_watch',
				spoilerFreeHint: 'Wichtige Wendung für Baron Mordo.',
				spoilerDescription: 'Mordo entzieht Jonathan Pangborn seine Magie und beschließt: „Es gibt zu viele Zauberer.“'
			}
		]
	},
	{
		id: 'mcu-inhumans',
		franchiseId: 'mcu',
		tmdbId: 68716,
		mediaType: 'series',
		title: 'Marvel’s Inhumans (Staffel 1)',
		releaseDate: '2017-09-29',
		inUniverseYear: '2017',
		timelineAxisYear: '2017',
		runtimeMinutes: 340,
		episodeCount: 8,
		chronologicalOrder: 24.3,
		releaseOrder: 29,
		phaseOrEra: 'Marvel Television',
		synopsis:
			'Nach einem Putsch in der Mondstadt Attilan flieht König Black Bolt (Anson Mount, der in Doctor Strange 2 als Illuminati-Mitglied zurückkehrt!) mit der Königsfamilie nach Hawaii.',
		posterGradient: 'from-indigo-950 via-slate-900 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'mcu-runaways-s1-s3',
		franchiseId: 'mcu',
		tmdbId: 67466,
		mediaType: 'series',
		title: 'Marvel’s Runaways (Staffel 1–3)',
		releaseDate: '2017-11-21',
		inUniverseYear: '2017–2018',
		timelineAxisYear: '2017',
		runtimeMinutes: 1550,
		episodeCount: 33,
		chronologicalOrder: 24.5,
		releaseOrder: 30,
		phaseOrEra: 'Marvel Television',
		synopsis:
			'Sechs Teenager in Los Angeles entdecken, dass ihre Eltern einer finsteren Organisation namens „PRIDE“ angehören, und treffen in Staffel 3 auf Morgan le Fay, das Darkhold sowie Cloak & Dagger.',
		posterGradient: 'from-fuchsia-950 via-purple-950 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'mcu-cloak-and-dagger',
		franchiseId: 'mcu',
		tmdbId: 66190,
		mediaType: 'series',
		title: 'Marvel’s Cloak & Dagger (Staffel 1–2)',
		releaseDate: '2018-06-07',
		inUniverseYear: '2017',
		timelineAxisYear: '2017',
		runtimeMinutes: 860,
		episodeCount: 20,
		chronologicalOrder: 24.7,
		releaseOrder: 34,
		phaseOrEra: 'Marvel Television',
		synopsis:
			'Tandy Bowen (Lichtdolche) und Tyrone Johnson (Darkforce-Teleportation) entdecken in New Orleans, dass ihre Kräfte untrennbar miteinander verbunden sind.',
		posterGradient: 'from-sky-950 via-slate-900 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'mcu-thor-ragnarok',
		franchiseId: 'mcu',
		tmdbId: 284053,
		mediaType: 'movie',
		title: 'Thor: Tag der Entscheidung (Ragnarok)',
		releaseDate: '2017-11-03',
		inUniverseYear: '2017–2018',
		timelineAxisYear: '2017',
		runtimeMinutes: 130,
		chronologicalOrder: 25,
		releaseOrder: 30,
		phaseOrEra: 'Phase 3',
		synopsis:
			'Thor strandet ohne Hammer auf dem Müllplaneten Sakaar, kämpft in der Arena gegen den Hulk und muss mit Loki und Valkyrie die Todesgöttin Hela aufhalten.',
		posterGradient: 'from-amber-800 via-rose-900 to-indigo-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-tr-1',
				sceneType: 'mid_credit',
				importance: 'must_watch',
				spoilerFreeHint: 'Mündet auf die Sekunde genau in die Eröffnungsszene von Avengers: Infinity War!',
				spoilerDescription:
					'Das riesige Flaggschiff *Sanctuary II* von Thanos taucht direkt vor dem Flüchtlingsschiff der Asgardianer auf.'
			},
			{
				id: 'cs-tr-2',
				sceneType: 'post_credit',
				importance: 'joke',
				spoilerFreeHint: 'Kurzer Gag mit dem Grandmaster (Jeff Goldblum).',
				spoilerDescription: 'Der gestürzte Grandmaster erklärt die Revolution auf Sakaar kurzerhand für „unentschieden“.'
			}
		]
	},
	{
		id: 'mcu-ant-man-wasp',
		franchiseId: 'mcu',
		tmdbId: 363088,
		mediaType: 'movie',
		title: 'Ant-Man and the Wasp',
		releaseDate: '2018-07-06',
		inUniverseYear: '2018',
		timelineAxisYear: '2018',
		runtimeMinutes: 118,
		chronologicalOrder: 26,
		releaseOrder: 35,
		phaseOrEra: 'Phase 3',
		synopsis:
			'Scott Lang und Hope van Dyne konstruieren einen Quantentunnel, um Janet van Dyne nach 30 Jahren aus dem Quantenraum zu retten.',
		posterGradient: 'from-amber-800 via-red-900 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-amw-1',
				sceneType: 'mid_credit',
				importance: 'must_watch',
				spoilerFreeHint: 'ABSOLUTES PFLICHTPROGRAMM für Avengers: Endgame!',
				spoilerDescription:
					'Während Scott im Quantenraum Heilpartikel sammelt, lösen sich Hank, Janet und Hope draußen durch Thanos’ Fingerschnippen zu Staub auf – Scott sitzt fest!'
			},
			{
				id: 'cs-amw-2',
				sceneType: 'post_credit',
				importance: 'joke',
				spoilerFreeHint: 'Kurzer Gag im verlassenen Haus.',
				spoilerDescription: 'Eine riesige Ameise spielt in Scotts leerer Wohnung Schlagzeug.'
			}
		]
	},
	{
		id: 'mcu-avengers-infinity-war',
		franchiseId: 'mcu',
		tmdbId: 299536,
		mediaType: 'movie',
		title: 'Avengers: Infinity War',
		releaseDate: '2018-04-27',
		inUniverseYear: '2018',
		timelineAxisYear: '2018',
		runtimeMinutes: 149,
		chronologicalOrder: 27,
		releaseOrder: 33,
		phaseOrEra: 'Phase 3 (Event)',
		synopsis:
			'Avengers, Guardians, Doctor Strange und Wakanda stellen sich gemeinsam Thanos entgegen, um zu verhindern, dass er alle sechs Infinity-Steine vereint.',
		posterGradient: 'from-purple-900 via-amber-950 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: true,
		creditScenes: [
			{
				id: 'cs-aiw-1',
				sceneType: 'post_credit',
				importance: 'must_watch',
				spoilerFreeHint: 'Wichtiger Notruf ganz am Ende des Abspanns (Brücke zu Captain Marvel & Endgame)!',
				spoilerDescription:
					'Nick Fury und Maria Hill lösen sich zu Staub auf; im letzten Moment aktiviert Fury einen Pager mit dem Symbol von Captain Marvel.'
			}
		]
	},
	{
		id: 'mcu-avengers-endgame',
		franchiseId: 'mcu',
		tmdbId: 299534,
		mediaType: 'movie',
		title: 'Avengers: Endgame',
		releaseDate: '2019-04-26',
		inUniverseYear: '2018–2023',
		timelineAxisYear: '2023',
		runtimeMinutes: 181,
		chronologicalOrder: 28,
		releaseOrder: 37,
		phaseOrEra: 'Phase 3 (Finale)',
		synopsis:
			'Fünf Jahre nach dem „Blip“ wagen die verbliebenen Avengers einen Zeitreise-Raubzug durch ihre eigene Geschichte, um alle Ausgelöschten zurückzuholen.',
		posterGradient: 'from-purple-900 via-indigo-950 to-slate-900',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: true,
		creditScenes: []
	},

	// ==========================================================================
	// 5. PHASE 4 (2021–2022: Beginn der Multiverse-Saga)
	// ==========================================================================
	{
		id: 'mcu-loki-s1',
		franchiseId: 'mcu',
		tmdbId: 84958,
		mediaType: 'series',
		title: 'Loki – Staffel 1',
		releaseDate: '2021-06-09',
		inUniverseYear: 'Außerhalb der Zeit (TVA)',
		timelineAxisYear: 'TVA',
		runtimeMinutes: 290,
		episodeCount: 6,
		chronologicalOrder: 29,
		releaseOrder: 40,
		phaseOrEra: 'Phase 4',
		synopsis:
			'Nach seiner Flucht mit dem Tesserakt in 2012 landet Loki bei der Time Variance Authority (TVA) und trifft am Ende der Zeit auf „Jenen, der bleibt“.',
		posterGradient: 'from-emerald-900 via-teal-950 to-slate-900',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-lokis1-1',
				sceneType: 'mid_credit',
				importance: 'tease',
				spoilerFreeHint: 'In Episode 4 gibt es eine wichtige Mid-Credit-Scene!',
				spoilerDescription: 'Loki wacht in der Leere (The Void) auf und trifft auf vier andere Loki-Varianten.'
			}
		]
	},
	{
		id: 'mcu-what-if-s1-s3',
		franchiseId: 'mcu',
		tmdbId: 91363,
		mediaType: 'series',
		title: 'What If…? (Staffel 1–3)',
		releaseDate: '2021-08-11',
		inUniverseYear: 'Multiversum',
		timelineAxisYear: 'Multi',
		runtimeMinutes: 720,
		episodeCount: 26,
		chronologicalOrder: 30,
		releaseOrder: 42,
		phaseOrEra: 'Phase 4–5',
		synopsis:
			'Der Watcher beobachtet alternative Zeitlinien des Multiversums (Captain Carter, Strange Supreme, Infinity Ultron, Kahhori).',
		posterGradient: 'from-indigo-900 via-purple-950 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'mcu-wandavision',
		franchiseId: 'mcu',
		tmdbId: 85271,
		mediaType: 'series',
		title: 'WandaVision',
		releaseDate: '2021-01-15',
		inUniverseYear: '2023 (Herbst)',
		timelineAxisYear: '2023',
		runtimeMinutes: 350,
		episodeCount: 9,
		chronologicalOrder: 31,
		releaseOrder: 39,
		phaseOrEra: 'Phase 4',
		synopsis:
			'Wanda Maximoff erschafft aus Trauer um Vision eine Sitcom-Realität in Westview und erwacht im Kampf gegen Agatha Harkness als Scarlet Witch.',
		posterGradient: 'from-rose-900 via-fuchsia-950 to-slate-900',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-wv-1',
				sceneType: 'mid_credit',
				importance: 'tease',
				spoilerFreeHint: 'Folge 9 Mid-Credit-Scene bereitet The Marvels vor.',
				spoilerDescription: 'Eine Skrull-Agentin lädt Monica Rambeau zu Nick Fury in den Weltraum ein.'
			},
			{
				id: 'cs-wv-2',
				sceneType: 'post_credit',
				importance: 'must_watch',
				spoilerFreeHint: 'Folge 9 Post-Credit-Scene ist PFLICHT für Doctor Strange 2!',
				spoilerDescription:
					'Wanda studiert in Astralform das Darkhold und hört die Hilferufe ihrer Söhne aus dem Multiversum.'
			}
		]
	},
	{
		id: 'mcu-shang-chi',
		franchiseId: 'mcu',
		tmdbId: 566525,
		mediaType: 'movie',
		title: 'Shang-Chi and the Legend of the Ten Rings',
		releaseDate: '2021-09-03',
		inUniverseYear: '2024 (Frühling)',
		timelineAxisYear: '2024',
		runtimeMinutes: 132,
		chronologicalOrder: 32,
		releaseOrder: 43,
		phaseOrEra: 'Phase 4',
		synopsis:
			'Shang-Chi muss sich seinem Vater Wenwu (dem wahren Mandarin) und dem mystischen Erbe der Zehn Ringe in der Dimension Ta Lo stellen.',
		posterGradient: 'from-red-900 via-amber-900 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-sc-1',
				sceneType: 'mid_credit',
				importance: 'must_watch',
				spoilerFreeHint: 'Sehr wichtig für die Multiverse-Saga: Die Ringe senden ein kosmisches Signal!',
				spoilerDescription:
					'Wong, Bruce Banner und Captain Marvel untersuchen die Zehn Ringe und entdecken, dass sie älter als jedes bekannte Artefakt sind und ein Signal ins All senden.'
			},
			{
				id: 'cs-sc-2',
				sceneType: 'post_credit',
				importance: 'tease',
				spoilerFreeHint: 'Shang-Chis Schwester Xialing übernimmt die Organisation der Zehn Ringe.',
				spoilerDescription: 'Xialing baut die Zehn Ringe heimlich zu einer modernen Streitmacht um.'
			}
		]
	},
	{
		id: 'mcu-falcon-winter-soldier',
		franchiseId: 'mcu',
		tmdbId: 88396,
		mediaType: 'series',
		title: 'The Falcon and the Winter Soldier',
		releaseDate: '2021-03-19',
		inUniverseYear: '2024',
		timelineAxisYear: '2024',
		runtimeMinutes: 310,
		episodeCount: 6,
		chronologicalOrder: 33,
		releaseOrder: 40,
		phaseOrEra: 'Phase 4',
		synopsis:
			'Sam Wilson übernimmt offiziell das Schild von Captain America, während John Walker zum US Agent wird (wichtig für Brave New World & Thunderbolts*).',
		posterGradient: 'from-blue-900 via-slate-900 to-red-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-tfatws-1',
				sceneType: 'mid_credit',
				importance: 'tease',
				spoilerFreeHint: 'Folge 6 Mid-Credit-Scene mit Sharon Carter.',
				spoilerDescription: 'Die begnadigte Sharon Carter (der „Power Broker“) verschafft sich Zugang zu Regierungsgeheimnissen.'
			}
		]
	},
	{
		id: 'mcu-oneshot-peters-todo-list',
		franchiseId: 'mcu',
		tmdbId: 638507,
		mediaType: 'oneshot',
		title: 'Marvel One-Shot: Peter’s To-Do List',
		releaseDate: '2019-09-17',
		inUniverseYear: '2024',
		timelineAxisYear: '2024',
		runtimeMinutes: 4,
		chronologicalOrder: 33.8,
		releaseOrder: 38,
		phaseOrEra: 'Phase 3 (One-Shot)',
		synopsis:
			'Kurz bevor Peter Parker in Far From Home nach Europa fliegt, besorgt er sich einen Reisepass, verkauft sein altes Star-Wars-Spielzeug und legt im Iron-Spider-Anzug die Manfredi-Mafia lahm.',
		posterGradient: 'from-red-800 via-blue-950 to-slate-950',
		streamingProvider: 'Blu-ray / Bonus',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'mcu-spider-man-far-from-home',
		franchiseId: 'mcu',
		tmdbId: 429617,
		mediaType: 'movie',
		title: 'Spider-Man: Far From Home',
		releaseDate: '2019-07-02',
		inUniverseYear: '2024 (Sommer)',
		timelineAxisYear: '2024',
		runtimeMinutes: 129,
		chronologicalOrder: 34,
		releaseOrder: 38,
		phaseOrEra: 'Phase 3 (Epilog)',
		synopsis:
			'Auf Klassenfahrt durch Europa wird Peter Parker von Mysterio getäuscht, der sich als Held aus einer anderen Erde ausgibt.',
		posterGradient: 'from-red-800 via-emerald-950 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-ffh-1',
				sceneType: 'mid_credit',
				importance: 'must_watch',
				spoilerFreeHint: 'Riesiger Cliffhanger für Spider-Man: No Way Home!',
				spoilerDescription:
					'J. Jonah Jameson (J.K. Simmons) veröffentlicht ein manipuliertes Video von Mysterio und enthüllt der ganzen Welt: „Spider-Man ist Peter Parker!“'
			},
			{
				id: 'cs-ffh-2',
				sceneType: 'post_credit',
				importance: 'tease',
				spoilerFreeHint: 'Überraschung rund um Nick Fury und die Skrulls.',
				spoilerDescription: 'Fury und Hill auf der Erde waren die ganze Zeit die Skrulls Talos und Soren; der echte Fury ist auf einer Raumstation.'
			}
		]
	},
	{
		id: 'mcu-eternals',
		franchiseId: 'mcu',
		tmdbId: 524434,
		mediaType: 'movie',
		title: 'Eternals',
		releaseDate: '2021-11-05',
		inUniverseYear: '2024',
		timelineAxisYear: '2024',
		runtimeMinutes: 156,
		chronologicalOrder: 35,
		releaseOrder: 44,
		phaseOrEra: 'Phase 4',
		synopsis:
			'Unsterbliche kosmische Wesen verhindern die Geburt des Celestials Tiamut aus dem Inneren der Erde (dessen versteinerter Körper später in Brave New World Adamantium liefert).',
		posterGradient: 'from-amber-900 via-teal-950 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-et-1',
				sceneType: 'mid_credit',
				importance: 'tease',
				spoilerFreeHint: 'Stellt Thors Halbbruder Starfox (Eros) und Pip den Troll vor.',
				spoilerDescription: 'Eros (Harry Styles), Bruder von Thanos, erscheint auf dem Schiff der Eternals.'
			},
			{
				id: 'cs-et-2',
				sceneType: 'post_credit',
				importance: 'tease',
				spoilerFreeHint: 'Dane Whitman greift zur verfluchten Ebony Blade (mit Stimm-Cameo von Blade).',
				spoilerDescription: 'Als Dane Whitman das schwarze Schwert berühren will, fragt ihn die Stimme von Blade (Mahershala Ali), ob er dazu bereit sei.'
			}
		]
	},
	{
		id: 'mcu-spider-man-no-way-home',
		franchiseId: 'mcu',
		tmdbId: 634649,
		mediaType: 'movie',
		title: 'Spider-Man: No Way Home',
		releaseDate: '2021-12-17',
		inUniverseYear: '2024 (Herbst/Winter)',
		timelineAxisYear: '2024',
		runtimeMinutes: 148,
		chronologicalOrder: 36,
		releaseOrder: 46,
		phaseOrEra: 'Phase 4 (Event)',
		synopsis:
			'Ein verpatzter Vergessenszauber von Doctor Strange reißt das Multiversum auf und holt Schurken sowie die beiden anderen Spider-Men (Tobey Maguire & Andrew Garfield) ins MCU.',
		posterGradient: 'from-red-700 via-amber-900 to-indigo-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: true,
		creditScenes: [
			{
				id: 'cs-nwh-1',
				sceneType: 'mid_credit',
				importance: 'tease',
				spoilerFreeHint: 'Eddie Brock / Venom hinterlässt ein kleines Geschenk im MCU.',
				spoilerDescription:
					'Eddie Brock wird zurück in sein Universum teleportiert, doch ein Tropfen des schwarzen Venom-Symbionten bleibt auf dem Tresen im MCU zurück.'
			}
		]
	},
	{
		id: 'mcu-dr-strange-mom',
		franchiseId: 'mcu',
		tmdbId: 453395,
		mediaType: 'movie',
		title: 'Doctor Strange in the Multiverse of Madness',
		releaseDate: '2022-05-06',
		inUniverseYear: '2024 (Spätherbst)',
		timelineAxisYear: '2024',
		runtimeMinutes: 126,
		chronologicalOrder: 37,
		releaseOrder: 48,
		phaseOrEra: 'Phase 4',
		synopsis:
			'Stephen Strange schützt America Chavez vor der vom Darkhold korrumpierten Scarlet Witch, reist nach Erde-838 (Illuminati) und löst eine „Inkursion“ aus.',
		posterGradient: 'from-red-950 via-purple-950 to-slate-900',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-ds2-1',
				sceneType: 'mid_credit',
				importance: 'must_watch',
				spoilerFreeHint: 'Sehr wichtig für Avengers: Doomsday & Secret Wars (erklärt „Inkursionen“)!',
				spoilerDescription:
					'Die Zauberin Clea (Charlize Theron) öffnet ein Portal in die Dunkle Dimension und fordert Strange auf, eine Inkursion zu reparieren.'
			},
			{
				id: 'cs-ds2-2',
				sceneType: 'post_credit',
				importance: 'joke',
				spoilerFreeHint: 'Reiner Gag am Ende des Abspanns.',
				spoilerDescription: 'Der Pizza-Poppa (Bruce Campbell) hört endlich auf, sich selbst zu schlagen.'
			}
		]
	},
	{
		id: 'mcu-hawkeye',
		franchiseId: 'mcu',
		tmdbId: 88329,
		mediaType: 'series',
		title: 'Hawkeye',
		releaseDate: '2021-11-24',
		inUniverseYear: '2024 (Weihnachten)',
		timelineAxisYear: '2024',
		runtimeMinutes: 270,
		episodeCount: 6,
		chronologicalOrder: 38,
		releaseOrder: 45,
		phaseOrEra: 'Phase 4',
		synopsis:
			'Clint Barton bildet im weihnachtlichen New York die junge Bogenschützin Kate Bishop aus – während Yelena Belova und Wilson Fisk (Kingpin) auftauchen.',
		posterGradient: 'from-purple-900 via-indigo-950 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-he-1',
				sceneType: 'post_credit',
				importance: 'joke',
				spoilerFreeHint: 'Komplette Musical-Nummer „Save the City“ aus Rogers: The Musical in Folge 6.',
				spoilerDescription: 'Die volle Broadway-Performance des Avengers-Musicals.'
			}
		]
	},
	{
		id: 'mcu-moon-knight',
		franchiseId: 'mcu',
		tmdbId: 92749,
		mediaType: 'series',
		title: 'Moon Knight',
		releaseDate: '2022-03-30',
		inUniverseYear: '2025',
		timelineAxisYear: '2025',
		runtimeMinutes: 285,
		episodeCount: 6,
		chronologicalOrder: 39,
		releaseOrder: 47,
		phaseOrEra: 'Phase 4',
		synopsis:
			'Steven Grant und Marc Spector teilen sich einen Körper als Avatar des ägyptischen Mondgottes Khonshu.',
		posterGradient: 'from-slate-700 via-zinc-900 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-mk-1',
				sceneType: 'mid_credit',
				importance: 'must_watch',
				spoilerFreeHint: 'Wichtige Enthüllung der dritten Persönlichkeit in Folge 6!',
				spoilerDescription: 'Khonshu stellt Arthur Harrow die skrupellose dritte Persönlichkeit Jake Lockley vor.'
			}
		]
	},
	{
		id: 'mcu-black-panther-wakanda-forever',
		franchiseId: 'mcu',
		tmdbId: 505642,
		mediaType: 'movie',
		title: 'Black Panther: Wakanda Forever',
		releaseDate: '2022-11-11',
		inUniverseYear: '2025',
		timelineAxisYear: '2025',
		runtimeMinutes: 161,
		chronologicalOrder: 40,
		releaseOrder: 53,
		phaseOrEra: 'Phase 4 (Finale)',
		synopsis:
			'Nach König T’Challas Tod muss Shuri Wakanda gegen den Unterwasserkönig Namor (mit Mutanten-Gen) verteidigen und wird selbst zum neuen Black Panther.',
		posterGradient: 'from-indigo-950 via-teal-950 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-wf-1',
				sceneType: 'mid_credit',
				importance: 'must_watch',
				spoilerFreeHint: 'Sehr emotionale Szene in der Mitte des Abspanns (keine Post-Credit-Scene am Ende!).',
				spoilerDescription: 'Nakia stellt Shuri auf Haiti T’Challas jungen Sohn Prinz T’Challa II (Toussaint) vor.'
			}
		]
	},
	{
		id: 'mcu-echo',
		franchiseId: 'mcu',
		tmdbId: 122226,
		mediaType: 'series',
		title: 'Echo',
		releaseDate: '2024-01-09',
		inUniverseYear: '2025',
		timelineAxisYear: '2025',
		runtimeMinutes: 200,
		episodeCount: 5,
		chronologicalOrder: 40.5,
		releaseOrder: 59,
		phaseOrEra: 'Phase 5',
		synopsis:
			'Maya Lopez kehrt nach den Ereignissen von Hawkeye in ihre Heimatstadt in Oklahoma zurück und stellt sich Wilson Fisk (Kingpin).',
		posterGradient: 'from-rose-950 via-zinc-900 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-echo-1',
				sceneType: 'post_credit',
				importance: 'must_watch',
				spoilerFreeHint: 'Folge 5 Post-Credit-Scene leitet direkt Daredevil: Born Again ein!',
				spoilerDescription: 'Kingpin erfährt im Privatjet im Fernsehen, dass New York einen starken Bürgermeister-Kandidaten sucht.'
			}
		]
	},
	{
		id: 'mcu-she-hulk',
		franchiseId: 'mcu',
		tmdbId: 92783,
		mediaType: 'series',
		title: 'She-Hulk: Die Anwältin',
		releaseDate: '2022-08-18',
		inUniverseYear: '2025',
		timelineAxisYear: '2025',
		runtimeMinutes: 260,
		episodeCount: 9,
		chronologicalOrder: 41,
		releaseOrder: 51,
		phaseOrEra: 'Phase 4',
		synopsis:
			'Anwältin Jennifer Walters erhält durch Bruces Blut Hulk-Kräfte, durchbricht die vierte Wand und trifft auf Matt Murdock (Daredevil).',
		posterGradient: 'from-emerald-800 via-lime-950 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'mcu-ms-marvel',
		franchiseId: 'mcu',
		tmdbId: 92782,
		mediaType: 'series',
		title: 'Ms. Marvel',
		releaseDate: '2022-06-08',
		inUniverseYear: '2025',
		timelineAxisYear: '2025',
		runtimeMinutes: 270,
		episodeCount: 6,
		chronologicalOrder: 42,
		releaseOrder: 49,
		phaseOrEra: 'Phase 4',
		synopsis:
			'Teenagerin Kamala Khan entdeckt durch einen kosmischen Armreif ihre Kräfte – und erfährt im Finale, dass sie eine „Mutation“ in ihren Genen trägt.',
		posterGradient: 'from-fuchsia-900 via-rose-900 to-indigo-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-mm-1',
				sceneType: 'post_credit',
				importance: 'must_watch',
				spoilerFreeHint: 'Folge 6 Post-Credit-Scene mündet direkt in den Film The Marvels!',
				spoilerDescription: 'Kamalas Armreif glüht auf und sie tauscht plötzlich den Platz mit Captain Marvel (Carol Danvers).'
			}
		]
	},
	{
		id: 'mcu-thor-love-and-thunder',
		franchiseId: 'mcu',
		tmdbId: 616037,
		mediaType: 'movie',
		title: 'Thor: Love and Thunder',
		releaseDate: '2022-07-08',
		inUniverseYear: '2025',
		timelineAxisYear: '2025',
		runtimeMinutes: 119,
		chronologicalOrder: 43,
		releaseOrder: 50,
		phaseOrEra: 'Phase 4',
		synopsis:
			'Thor kämpft an der Seite von Jane Foster (Mighty Thor) gegen Gorr den Götterschlächter.',
		posterGradient: 'from-pink-900 via-amber-900 to-indigo-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-tlat-1',
				sceneType: 'mid_credit',
				importance: 'tease',
				spoilerFreeHint: 'Zeus schickt seinen Sohn Herkules los.',
				spoilerDescription: 'Ein wütender Zeus beauftragt Herkules (Brett Goldstein), Thor zur Strecke zu bringen.'
			},
			{
				id: 'cs-tlat-2',
				sceneType: 'post_credit',
				importance: 'tease',
				spoilerFreeHint: 'Jane Foster erreicht Walhalla.',
				spoilerDescription: 'Heimdall heißt Jane Foster am Tor von Walhalla willkommen.'
			}
		]
	},
	{
		id: 'mcu-werewolf-by-night',
		franchiseId: 'mcu',
		tmdbId: 894205,
		mediaType: 'special',
		title: 'Werewolf by Night (Special Presentation)',
		releaseDate: '2022-10-07',
		inUniverseYear: '2025',
		timelineAxisYear: '2025',
		runtimeMinutes: 52,
		chronologicalOrder: 44,
		releaseOrder: 52,
		phaseOrEra: 'Phase 4 (Special)',
		synopsis:
			'Ein atmosphärisches Schwarz-Weiß-Horror-Special über Monsterjäger, den Blutstein, Elsa Bloodstone und Man-Thing.',
		posterGradient: 'from-zinc-800 via-stone-900 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'mcu-gotg-holiday-special',
		franchiseId: 'mcu',
		tmdbId: 774752,
		mediaType: 'special',
		title: 'The Guardians of the Galaxy Holiday Special',
		releaseDate: '2022-11-25',
		inUniverseYear: '2025 (Weihnachten)',
		timelineAxisYear: '2025',
		runtimeMinutes: 44,
		chronologicalOrder: 45,
		releaseOrder: 54,
		phaseOrEra: 'Phase 4 (Special)',
		synopsis:
			'Drax und Mantis reisen auf die Erde, um Kevin Bacon als Weihnachtsgeschenk für Peter Quill zu entführen – und Mantis verrät, dass sie Peters Halbschwester ist.',
		posterGradient: 'from-red-800 via-emerald-900 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-gotghs-1',
				sceneType: 'post_credit',
				importance: 'joke',
				spoilerFreeHint: 'Kurzer Weihnachts-Gag mit Rocket und Groot.',
				spoilerDescription: 'Groot lässt seine Arme sinken und ruiniert die Weihnachtsbaum-Verkleidung.'
			}
		]
	},

	// ==========================================================================
	// 6. PHASE 5 (2023–2025) & MULTIVERSE LEGACY (X-MEN / SPIDER-MAN)
	// ==========================================================================
	{
		id: 'mcu-ant-man-quantumania',
		franchiseId: 'mcu',
		tmdbId: 640146,
		mediaType: 'movie',
		title: 'Ant-Man and the Wasp: Quantumania',
		releaseDate: '2023-02-17',
		inUniverseYear: '2026',
		timelineAxisYear: '2026',
		runtimeMinutes: 124,
		chronologicalOrder: 46,
		releaseOrder: 55,
		phaseOrEra: 'Phase 5',
		synopsis:
			'Scott Lang und seine Familie werden tief in den Quantenraum gezogen und stellen sich dem verbannten Eroberer Kang entgegen.',
		posterGradient: 'from-purple-900 via-cyan-950 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-amq-1',
				sceneType: 'mid_credit',
				importance: 'tease',
				spoilerFreeHint: 'Der Rat der Kangs versammelt sich.',
				spoilerDescription: 'Tausende Kang-Varianten versammeln sich in einer interdimensionalen Arena.'
			},
			{
				id: 'cs-amq-2',
				sceneType: 'post_credit',
				importance: 'must_watch',
				spoilerFreeHint: 'Direkte Szene aus Loki Staffel 2 (Folge 3)!',
				spoilerDescription: 'Loki und Mobius entdecken im Jahr 1893 den Erfinder Victor Timely auf einer Bühne.'
			}
		]
	},
	{
		id: 'mcu-gotg-3',
		franchiseId: 'mcu',
		tmdbId: 447365,
		mediaType: 'movie',
		title: 'Guardians of the Galaxy Vol. 3',
		releaseDate: '2023-05-05',
		inUniverseYear: '2026',
		timelineAxisYear: '2026',
		runtimeMinutes: 150,
		chronologicalOrder: 47,
		releaseOrder: 56,
		phaseOrEra: 'Phase 5',
		synopsis:
			'Das emotionale Finale der Guardians-Trilogie: Um Rockets Leben zu retten, muss das Team seinen grausamen Schöpfer, den High Evolutionary, besiegen.',
		posterGradient: 'from-sky-900 via-rose-900 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-gotg3-1',
				sceneType: 'mid_credit',
				importance: 'tease',
				spoilerFreeHint: 'Zeigt das neue Guardians-Team unter Rockets Führung.',
				spoilerDescription: 'Rocket führt das neue Guardians-Team (Groot, Kraglin, Cosmo, Adam Warlock, Phyla) in einen Einsatz.'
			},
			{
				id: 'cs-gotg3-2',
				sceneType: 'post_credit',
				importance: 'tease',
				spoilerFreeHint: 'Peter Quill auf der Erde + Hinweis „The Legendary Star-Lord Will Return“.',
				spoilerDescription: 'Peter frühstückt auf der Erde gemütlich mit seinem Großvater.'
			}
		]
	},
	{
		id: 'mcu-secret-invasion',
		franchiseId: 'mcu',
		tmdbId: 114472,
		mediaType: 'series',
		title: 'Secret Invasion',
		releaseDate: '2023-06-21',
		inUniverseYear: '2026',
		timelineAxisYear: '2026',
		runtimeMinutes: 230,
		episodeCount: 6,
		chronologicalOrder: 48,
		releaseOrder: 57,
		phaseOrEra: 'Phase 5',
		synopsis:
			'Nick Fury kehrt auf die Erde zurück, um eine abtrünnige Fraktion gestaltwandelnder Skrulls unter Gravik aufzuhalten.',
		posterGradient: 'from-emerald-950 via-slate-900 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'mcu-loki-s2',
		franchiseId: 'mcu',
		tmdbId: 849582,
		mediaType: 'series',
		title: 'Loki – Staffel 2',
		releaseDate: '2023-10-05',
		inUniverseYear: 'Außerhalb der Zeit (TVA)',
		timelineAxisYear: 'TVA',
		runtimeMinutes: 305,
		episodeCount: 6,
		chronologicalOrder: 49,
		releaseOrder: 58,
		phaseOrEra: 'Phase 5',
		synopsis:
			'Der Webstuhl der Zeit kollabiert. Loki zerstört den Webstuhl und wird selbst zum „Gott der Geschichten“, der die Stränge des Multiversums als Weltenbaum Yggdrasil am Leben hält.',
		posterGradient: 'from-emerald-800 via-green-950 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'mcu-the-marvels',
		franchiseId: 'mcu',
		tmdbId: 609681,
		mediaType: 'movie',
		title: 'The Marvels',
		releaseDate: '2023-11-10',
		inUniverseYear: '2026',
		timelineAxisYear: '2026',
		runtimeMinutes: 105,
		chronologicalOrder: 50,
		releaseOrder: 59,
		phaseOrEra: 'Phase 5',
		synopsis:
			'Carol Danvers, Kamala Khan und Monica Rambeau müssen einen Riss in der Raumzeit schließen – wobei Monica auf der anderen Seite im X-Men-Universum gefangen bleibt.',
		posterGradient: 'from-fuchsia-900 via-indigo-950 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-marvels-1',
				sceneType: 'mid_credit',
				importance: 'must_watch',
				spoilerFreeHint: 'EXTREM WICHTIG für Avengers: Doomsday! Verbindet das MCU direkt mit den X-Men.',
				spoilerDescription:
					'Monica Rambeau wacht in einem Paralleluniversum in der X-Mansion auf – neben Binary (Maria Rambeau) und Hank McCoy / Beast (Kelsey Grammer).'
			}
		]
	},
	{
		id: 'mcu-xmen-legacy-collection',
		franchiseId: 'mcu',
		tmdbId: 36657,
		mediaType: 'movie',
		title: 'X-Men Legacy: X-Men 1–2, Zukunft ist Vergangenheit & Logan (Erde-10005)',
		releaseDate: '2000-07-14',
		inUniverseYear: 'Erde-10005 (Multiversum)',
		timelineAxisYear: 'X-Men',
		runtimeMinutes: 510,
		chronologicalOrder: 51.2,
		releaseOrder: 60,
		phaseOrEra: 'Multiverse Legacy (Für Doomsday)',
		synopsis:
			'Die zentralen Fox-X-Men-Filme rund um Professor X (Patrick Stewart), Magneto (Ian McKellen), Beast (Kelsey Grammer), Nightcrawler (Alan Cumming), Cyclops (James Marsden), Mystique (Rebecca Romijn) und Wolverine (Hugh Jackman), die in Deadpool & Wolverine sowie Avengers: Doomsday ins MCU zurückkehren!',
		posterGradient: 'from-amber-700 via-blue-950 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'mcu-xmen-97',
		franchiseId: 'mcu',
		tmdbId: 138502,
		mediaType: 'series',
		title: 'X-Men ’97 (Staffel 1 & 2)',
		releaseDate: '2024-03-20',
		inUniverseYear: '1997 (Parallelwelt)',
		timelineAxisYear: 'X-97',
		runtimeMinutes: 340,
		episodeCount: 10,
		chronologicalOrder: 51.5,
		releaseOrder: 61,
		phaseOrEra: 'Phase 5 (Multiversum)',
		synopsis:
			'Gefeierte Marvel-Animation-Fortsetzung der 90er-Serie: Cyclops, Jean Grey, Wolverine, Gambit, Rogue und Magneto kämpfen gegen Bastion und reisen durch die Zeit zu Apocalypse.',
		posterGradient: 'from-yellow-700 via-blue-900 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'mcu-deadpool-wolverine',
		franchiseId: 'mcu',
		tmdbId: 533535,
		mediaType: 'movie',
		title: 'Deadpool & Wolverine',
		releaseDate: '2024-07-26',
		inUniverseYear: '2024 / Leere',
		timelineAxisYear: '2024',
		runtimeMinutes: 128,
		chronologicalOrder: 52,
		releaseOrder: 62,
		phaseOrEra: 'Phase 5',
		synopsis:
			'Die TVA holt Wade Wilson ins MCU: Als das „Anchor Being“ seines Universums (Erde-10005) stirbt, muss er mit einer Wolverine-Variante (sowie Blade, Elektra, X-23 & Gambit) die Leere überleben.',
		posterGradient: 'from-red-800 via-yellow-900 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-dpw-1',
				sceneType: 'post_credit',
				importance: 'joke',
				spoilerFreeHint: 'Urkomische Auflösung eines Running Gags aus dem ersten Akt des Films.',
				spoilerDescription:
					'Deadpool zeigt die Überwachungskamera-Aufnahme aus der TVA, die beweist, dass Johnny Storm (Chris Evans) den Schimpfwort-Monolog über Cassandra Nova tatsächlich gehalten hat.'
			}
		]
	},
	{
		id: 'mcu-agatha-all-along',
		franchiseId: 'mcu',
		tmdbId: 138501,
		mediaType: 'series',
		title: 'Agatha All Along',
		releaseDate: '2024-09-18',
		inUniverseYear: '2026',
		timelineAxisYear: '2026',
		runtimeMinutes: 330,
		episodeCount: 9,
		chronologicalOrder: 53,
		releaseOrder: 63,
		phaseOrEra: 'Phase 5',
		synopsis:
			'Agatha Harkness befreit sich mit Hilfe von Wandas wiedergeborenem Sohn Billy Maximoff (Wiccan) aus Wandas Zauber und betritt den Hexenweg.',
		posterGradient: 'from-purple-900 via-violet-950 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'mcu-friendly-neighborhood-spiderman',
		franchiseId: 'mcu',
		tmdbId: 138503,
		mediaType: 'series',
		title: 'Der freundliche Spider-Man aus der Nachbarschaft (Staffel 1)',
		releaseDate: '2025-01-29',
		inUniverseYear: '2016 (Alternative Timeline)',
		timelineAxisYear: 'Alt-16',
		runtimeMinutes: 280,
		episodeCount: 10,
		chronologicalOrder: 53.5,
		releaseOrder: 64,
		phaseOrEra: 'Phase 5 (Multiversum)',
		synopsis:
			'In einer alternativen MCU-Zeitlinie wird der junge Peter Parker nicht von Tony Stark, sondern von Norman Osborn als Mentor unter die Fittiche genommen.',
		posterGradient: 'from-red-700 via-sky-900 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'mcu-daredevil-born-again-s1',
		franchiseId: 'mcu',
		tmdbId: 202555,
		mediaType: 'series',
		title: 'Daredevil: Born Again – Staffel 1',
		releaseDate: '2025-03-04',
		inUniverseYear: '2026–2027',
		timelineAxisYear: '2026',
		runtimeMinutes: 400,
		episodeCount: 9,
		chronologicalOrder: 54,
		releaseOrder: 66,
		phaseOrEra: 'Phase 5',
		synopsis:
			'Wilson Fisk wird zum Bürgermeister von New York gewählt und erklärt alle maskierten Selbstjustizler für vogelfrei, woraufhin Matt Murdock und der Punisher zurückschlagen.',
		posterGradient: 'from-red-950 via-rose-900 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-ddba-1',
				sceneType: 'post_credit',
				importance: 'tease',
				spoilerFreeHint: 'In Folge 9 gibt es eine Post-Credit-Scene mit Frank Castle (Punisher).',
				spoilerDescription: 'Frank Castle überlistet einen der korrupten Wärter in Fisks Privatgefängnis und bricht aus.'
			}
		]
	},
	{
		id: 'mcu-cap-brave-new-world',
		franchiseId: 'mcu',
		tmdbId: 822119,
		mediaType: 'movie',
		title: 'Captain America: Brave New World',
		releaseDate: '2025-02-14',
		inUniverseYear: '2026–2027',
		timelineAxisYear: '2026',
		runtimeMinutes: 118,
		chronologicalOrder: 55,
		releaseOrder: 65,
		phaseOrEra: 'Phase 5',
		synopsis:
			'Sam Wilson gerät als neuer Captain America in einen internationalen Konflikt um das Adamantium aus dem Celestial Tiamut und Präsident Thaddeus „Red Hulk“ Ross.',
		posterGradient: 'from-blue-900 via-red-900 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-cap4-1',
				sceneType: 'post_credit',
				importance: 'must_watch',
				spoilerFreeHint: 'Direkte Warnung vor einer Bedrohung aus anderen Universen (Doomsday-Setup!).',
				spoilerDescription:
					'Samuel Sterns (The Leader) warnt Sam Wilson im Raft-Gefängnis mittels Wahrscheinlichkeitsberechnungen vor einer drohenden Kollision mit den „Anderen“ aus fremden Welten.'
			}
		]
	},
	{
		id: 'mcu-thunderbolts',
		franchiseId: 'mcu',
		tmdbId: 986056,
		mediaType: 'movie',
		title: 'Thunderbolts* (*The New Avengers)',
		releaseDate: '2025-05-02',
		inUniverseYear: '2027',
		timelineAxisYear: '2027',
		runtimeMinutes: 126,
		chronologicalOrder: 56,
		releaseOrder: 67,
		phaseOrEra: 'Phase 5 (Finale)',
		synopsis:
			'Yelena Belova, Bucky Barnes, Red Guardian, Ghost und US Agent werden in eine tödliche Falle gelockt, retten den übermächtigen „Bob“ (Sentry/The Void) und werden zu den *New Avengers.',
		posterGradient: 'from-amber-800 via-zinc-900 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-tb-1',
				sceneType: 'mid_credit',
				importance: 'joke',
				spoilerFreeHint: 'Kurzer Gag im Supermarkt mit Red Guardian.',
				spoilerDescription:
					'Alexei versucht im Supermarkt eine Kundin davon zu überzeugen, die Wheaties-Packung mit den „New Avengers“ zu kaufen.'
			},
			{
				id: 'cs-tb-2',
				sceneType: 'post_credit',
				importance: 'must_watch',
				spoilerFreeHint: 'ABSOLUTES PFLICHTPROGRAMM! Längste Post-Credit-Scene des MCU – führt direkt in Fantastic Four & Doomsday!',
				spoilerDescription:
					'14 Monate später streiten die New Avengers im Watchtower über Markenrechte mit Sam Wilson, als ein interdimensionales Raumschiff mit dem „4“-Logo aus einer anderen Dimension in den Erdorbit eintritt.'
			}
		]
	},
	{
		id: 'mcu-ironheart',
		franchiseId: 'mcu',
		tmdbId: 114471,
		mediaType: 'series',
		title: 'Ironheart',
		releaseDate: '2025-06-24',
		inUniverseYear: '2025–2026',
		timelineAxisYear: '2026',
		runtimeMinutes: 270,
		episodeCount: 6,
		chronologicalOrder: 57,
		releaseOrder: 68,
		phaseOrEra: 'Phase 5',
		synopsis:
			'Riri Williams kehrt nach Wakanda Forever nach Chicago zurück, wo ihre High-Tech-Rüstung auf die dunkle Magie von Parker Robbins (The Hood) und Mephisto trifft.',
		posterGradient: 'from-red-900 via-amber-900 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},

	// ==========================================================================
	// 7. PHASE 6 (2025–2027: Finale der Multiverse-Saga)
	// ==========================================================================
	{
		id: 'mcu-fantastic-four',
		franchiseId: 'mcu',
		tmdbId: 617126,
		mediaType: 'movie',
		title: 'The Fantastic Four: First Steps',
		releaseDate: '2025-07-25',
		inUniverseYear: '1960s (Erde-828)',
		timelineAxisYear: '1960s*',
		runtimeMinutes: 130,
		chronologicalOrder: 58,
		releaseOrder: 69,
		phaseOrEra: 'Phase 6',
		synopsis:
			'Auf der retro-futuristischen Parallel-Erde-828 müssen Reed Richards, Sue Storm, Johnny Storm und Ben Grimm ihren neugeborenen Sohn Franklin Richards und ihre Welt vor Galactus retten.',
		posterGradient: 'from-sky-800 via-blue-950 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-f4-1',
				sceneType: 'mid_credit',
				importance: 'must_watch',
				spoilerFreeHint: 'DIE wichtigste Szene vor Avengers: Doomsday – stellt Doctor Doom vor!',
				spoilerDescription:
					'Vier Jahre später im Baxter Building: Sue findet den kleinen Franklin Richards vor einer knienden Gestalt im grünen Umhang mit silberner Maske in der Hand – Victor von Doom!'
			},
			{
				id: 'cs-f4-2',
				sceneType: 'post_credit',
				importance: 'tease',
				spoilerFreeHint: 'Nostalgischer 60er-Jahre-Cartoon-Clip am Ende des Abspanns.',
				spoilerDescription: 'Ein Retro-Zeichentrick-Intro der Fantastic Four mit H.E.R.B.I.E.'
			}
		]
	},
	{
		id: 'mcu-marvel-zombies',
		franchiseId: 'mcu',
		tmdbId: 138504,
		mediaType: 'series',
		title: 'Marvel Zombies (Miniserie)',
		releaseDate: '2025-10-03',
		inUniverseYear: 'Multiversum (Zombie-Erde)',
		timelineAxisYear: 'Multi',
		runtimeMinutes: 120,
		episodeCount: 4,
		chronologicalOrder: 58.5,
		releaseOrder: 71,
		phaseOrEra: 'Phase 6 (Animation)',
		synopsis:
			'Eine Gruppe überlebender Helden (Kamala Khan, Yelena, Kate Bishop, Shang-Chi, Blade Knight) kämpft gegen eine Welt voller infizierter Zombie-Avengers.',
		posterGradient: 'from-emerald-950 via-red-950 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'mcu-wonder-man',
		franchiseId: 'mcu',
		tmdbId: 204082,
		mediaType: 'series',
		title: 'Wonder Man',
		releaseDate: '2025-12-10',
		inUniverseYear: '2026',
		timelineAxisYear: '2026',
		runtimeMinutes: 260,
		episodeCount: 8,
		chronologicalOrder: 59,
		releaseOrder: 72,
		phaseOrEra: 'Phase 6',
		synopsis:
			'Hollywood-Schauspieler Simon Williams bewirbt sich gemeinsam mit Trevor Slattery für ein Superhelden-Remake und entwickelt echte Ionen-Superkräfte.',
		posterGradient: 'from-purple-900 via-rose-900 to-slate-950',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'mcu-daredevil-born-again-s2',
		franchiseId: 'mcu',
		tmdbId: 202556,
		mediaType: 'series',
		title: 'Daredevil: Born Again – Staffel 2',
		releaseDate: '2026-03-24',
		inUniverseYear: '2027',
		timelineAxisYear: '2027',
		runtimeMinutes: 360,
		episodeCount: 8,
		chronologicalOrder: 60,
		releaseOrder: 73,
		phaseOrEra: 'Phase 6',
		synopsis:
			'Matt Murdock formiert im Kriegsrechts-New-York gemeinsam mit Jessica Jones einen Widerstand gegen Bürgermeister Fisks Anti-Vigilanten-Armee.',
		posterGradient: 'from-red-900 via-zinc-950 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'mcu-punisher-special',
		franchiseId: 'mcu',
		tmdbId: 1442100,
		mediaType: 'special',
		title: 'The Punisher (Special Presentation)',
		releaseDate: '2026-06-12',
		inUniverseYear: '2027',
		timelineAxisYear: '2027',
		runtimeMinutes: 55,
		chronologicalOrder: 61,
		releaseOrder: 74,
		phaseOrEra: 'Phase 6 (Special)',
		synopsis:
			'Nach seinem Ausbruch aus Fisks Gefängnis räumt Frank Castle in einer kompromisslosen Einzelmission mit einer korrupten Söldnertruppe auf.',
		posterGradient: 'from-zinc-900 via-neutral-950 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'mcu-spider-man-brand-new-day',
		franchiseId: 'mcu',
		tmdbId: 969681,
		mediaType: 'movie',
		title: 'Spider-Man: Brand New Day',
		releaseDate: '2026-07-31',
		inUniverseYear: '2027',
		timelineAxisYear: '2027',
		runtimeMinutes: 138,
		chronologicalOrder: 62,
		releaseOrder: 75,
		phaseOrEra: 'Phase 6',
		synopsis:
			'Peter Parker kämpft als anonymer Netzschwinger in New York an der Seite des Punishers und Hulks – während am Ende die Multiversums-Kollision von Doomsday einsetzt.',
		posterGradient: 'from-red-700 via-blue-900 to-slate-950',
		streamingProvider: 'Kino / Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: [
			{
				id: 'cs-spidey4-1',
				sceneType: 'mid_credit',
				importance: 'tease',
				spoilerFreeHint: 'Street-Level-Szene für die Verteidiger von New York.',
				spoilerDescription: 'Matt Murdock und Spider-Man begegnen sich auf den Dächern von Hell’s Kitchen.'
			},
			{
				id: 'cs-spidey4-2',
				sceneType: 'post_credit',
				importance: 'must_watch',
				spoilerFreeHint: 'PFLICHT-SZENE für Avengers: Doomsday! Verbindet Spider-Man direkt mit der Ankunft von Doctor Doom.',
				spoilerDescription:
					'Peters Spinnensinn schlägt Alarm, als sich der Himmel über New York durch eine Inkursion spaltet.'
			}
		]
	},
	{
		id: 'mcu-vision-quest',
		franchiseId: 'mcu',
		tmdbId: 213025,
		mediaType: 'series',
		title: 'Vision Quest',
		releaseDate: '2026-10-14',
		inUniverseYear: '2027',
		timelineAxisYear: '2027',
		runtimeMinutes: 270,
		episodeCount: 6,
		chronologicalOrder: 63,
		releaseOrder: 76,
		phaseOrEra: 'Phase 6',
		synopsis:
			'Der weiße Vision aus WandaVision versucht seine menschlichen Emotionen zurückzugewinnen, während Ultron (James Spader) und Jocasta wieder auftauchen.',
		posterGradient: 'from-slate-700 via-sky-950 to-black',
		streamingProvider: 'Disney+',
		isUpcoming: false,
		isEventMilestone: false,
		creditScenes: []
	},
	{
		id: 'mcu-avengers-doomsday',
		franchiseId: 'mcu',
		tmdbId: 1003596,
		mediaType: 'movie',
		title: 'Avengers: Doomsday',
		releaseDate: '2026-12-18',
		inUniverseYear: '2027 (Inkursion)',
		timelineAxisYear: '2027',
		runtimeMinutes: 165,
		chronologicalOrder: 64,
		releaseOrder: 77,
		phaseOrEra: 'Phase 6 (Event)',
		synopsis:
			'Doctor Doom (Robert Downey Jr.) will das kollabierende Multiversum unter seiner Kontrolle retten. Sam Wilsons Avengers, die *New Avengers (Thunderbolts*), die Fantastic Four, Wakanda und die Original-X-Men treffen aufeinander.',
		posterGradient: 'from-emerald-900 via-green-950 to-black',
		streamingProvider: 'Kino-Event',
		isUpcoming: true,
		isEventMilestone: true,
		creditScenes: []
	},
	{
		id: 'mcu-avengers-secret-wars',
		franchiseId: 'mcu',
		tmdbId: 1003598,
		mediaType: 'movie',
		title: 'Avengers: Secret Wars',
		releaseDate: '2027-12-17',
		inUniverseYear: 'Battleworld',
		timelineAxisYear: '2027+',
		runtimeMinutes: 180,
		chronologicalOrder: 65,
		releaseOrder: 78,
		phaseOrEra: 'Phase 6 (Finale)',
		synopsis:
			'Das große Finale der Multiverse-Saga: Auf der aus Bruchstücken geretteter Universen erschaffenen „Battleworld“ kämpfen die Helden aller Marvel-Ären gegen God Emperor Doom.',
		posterGradient: 'from-amber-900 via-emerald-950 to-black',
		streamingProvider: 'Kino-Event',
		isUpcoming: true,
		isEventMilestone: true,
		creditScenes: []
	}
];

export const MCU_DEPENDENCIES: MediaDependency[] = [
	// --- ROAD TO AVENGERS: DOOMSDAY ---
	{
		targetMediaId: 'mcu-avengers-doomsday',
		requiredMediaId: 'mcu-fantastic-four',
		priority: 'essential',
		watchScope: 'full',
		reason: 'Führt die Fantastic Four, Franklin Richards UND Doctor Doom (in der Mid-Credit-Scene) direkt für Doomsday ein.'
	},
	{
		targetMediaId: 'mcu-avengers-doomsday',
		requiredMediaId: 'mcu-thunderbolts',
		priority: 'essential',
		watchScope: 'full',
		reason: 'Formt die *New Avengers + Sentry; die Post-Credit-Scene zeigt direkt die Ankunft des Fantastic-Four-Schiffs im MCU!'
	},
	{
		targetMediaId: 'mcu-avengers-doomsday',
		requiredMediaId: 'mcu-loki-s2',
		priority: 'essential',
		watchScope: 'full',
		reason: 'Loki sitzt am Ende der Zeit und hält den Multiversums-Baum Yggdrasil zusammen – das Hauptziel von Doctor Doom.'
	},
	{
		targetMediaId: 'mcu-avengers-doomsday',
		requiredMediaId: 'mcu-the-marvels',
		priority: 'essential',
		watchScope: 'credits_only',
		effectiveMinutes: 3,
		scopeHint: '⚡ Zeitspar-Tipp: Du musst NICHT den ganzen Film schauen! Nur die Mid-Credit-Scene (3 Min.) ist für Doomsday Pflicht.',
		reason: 'In der Mid-Credit-Scene landet Monica Rambeau im X-Men-Universum bei Beast – der Auslöser für das Aufeinandertreffen von MCU und X-Men!'
	},
	{
		targetMediaId: 'mcu-avengers-doomsday',
		requiredMediaId: 'mcu-cap-brave-new-world',
		priority: 'recommended',
		watchScope: 'credits_only',
		effectiveMinutes: 3,
		scopeHint: '⚡ Zeitspar-Tipp: Für Doomsday reicht die Post-Credit-Scene (3 Min.) + das Wissen, dass Sam Wilson ein eigenes Avengers-Team gründet!',
		reason: 'In der Post-Credit-Scene warnt The Leader Sam Wilson direkt vor der Kollision mit den „Anderen“ aus fremden Welten.'
	},
	{
		targetMediaId: 'mcu-avengers-doomsday',
		requiredMediaId: 'mcu-spider-man-brand-new-day',
		priority: 'recommended',
		watchScope: 'credits_only',
		effectiveMinutes: 4,
		scopeHint: '⚡ Zeitspar-Tipp: Die Haupthandlung ist Street-Level – für Doomsday ist vor allem die 4-minütige Post-Credit-Scene relevant!',
		reason: 'Die Post-Credit-Scene zeigt den Beginn der Inkursion über New York aus Peters Sicht.'
	},
	{
		targetMediaId: 'mcu-avengers-doomsday',
		requiredMediaId: 'mcu-dr-strange-mom',
		priority: 'recommended',
		watchScope: 'credits_only',
		effectiveMinutes: 4,
		scopeHint: '⚡ Rewatch-Tipp: Falls schon gesehen, reicht die Mid-Credit-Scene mit Clea (4 Min.) zur Erinnerung an „Inkursionen“!',
		reason: 'Erklärt die Zerstörung zweier Universen durch „Inkursionen“.'
	},
	{
		targetMediaId: 'mcu-avengers-doomsday',
		requiredMediaId: 'mcu-deadpool-wolverine',
		priority: 'recommended',
		watchScope: 'full',
		reason: 'Erklärt „Anchor Beings“, die TVA-Leere (The Void) und bringt Gambit (Channing Tatum) & die X-Men zurück.'
	},
	{
		targetMediaId: 'mcu-avengers-doomsday',
		requiredMediaId: 'mcu-xmen-legacy-collection',
		priority: 'recommended',
		watchScope: 'key_episodes',
		effectiveMinutes: 130,
		scopeHint: '⚡ Zeitspar-Tipp: „X-Men: Zukunft ist Vergangenheit“ (130 Min.) reicht als Auffrischung für Professor X, Magneto, Beast, Mystique & Cyclops!',
		reason: 'Der Original-Cast der X-Men (Patrick Stewart, Ian McKellen, Kelsey Grammer, James Marsden, Alan Cumming) spielt eine Hauptrolle in Doomsday.'
	},
	{
		targetMediaId: 'mcu-avengers-doomsday',
		requiredMediaId: 'mcu-shang-chi',
		priority: 'recommended',
		watchScope: 'credits_only',
		effectiveMinutes: 3,
		scopeHint: '⚡ Rewatch-Tipp: Nur die Mid-Credit-Scene (3 Min., Signal der Zehn Ringe) nochmal auffrischen!',
		reason: 'Shang-Chi gehört zum Kernteam in Doomsday; seine Zehn Ringe senden ein kosmisches Signal.'
	},
	{
		targetMediaId: 'mcu-avengers-doomsday',
		requiredMediaId: 'mcu-black-panther-wakanda-forever',
		priority: 'bonus',
		watchScope: 'full',
		reason: 'Shuri (Black Panther), M’Baku und Namor vertreten Wakanda und Talokan in Doomsday.'
	},
	{
		targetMediaId: 'mcu-avengers-doomsday',
		requiredMediaId: 'mcu-avengers-endgame',
		priority: 'bonus',
		watchScope: 'full',
		reason: 'Emotionales Fundament zu Tony Stark und Steve Rogers’ Zeitreise am Ende.'
	},

	// --- ROAD TO AVENGERS: SECRET WARS ---
	{
		targetMediaId: 'mcu-avengers-secret-wars',
		requiredMediaId: 'mcu-avengers-doomsday',
		priority: 'essential',
		watchScope: 'full',
		reason: 'Direkter erster Teil des Zweiteilers – endet mit der Erschaffung von Battleworld.'
	},
	{
		targetMediaId: 'mcu-avengers-secret-wars',
		requiredMediaId: 'mcu-loki-s2',
		priority: 'essential',
		watchScope: 'full',
		reason: 'Lokis Thron am Ende der Zeit und die TVA sind der Schlüssel zur Wiederherstellung des Multiversums.'
	},
	{
		targetMediaId: 'mcu-avengers-secret-wars',
		requiredMediaId: 'mcu-fantastic-four',
		priority: 'essential',
		watchScope: 'full',
		reason: 'Reed Richards, Franklin Richards und Doctor Doom stehen im Zentrum von Secret Wars.'
	},
	{
		targetMediaId: 'mcu-avengers-secret-wars',
		requiredMediaId: 'mcu-spider-man-no-way-home',
		priority: 'recommended',
		watchScope: 'full',
		reason: 'Bringt die verschiedenen Spider-Man-Universen und den Symbionten-Tropfen (Mid-Credit-Scene) ins Spiel.'
	},
	{
		targetMediaId: 'mcu-avengers-secret-wars',
		requiredMediaId: 'mcu-deadpool-wolverine',
		priority: 'recommended',
		watchScope: 'full',
		reason: 'Die Leere (The Void) aus Deadpool & Wolverine dient als Vorstufe für Battleworld.'
	}
];
