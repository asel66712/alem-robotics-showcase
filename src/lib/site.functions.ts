import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { assertAdmin, itemSchema, settingsSchema } from '@/content/admin-model';
import { z } from 'zod';

export const getPublicSite = createServerFn({method:'GET'}).handler(async () => {
  const url = process.env['SUPABASE_URL']; const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
  if (!url || !key) throw new Error('Content unavailable');
  const client = createClient<Database>(url,key,{auth:{persistSession:false,autoRefreshToken:false},global:{fetch:(input,init) => { const headers=new Headers(init?.headers); if(headers.get('Authorization')===`Bearer ${key}`) headers.delete('Authorization'); headers.set('apikey',key); return fetch(input,{...init,headers}); }}});
  const [settings,items] = await Promise.all([client.from('site_settings').select('key,value'),client.from('site_items').select('*').order('sort_order').order('id')]);
  if(settings.error || items.error) throw new Error('Content unavailable');
  async function resolve(value:string) {
    if (!value.startsWith('site-images/')) return value;
    const {data,error}=await client.storage.from('site-images').createSignedUrl(value.slice(12),3600);
    if(error || !data) return '';
    const publicUrl=process.env['VITE_SUPABASE_URL'];
    return publicUrl ? data.signedUrl.replace(url ?? '',publicUrl) : data.signedUrl;
  }
  return { settings:Object.fromEntries(await Promise.all((settings.data ?? []).map(async s=>[s.key,await resolve(s.value)]))), items:await Promise.all((items.data ?? []).map(async i=>({...i,image_url:await resolve(i.image_url)}))) };
});

export const saveSettings = createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(input=>settingsSchema.parse(input)).handler(async ({data,context})=>{
  const role=await context.supabase.rpc('has_role',{_user_id:context.userId,_role:'admin'}); assertAdmin(role.data);
  const result=await context.supabase.from('site_settings').upsert(Object.entries(data).map(([key,value])=>({key,value,updated_at:new Date().toISOString()})));
  if(result.error) throw new Error('Сақтау сәтсіз аяқталды.'); return {ok:true};
});
export const saveItem = createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(input=>itemSchema.parse(input)).handler(async ({data,context})=>{
  const role=await context.supabase.rpc('has_role',{_user_id:context.userId,_role:'admin'}); assertAdmin(role.data);
  const result=await context.supabase.from('site_items').upsert(data).select('id').single();
  if(result.error) throw new Error('Сақтау сәтсіз аяқталды.'); return result.data;
});
export const deleteItem = createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(input=>z.object({id:z.string().uuid()}).parse(input)).handler(async ({data,context})=>{
  const role=await context.supabase.rpc('has_role',{_user_id:context.userId,_role:'admin'}); assertAdmin(role.data);
  const result=await context.supabase.from('site_items').delete().eq('id',data.id).select('id').single();
  if(result.error) throw new Error('Жою сәтсіз аяқталды.'); return {ok:true};
});
export const saveProfile = createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(input=>z.object({display_name:z.string().trim().max(100),avatar_url:imageValue}).parse(input)).handler(async ({data,context})=>{
  const role=await context.supabase.rpc('has_role',{_user_id:context.userId,_role:'admin'}); assertAdmin(role.data);
  const result=await context.supabase.from('profiles').upsert({...data,id:context.userId,updated_at:new Date().toISOString()});
  if(result.error) throw new Error('Профиль сақталмады.'); return {ok:true};
});