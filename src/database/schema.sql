-- ==============================================================================
-- ONUSHILON CRM & WEBSITE DATABASE SCHEMA (SUPABASE POSTGRESQL)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. SITE SETTINGS TABLE (Phone, WhatsApp, Email, Socials, Support Hours)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id TEXT PRIMARY KEY DEFAULT 'general',
    phone TEXT NOT NULL DEFAULT '+880 1700-000000',
    phone_href TEXT NOT NULL DEFAULT 'tel:+8801700000000',
    whatsapp_number TEXT NOT NULL DEFAULT '+8801700000000',
    whatsapp_message TEXT NOT NULL DEFAULT 'Hello Onushilon Academy, I would like to know more about your courses.',
    email TEXT NOT NULL DEFAULT 'hello@onushilon.example',
    location TEXT NOT NULL DEFAULT 'Dhaka, Bangladesh',
    facebook_url TEXT DEFAULT 'https://facebook.com',
    youtube_url TEXT DEFAULT 'https://youtube.com',
    linkedin_url TEXT DEFAULT 'https://linkedin.com',
    instagram_url TEXT DEFAULT 'https://instagram.com',
    support_hours TEXT DEFAULT '9 AM – 10 PM',
    logo_url TEXT DEFAULT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. COURSES TABLE
CREATE TABLE IF NOT EXISTS public.courses (
    id TEXT PRIMARY KEY,
    title_en TEXT NOT NULL,
    title_bn TEXT NOT NULL,
    category_en TEXT NOT NULL,
    category_bn TEXT NOT NULL,
    duration_en TEXT NOT NULL,
    duration_bn TEXT NOT NULL,
    level_en TEXT NOT NULL,
    level_bn TEXT NOT NULL,
    price TEXT NOT NULL,
    discount_price TEXT,
    image_url TEXT,
    mentor_name TEXT,
    schedule_en TEXT,
    schedule_bn TEXT,
    seats_en TEXT,
    seats_bn TEXT,
    topics_en JSONB DEFAULT '[]'::jsonb,
    topics_bn JSONB DEFAULT '[]'::jsonb,
    description_en TEXT,
    description_bn TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SITE SECTIONS TABLE (Hero, Story, Why Us, Practice, Testimonials, FAQ, CTA, etc.)
CREATE TABLE IF NOT EXISTS public.site_sections (
    section_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    data_en JSONB NOT NULL DEFAULT '{}'::jsonb,
    data_bn JSONB NOT NULL DEFAULT '{}'::jsonb,
    media JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. MENTORS TABLE
CREATE TABLE IF NOT EXISTS public.mentors (
    id TEXT PRIMARY KEY,
    name_en TEXT NOT NULL,
    name_bn TEXT NOT NULL,
    designation_en TEXT,
    designation_bn TEXT,
    specialty_en TEXT,
    specialty_bn TEXT,
    bio_en TEXT,
    bio_bn TEXT,
    category TEXT DEFAULT 'All',
    avatar_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. GALLERY MOMENTS TABLE
CREATE TABLE IF NOT EXISTS public.gallery_moments (
    id TEXT PRIMARY KEY,
    title_en TEXT NOT NULL,
    title_bn TEXT NOT NULL,
    badge_en TEXT,
    badge_bn TEXT,
    image_url TEXT NOT NULL,
    category TEXT DEFAULT 'All',
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. LEADS / ENROLMENTS CRM TABLE
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    course_id TEXT,
    course_name TEXT,
    message TEXT,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'enrolled', 'closed')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. MEDIA ASSETS TABLE
CREATE TABLE IF NOT EXISTS public.media_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    file_name TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    public_url TEXT NOT NULL,
    mime_type TEXT,
    size_bytes BIGINT,
    alt_text TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. CREATE STORAGE BUCKET FOR MEDIA (Supabase Storage)
INSERT INTO storage.buckets (id, name, public)
VALUES ('onushilon-media', 'onushilon-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 10. STORAGE ACCESS POLICIES
-- Allow public read access to onushilon-media bucket
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'onushilon-media');

-- Allow authenticated / service-role upload access
CREATE POLICY "Service Role and Authenticated Upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'onushilon-media');

-- Allow delete access
CREATE POLICY "Service Role and Authenticated Delete"
ON storage.objects FOR DELETE
USING (bucket_id = 'onushilon-media');

-- 11. ROW LEVEL SECURITY (RLS) FOR TABLES
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_moments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

-- Public read policies for website visitors
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public read courses" ON public.courses FOR SELECT USING (is_active = true);
CREATE POLICY "Public read site_sections" ON public.site_sections FOR SELECT USING (true);
CREATE POLICY "Public read mentors" ON public.mentors FOR SELECT USING (is_active = true);
CREATE POLICY "Public read gallery_moments" ON public.gallery_moments FOR SELECT USING (true);
CREATE POLICY "Public insert leads" ON public.leads FOR INSERT WITH CHECK (true);

-- Full access for service role / admin
CREATE POLICY "Service role full access settings" ON public.site_settings USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Service role full access courses" ON public.courses USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Service role full access sections" ON public.site_sections USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Service role full access mentors" ON public.mentors USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Service role full access gallery" ON public.gallery_moments USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Service role full access leads" ON public.leads USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Service role full access media" ON public.media_assets USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
