import { supabase } from '@/lib/supabase';
import type { Cohort, Deal, FundingEntityType, Grant } from '@/types/funding';

const PAGE_SIZE = 20;

export async function listDeals(page = 0): Promise<Deal[]> {
  const from = page * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;
  const { data, error } = await supabase
    .from('deals')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .range(from, to);
  if (error) throw error;
  return (data ?? []) as Deal[];
}

export async function listCohorts(page = 0): Promise<Cohort[]> {
  const from = page * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;
  const { data, error } = await supabase
    .from('cohorts')
    .select('*')
    .eq('status', 'active')
    .order('application_deadline', { ascending: true, nullsFirst: false })
    .range(from, to);
  if (error) throw error;
  return (data ?? []) as Cohort[];
}

export async function listGrants(page = 0): Promise<Grant[]> {
  const from = page * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;
  const { data, error } = await supabase
    .from('grants')
    .select('*')
    .eq('status', 'active')
    .order('deadline', { ascending: true, nullsFirst: false })
    .range(from, to);
  if (error) throw error;
  return (data ?? []) as Grant[];
}

export async function getDeal(id: string): Promise<Deal | null> {
  const { data, error } = await supabase.from('deals').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return (data as Deal) ?? null;
}

export async function getCohort(id: string): Promise<Cohort | null> {
  const { data, error } = await supabase.from('cohorts').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return (data as Cohort) ?? null;
}

export async function getGrant(id: string): Promise<Grant | null> {
  const { data, error } = await supabase.from('grants').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return (data as Grant) ?? null;
}

export async function createDeal(input: Partial<Deal>, userId: string): Promise<Deal> {
  const payload = { ...input, created_by: userId, status: input.status ?? 'active' };
  const { data, error } = await supabase.from('deals').insert(payload).select('*').single();
  if (error) throw error;
  return data as Deal;
}

export async function createCohort(input: Partial<Cohort>, userId: string): Promise<Cohort> {
  const payload = { ...input, created_by: userId, status: input.status ?? 'active' };
  const { data, error } = await supabase.from('cohorts').insert(payload).select('*').single();
  if (error) throw error;
  return data as Cohort;
}

export async function createGrant(input: Partial<Grant>, userId: string): Promise<Grant> {
  const payload = { ...input, created_by: userId, status: input.status ?? 'active' };
  const { data, error } = await supabase.from('grants').insert(payload).select('*').single();
  if (error) throw error;
  return data as Grant;
}

export async function toggleBookmark(
  userId: string,
  entityType: FundingEntityType,
  entityId: string,
): Promise<boolean> {
  const { data: existing } = await supabase
    .from('funding_bookmarks')
    .select('id')
    .eq('user_id', userId)
    .eq('entity_type', entityType)
    .eq('entity_id', entityId)
    .maybeSingle();
  if (existing?.id) {
    const { error } = await supabase.from('funding_bookmarks').delete().eq('id', existing.id);
    if (error) throw error;
    return false;
  }
  const { error } = await supabase
    .from('funding_bookmarks')
    .insert({ user_id: userId, entity_type: entityType, entity_id: entityId });
  if (error) throw error;
  return true;
}

export async function trackEvent(
  entityType: FundingEntityType,
  entityId: string,
  eventType: 'impression' | 'click' | 'save' | 'application',
  userId: string | null,
  metadata: Record<string, unknown> = {},
): Promise<void> {
  await supabase.from('funding_events').insert({
    user_id: userId,
    entity_type: entityType,
    entity_id: entityId,
    event_type: eventType,
    metadata,
  });
}
