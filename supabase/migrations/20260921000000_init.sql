-- Esquema de public, recreado a partir del proyecto de Supabase (2026-09-21).
-- Requiere el esquema auth de GoTrue y los roles anon/authenticated/service_role.

create table public.categories (
  id         uuid primary key default gen_random_uuid(),
  name       text not null unique,
  created_by uuid references auth.users (id),
  created_at timestamptz default now()
);

create table public.pages (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  url         text not null,
  description text,
  category_id uuid references public.categories (id),
  is_common   boolean not null default false,
  created_by  uuid references auth.users (id),
  created_at  timestamptz default now()
);

create table public.profiles (
  id         uuid primary key references auth.users (id),
  username   text,
  role       text default 'user',
  updated_at timestamptz default now()
);

create table public.user_pages (
  id      uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  page_id uuid references public.pages (id) on delete cascade,
  unique (user_id, page_id)
);

-- Existía en Supabase sin trigger asociado: el perfil lo crea Register.tsx.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
as $$
begin
  insert into public.profiles (id, username, role)
  values (new.id, new.email, 'user');
  return new;
end;
$$;

-- Igual que en Supabase: RLS desactivado y acceso completo para los roles de la API.
grant all on all tables in schema public to anon, authenticated, service_role;
grant all on all functions in schema public to anon, authenticated, service_role;
alter default privileges in schema public grant all on tables to anon, authenticated, service_role;
alter default privileges in schema public grant all on functions to anon, authenticated, service_role;
