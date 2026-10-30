import { queryOptions } from '@tanstack/react-query';
import { getPublicSite } from '@/lib/site.functions';
import * as defaults from './site';
import type { SiteData } from './admin-model';

export const defaultSettings = {hero_tagline:'Болашақ инженерлері. Жаңа идеялар. Үлкен мүмкіндіктер.',about_intro:'Біз — FIRST LEGO League Challenge бағдарламасына қатысатын оқушылар командасымыз. Бізді инженерия, бағдарламалау, инновация және командалық жұмыс біріктіреді.',robot_intro:'Робот сипаттамалары кейін қосылады.',project_intro:'Біздің инновациялық жобамыз. Толық мәліметтер кейін қосылады.',achievements_intro:'Жарыстар мен нәтижелер кейін қосылады.',contact_intro:'Серіктестік, сұрақтар немесе ұсыныстар бойынша хабарласыңыз.',email:defaults.team.email,instagram_url:defaults.social.instagram,instagram_handle:defaults.social.instagramHandle,tiktok_url:defaults.social.tiktok,tiktok_handle:defaults.social.tiktokHandle,robot_image_1:'',robot_image_2:'',robot_image_3:''};
export const publicSiteOptions = queryOptions({queryKey:['public-site'],queryFn:async()=>{try{return await getPublicSite();}catch{return null;}},staleTime:30000,refetchInterval:1800000});
export function mapSite(data:SiteData|null) {
  const settings={...defaultSettings,...data?.settings};
  const rows=(section:string)=>data?.items.filter(i=>i.section===section) ?? [];
  const cards=(section:string,fallback:typeof defaults.aboutPoints)=>data ? rows(section).map(i=>({title:i.title,text:i.body})) : fallback;
  const people=(section:string,fallback:typeof defaults.members)=>data ? rows(section).map(i=>({name:i.title,role:i.subtitle,photo:i.image_url})) : fallback;
  return {settings,team:{...defaults.team,email:settings.email},social:{instagram:settings.instagram_url,instagramHandle:settings.instagram_handle,tiktok:settings.tiktok_url,tiktokHandle:settings.tiktok_handle},aboutPoints:cards('about',defaults.aboutPoints),robotBlocks:cards('robot',defaults.robotBlocks),projectSteps:cards('project',defaults.projectSteps),leaders:people('leader',defaults.leaders),members:people('member',defaults.members),achievements:data ? rows('achievement').map(i=>({title:i.title,date:i.subtitle,text:i.body})) : defaults.achievements,media:data ? {photos:rows('photo').map(i=>({src:i.image_url,caption:i.title})),videos:rows('video').map(i=>({embed:i.image_url,caption:i.title}))} : defaults.media};
}