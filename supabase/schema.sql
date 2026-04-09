-- Create tables

CREATE TABLE profiles (
  id uuid references auth.users primary key,
  full_name text,
  email text,
  avatar_url text,
  plan text default 'free',
  xp_points integer default 0,
  level integer default 1,
  streak_days integer default 0,
  last_practice_date date,
  confidence_score integer default 0,
  created_at timestamp with time zone default now()
);

CREATE TABLE practice_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles.id,
  scenario_id text,
  scenario_name text,
  confidence_score integer,
  grammar_score integer,
  tone_rating text,
  duration_minutes integer,
  xp_earned integer,
  messages jsonb,
  created_at timestamp with time zone default now()
);

CREATE TABLE daily_missions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles.id,
  mission_type text,
  completed boolean default false,
  xp_reward integer,
  date date default current_date,
  created_at timestamp with time zone default now()
);

CREATE TABLE real_world_challenges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles.id,
  challenge_type text,
  challenge_name text,
  completed boolean default false,
  week_start date,
  created_at timestamp with time zone default now()
);

CREATE TABLE achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles.id,
  achievement_type text,
  achievement_name text,
  earned_at timestamp with time zone default now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE real_world_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Policies for practice_sessions
CREATE POLICY "Users can read own practice sessions" ON practice_sessions
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own practice sessions" ON practice_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for daily_missions
CREATE POLICY "Users can read own daily missions" ON daily_missions
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own daily missions" ON daily_missions
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own daily missions" ON daily_missions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for real_world_challenges
CREATE POLICY "Users can read own real world challenges" ON real_world_challenges
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own real world challenges" ON real_world_challenges
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own real world challenges" ON real_world_challenges
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for achievements
CREATE POLICY "Users can read own achievements" ON achievements
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own achievements" ON achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Triggers for new user sign ups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email, new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
