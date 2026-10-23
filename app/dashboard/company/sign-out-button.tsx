"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {LogOut,LoaderCircle} from "lucide-react";
import {createClient} from "@/lib/supabase/client";
export default function SignOutButton(){const [busy,setBusy]=useState(false);const router=useRouter();async function handleSignOut(){if(busy)return;setBusy(true);const {error}=await createClient().auth.signOut();if(error){setBusy(false);window.alert("Could not sign out: "+error.message);return}router.replace("/login");router.refresh()}return <button type="button" onClick={handleSignOut} disabled={busy} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-white/65 transition hover:border-rose-400/30 hover:bg-rose-400/10 hover:text-rose-200 disabled:opacity-50 sm:text-sm">{busy?<LoaderCircle size={16} className="animate-spin"/>:<LogOut size={16}/>}<span>{busy?"Signing out":"Sign out"}</span></button>}