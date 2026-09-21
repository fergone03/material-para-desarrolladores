-- Row Level Security: la anon key es pública, así que los permisos viven en la base.
--   categories  lectura pública; escritura solo admin
--   pages       comunes visibles para todos; privadas solo para su dueño; comunes solo las gestiona admin
--   user_pages  cada usuario solo ve y toca sus enlaces
--   profiles    cada usuario ve el suyo; admin ve todos; nadie se puede poner role = 'admin'

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$;

-- El perfil lo crea la base al registrarse, no el cliente: funciona también
-- con confirmación de email activada, cuando el cliente aún no tiene sesión.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, username, role)
  values (new.id, new.email, 'user')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Las páginas nuevas quedan a nombre de quien las crea.
alter table public.pages alter column created_by set default auth.uid();
update public.pages p
   set created_by = up.user_id
  from public.user_pages up
 where up.page_id = p.id and p.created_by is null and not p.is_common;

alter table public.categories enable row level security;
alter table public.pages      enable row level security;
alter table public.user_pages enable row level security;
alter table public.profiles   enable row level security;

-- categories
create policy "categories: lectura pública" on public.categories
  for select using (true);
create policy "categories: admin inserta" on public.categories
  for insert to authenticated with check (public.is_admin());
create policy "categories: admin edita" on public.categories
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "categories: admin borra" on public.categories
  for delete to authenticated using (public.is_admin());

-- pages
create policy "pages: comunes, propias o admin" on public.pages
  for select using (
    is_common
    or created_by = auth.uid()
    or exists (select 1 from public.user_pages up where up.page_id = pages.id and up.user_id = auth.uid())
    or public.is_admin()
  );
create policy "pages: crear propias" on public.pages
  for insert to authenticated
  with check (created_by = auth.uid() and (not is_common or public.is_admin()));
create policy "pages: editar propias o admin" on public.pages
  for update to authenticated
  using (
    public.is_admin()
    or (not is_common and (
      created_by = auth.uid()
      or exists (select 1 from public.user_pages up where up.page_id = pages.id and up.user_id = auth.uid())
    ))
  )
  with check (public.is_admin() or not is_common);
create policy "pages: borrar propias o admin" on public.pages
  for delete to authenticated
  using (
    public.is_admin()
    or (not is_common and (
      created_by = auth.uid()
      or exists (select 1 from public.user_pages up where up.page_id = pages.id and up.user_id = auth.uid())
    ))
  );

-- user_pages
create policy "user_pages: propias o admin" on public.user_pages
  for select to authenticated using (user_id = auth.uid() or public.is_admin());
create policy "user_pages: crear propias" on public.user_pages
  for insert to authenticated with check (user_id = auth.uid());
create policy "user_pages: borrar propias o admin" on public.user_pages
  for delete to authenticated using (user_id = auth.uid() or public.is_admin());

-- profiles
create policy "profiles: el propio o admin" on public.profiles
  for select to authenticated using (id = auth.uid() or public.is_admin());
create policy "profiles: crear el propio como user" on public.profiles
  for insert to authenticated with check (id = auth.uid() and role = 'user');
create policy "profiles: admin edita" on public.profiles
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- anon solo necesita leer; el resto lo decide cada policy.
revoke insert, update, delete, truncate on all tables in schema public from anon;
revoke truncate on all tables in schema public from authenticated;
revoke execute on function public.handle_new_user() from public, anon, authenticated;

notify pgrst, 'reload schema';
