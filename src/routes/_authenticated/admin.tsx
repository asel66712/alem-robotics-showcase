import { createFileRoute, redirect } from '@tanstack/react-router';
import { AdminDashboard, adminOptions } from '@/components/admin-dashboard';
import { supabase } from '@/integrations/supabase/client';

export const Route=createFileRoute('/_authenticated/admin')({
 beforeLoad:async({context})=>{const role=await supabase.rpc('has_role',{_user_id:context.user.id,_role:'admin'});if(role.error||role.data!==true)throw redirect({to:'/admin/login'});},
 loader:({context})=>context.queryClient.ensureQueryData(adminOptions),
 head:()=>({meta:[{title:'Әкімші панелі — ALEM Robotics'},{name:'description',content:'ALEM Robotics мазмұнын басқару.'},{property:'og:title',content:'Әкімші панелі — ALEM Robotics'},{property:'og:description',content:'ALEM Robotics мазмұнын басқару.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'},{name:'robots',content:'noindex,nofollow'}]}),component:AdminDashboard,
});