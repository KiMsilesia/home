begin;
create table public.kim_profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 email text not null,
 role text not null default 'user' check(role in ('user','admin')),
 status text not null default 'pending' check(status in ('pending','active','suspended')),
 created_at timestamptz not null default now()
);
create table public.kim_projects (
 owner_id uuid not null references public.kim_profiles(id) on delete cascade,
 id text not null check(length(id) between 1 and 100),
 document jsonb not null check(jsonb_typeof(document)='object' and octet_length(document::text)<=5242880),
 revision integer not null default 1,
 updated_at timestamptz not null default now(),
 primary key(owner_id,id)
);
alter table public.kim_profiles enable row level security;
alter table public.kim_projects enable row level security;
create function public.kim_new_user() returns trigger language plpgsql security definer set search_path='' as $$
begin
 insert into public.kim_profiles(id,email) values(new.id,coalesce(new.email,''));
 return new;
end $$;
create trigger kim_user_created after insert on auth.users for each row execute function public.kim_new_user();
insert into public.kim_profiles(id,email) select id,coalesce(email,'') from auth.users on conflict do nothing;
create function public.kim_active() returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.kim_profiles where id=auth.uid() and status='active')
$$;
create function public.kim_admin() returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.kim_profiles where id=auth.uid() and status='active' and role='admin')
$$;
create policy own_profile on public.kim_profiles for select to authenticated using(id=auth.uid());
create policy own_projects on public.kim_projects for select to authenticated using(owner_id=auth.uid() and public.kim_active());
-- Writes are possible only through RPC: ownership and revision cannot be supplied by the client.
revoke all on public.kim_profiles,public.kim_projects from anon,authenticated;
grant select on public.kim_profiles,public.kim_projects to authenticated;
create function public.kim_save_project(p_id text,p_document jsonb,p_revision integer) returns integer
language plpgsql security definer set search_path='' as $$
declare current_revision integer; next_revision integer; total_bytes bigint; project_count integer;
begin
 perform 1 from public.kim_profiles where id=auth.uid() and status='active' for update;
 if not found then raise exception 'KIM_ACCESS_DENIED'; end if;
 if jsonb_typeof(p_document) is distinct from 'object' or p_document->>'id' is distinct from p_id
 or jsonb_typeof(p_document->'rooms') is distinct from 'array'
 or octet_length(p_document::text)>5242880 then raise exception 'KIM_INVALID_PROJECT'; end if;
 select revision into current_revision from public.kim_projects where owner_id=auth.uid() and id=p_id for update;
 if coalesce(current_revision,0) is distinct from p_revision then raise exception 'KIM_CONFLICT'; end if;
 select count(*),coalesce(sum(octet_length(document::text)),0) into project_count,total_bytes
 from public.kim_projects where owner_id=auth.uid() and id<>p_id;
 if project_count>=100 or total_bytes+octet_length(p_document::text)>20971520 then raise exception 'KIM_QUOTA'; end if;
 next_revision:=coalesce(current_revision,0)+1;
 insert into public.kim_projects(owner_id,id,document,revision) values(auth.uid(),p_id,p_document,next_revision)
 on conflict(owner_id,id) do update set document=excluded.document,revision=excluded.revision,updated_at=now();
 return next_revision;
end $$;
create function public.kim_admin_users() returns table(id uuid,email text,role text,status text,created_at timestamptz,projects bigint)
language plpgsql security definer set search_path='' as $$
begin
 if not public.kim_admin() then raise exception 'KIM_ACCESS_DENIED'; end if;
 return query select p.id,p.email,p.role,p.status,p.created_at,(select count(*) from public.kim_projects j where j.owner_id=p.id)
 from public.kim_profiles p order by p.created_at desc limit 1000;
end $$;
create function public.kim_admin_status(p_id uuid,p_status text) returns void
language plpgsql security definer set search_path='' as $$
begin
 if not public.kim_admin() then raise exception 'KIM_ACCESS_DENIED'; end if;
 if p_status not in ('active','suspended') or p_status is null then raise exception 'KIM_INVALID_STATUS'; end if;
 if p_id=auth.uid() then raise exception 'KIM_SELF_CHANGE'; end if;
 update public.kim_profiles set status=p_status where id=p_id and role='user';
 if not found then raise exception 'KIM_USER_NOT_FOUND'; end if;
end $$;
revoke all on function public.kim_new_user(),public.kim_active(),public.kim_admin(),public.kim_save_project(text,jsonb,integer),public.kim_admin_users(),public.kim_admin_status(uuid,text) from public,anon,authenticated;
grant execute on function public.kim_active(),public.kim_admin(),public.kim_save_project(text,jsonb,integer),public.kim_admin_users(),public.kim_admin_status(uuid,text) to authenticated;
commit;
