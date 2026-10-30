import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { ShieldCheck, ArrowLeft, LogIn } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { assertAdmin } from '@/content/admin-model';

export const Route=createFileRoute('/admin/login')({head:()=>({meta:[{title:'Әкімші кіруі — ALEM Robotics'},{name:'description',content:'ALEM Robotics әкімшілеріне арналған қауіпсіз кіру.'},{property:'og:title',content:'Әкімші кіруі — ALEM Robotics'},{property:'og:description',content:'Рұқсаты бар әкімшілерге арналған кіру.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'},{name:'robots',content:'noindex,nofollow'}]}),component:AdminLogin});
function AdminLogin(){
 const navigate=useNavigate(); const [busy,setBusy]=useState(false); const [error,setError]=useState('');
 return <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
  <Link to="/" className="mb-12 flex items-center gap-2 text-sm text-muted-foreground"><ArrowLeft className="size-4"/>Сайтқа оралу</Link>
  <p className="font-display text-lg">ALEM <span className="text-primary">ROBOTICS</span></p>
  <ShieldCheck className="mb-5 mt-10 size-10 text-primary"/><h1 className="text-2xl">Әкімші кіруі</h1><p className="mb-8 mt-3 text-sm text-muted-foreground">FLL Team #311436</p>
  <form className="grid gap-5" onSubmit={async e=>{e.preventDefault();setBusy(true);setError('');const form=new FormData(e.currentTarget);try{const result=await supabase.auth.signInWithPassword({email:String(form.get('email')).trim(),password:String(form.get('password'))});if(result.error)throw new Error('Email немесе құпиясөз қате.');const role=await supabase.rpc('has_role',{_user_id:result.data.user.id,_role:'admin'});try{assertAdmin(role.data);}catch{await supabase.auth.signOut();throw new Error('Бұл аккаунтқа әкімші рұқсаты берілмеген.');}await navigate({to:'/admin'});}catch(err){setError(err instanceof Error?err.message:'Кіру сәтсіз аяқталды.');}finally{setBusy(false);}}}>
   <label className="grid gap-2 text-sm">Email<Input name="email" type="email" autoComplete="username" required /></label>
   <label className="grid gap-2 text-sm">Құпиясөз<Input name="password" type="password" autoComplete="current-password" required /></label>
   {error&&<p role="alert" className="text-sm text-destructive">{error}</p>}<Button size="lg" disabled={busy}><LogIn/>{busy?'Кіру…':'Кіру'}</Button>
  </form>
 </main>;
}