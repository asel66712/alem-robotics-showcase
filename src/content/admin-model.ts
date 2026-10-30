import { z } from 'zod';
import type { Tables } from '@/integrations/supabase/types';

export const sectionLabels = { about: 'Біз туралы', leader: 'Жетекшілер', member: 'Команда мүшелері', robot: 'Робот', project: 'BIOGLOW', achievement: 'Жетістіктер', photo: 'Фотогалерея', video: 'Видеолар' };
export const settingLabels: Record<string, string> = {
  hero_tagline: 'Басты бет мәтіні', about_intro: 'Біз туралы мәтін', robot_intro: 'Робот сипаттамасы', project_intro: 'BIOGLOW сипаттамасы', achievements_intro: 'Жетістіктер сипаттамасы', contact_intro: 'Байланыс мәтіні', email: 'Команданың ашық email мекенжайы', instagram_url: 'Instagram сілтемесі', instagram_handle: 'Instagram атауы', tiktok_url: 'TikTok сілтемесі', tiktok_handle: 'TikTok атауы', robot_image_1: 'Робот фотосы', robot_image_2: 'Механизм фотосы', robot_image_3: 'Бағдарлама скриншоты',
};
export const imageValue = z.string().max(2000).refine(v => !v || /^site-images\/[a-zA-Z0-9/_\.\-]+$/.test(v) || /^https:\/\//.test(v), 'Сурет сілтемесі жарамсыз');
export const itemSchema = z.object({ id: z.string().uuid().optional(), section: z.enum(['about','leader','member','robot','project','achievement','photo','video']), title: z.string().trim().min(1).max(300), subtitle: z.string().max(300), body: z.string().max(10000), image_url: imageValue, sort_order: z.number().int().min(0).max(9999) });
export const settingsSchema = z.record(z.string().max(10000)).superRefine((settings,ctx) => {
  for (const [key,value] of Object.entries(settings)) {
    if (!(key in settingLabels)) ctx.addIssue({code:'custom',message:'Белгісіз өріс',path:[key]});
    if (key.endsWith('_url') && (!/^https:\/\//.test(value) || !URL.canParse(value))) ctx.addIssue({code:'custom',message:'HTTPS сілтемесін енгізіңіз',path:[key]});
    if (key === 'email' && !z.string().email().safeParse(value).success) ctx.addIssue({code:'custom',message:'Email жарамсыз',path:[key]});
    if (key.startsWith('robot_image_') && !imageValue.safeParse(value).success) ctx.addIssue({code:'custom',message:'Сурет сілтемесі жарамсыз',path:[key]});
  }
});
export function assertAdmin(allowed: boolean | null) { if (allowed !== true) throw new Error('Әкімші рұқсаты қажет.'); }
export type SiteData = { settings: Record<string,string>; items: Tables<'site_items'>[] };