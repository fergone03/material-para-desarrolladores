-- Borrar un usuario de auth.users debe arrastrar sus datos (derecho de supresión, RGPD art. 17).
-- Antes profiles bloqueaba el borrado y las páginas privadas quedaban huérfanas.

alter table public.profiles
  drop constraint profiles_id_fkey,
  add constraint profiles_id_fkey foreign key (id) references auth.users (id) on delete cascade;

-- Las páginas privadas del usuario se borran con él; las comunes y las
-- categorías que creó un admin se conservan sin autor.
create or replace function public.delete_user_private_pages()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  delete from public.pages where created_by = old.id and not is_common;
  return old;
end;
$$;

revoke execute on function public.delete_user_private_pages() from public, anon, authenticated;

drop trigger if exists on_auth_user_deleted on auth.users;
create trigger on_auth_user_deleted
  before delete on auth.users
  for each row execute function public.delete_user_private_pages();

alter table public.pages
  drop constraint pages_created_by_fkey,
  add constraint pages_created_by_fkey foreign key (created_by) references auth.users (id) on delete set null;

alter table public.categories
  drop constraint categories_created_by_fkey,
  add constraint categories_created_by_fkey foreign key (created_by) references auth.users (id) on delete set null;
