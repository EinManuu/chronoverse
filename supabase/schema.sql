-- ============================================================================
-- Franchise Timeline & "Road to..." Tracker - Supabase PostgreSQL Schema
-- ============================================================================

-- 1. Franchises (MCU, DCU, Star Wars, etc.)
CREATE TABLE IF NOT EXISTS public.franchises (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    short_name TEXT NOT NULL,
    description TEXT NOT NULL,
    accent_color TEXT NOT NULL DEFAULT '#ef4444',
    external_list_ids JSONB NOT NULL DEFAULT '{}'::jsonb,
    last_synced_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Media Items (Movies, TV Seasons, One-Shots, Specials)
CREATE TABLE IF NOT EXISTS public.media_items (
    id TEXT PRIMARY KEY,
    franchise_id TEXT NOT NULL REFERENCES public.franchises(id) ON DELETE CASCADE,
    tmdb_id INTEGER,
    media_type TEXT NOT NULL CHECK (media_type IN ('movie', 'series', 'oneshot', 'special')),
    title TEXT NOT NULL,
    release_date DATE NOT NULL,
    in_universe_year TEXT NOT NULL,
    timeline_axis_year TEXT NOT NULL DEFAULT '2025',
    runtime_minutes INTEGER NOT NULL DEFAULT 120,
    episode_count INTEGER,
    chronological_order DOUBLE PRECISION NOT NULL,
    release_order INTEGER NOT NULL,
    phase_or_era TEXT NOT NULL,
    synopsis TEXT NOT NULL,
    poster_gradient TEXT NOT NULL DEFAULT 'from-red-900 to-slate-900',
    streaming_provider TEXT DEFAULT 'Disney+',
    is_upcoming BOOLEAN NOT NULL DEFAULT false,
    is_event_milestone BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Mid- & Post-Credit Scenes
CREATE TABLE IF NOT EXISTS public.credit_scenes (
    id TEXT PRIMARY KEY,
    media_item_id TEXT NOT NULL REFERENCES public.media_items(id) ON DELETE CASCADE,
    scene_type TEXT NOT NULL CHECK (scene_type IN ('mid_credit', 'post_credit')),
    importance TEXT NOT NULL CHECK (importance IN ('must_watch', 'tease', 'joke')),
    spoiler_free_hint TEXT NOT NULL,
    spoiler_description TEXT NOT NULL
);

-- 4. Story Dependencies ("Road to [Upcoming Movie]" Filter)
CREATE TABLE IF NOT EXISTS public.media_dependencies (
    id TEXT PRIMARY KEY,
    target_media_id TEXT NOT NULL REFERENCES public.media_items(id) ON DELETE CASCADE,
    required_media_id TEXT NOT NULL REFERENCES public.media_items(id) ON DELETE CASCADE,
    priority TEXT NOT NULL CHECK (priority IN ('essential', 'recommended', 'bonus')),
    watch_scope TEXT NOT NULL CHECK (watch_scope IN ('full', 'credits_only', 'key_episodes')) DEFAULT 'full',
    effective_minutes INTEGER,
    scope_hint TEXT,
    reason TEXT NOT NULL,
    UNIQUE(target_media_id, required_media_id)
);

-- 5. User Progress (Watched, Episodes, Credit Scenes, Friends Sync)
CREATE TABLE IF NOT EXISTS public.user_progress (
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    media_item_id TEXT NOT NULL REFERENCES public.media_items(id) ON DELETE CASCADE,
    status TEXT NOT NULL CHECK (status IN ('unwatched', 'watching', 'watched', 'skipped')) DEFAULT 'unwatched',
    watched_episodes INTEGER NOT NULL DEFAULT 0,
    watched_credits BOOLEAN NOT NULL DEFAULT false,
    rating NUMERIC(2,1) CHECK (rating >= 0.5 AND rating <= 5.0),
    updated_at TIMESTAMPTZ DEFAULT now(),
    PRIMARY KEY (user_id, media_item_id)
);

-- 6. Zero-Cost AI Sync Guard (Hard Monthly Quota Cap = 0.00 EUR Guarantee)
CREATE TABLE IF NOT EXISTS public.ai_sync_quota (
    month_key TEXT PRIMARY KEY, -- e.g. '2026-10'
    calls_used INTEGER NOT NULL DEFAULT 0,
    max_calls_allowed INTEGER NOT NULL DEFAULT 25,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Row Level Security (RLS)
ALTER TABLE public.franchises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_scenes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_dependencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for franchises" ON public.franchises FOR SELECT USING (true);
CREATE POLICY "Public read access for media_items" ON public.media_items FOR SELECT USING (true);
CREATE POLICY "Public read access for credit_scenes" ON public.credit_scenes FOR SELECT USING (true);
CREATE POLICY "Public read access for media_dependencies" ON public.media_dependencies FOR SELECT USING (true);

CREATE POLICY "Users can read all friends progress" ON public.user_progress FOR SELECT USING (true);
CREATE POLICY "Users can manage own progress" ON public.user_progress
    FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
