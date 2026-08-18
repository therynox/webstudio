import React, { useState } from "react";
import { ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form,setForm]=useState({email:"",password:""});
  const [show,setShow]=useState(false);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const from=location.state?.from?.pathname || "/admin/dashboard";

  const submit=async e=>{e.preventDefault();if(loading)return;try{setLoading(true);setError("");const r=await api.post("/auth/login",{email:form.email.trim(),password:form.password});if(!r.data?.success)throw new Error(r.data?.message||"Login failed");const token=r.data?.data?.token;if(!token)throw new Error("Authentication token was not returned.");localStorage.setItem("therynox_admin_token",token);if(r.data?.data?.admin)localStorage.setItem("therynox_admin",JSON.stringify(r.data.data.admin));navigate(from,{replace:true});}catch(err){setError(err.response?.data?.message||err.message||"Unable to sign in.");}finally{setLoading(false)}};
  return <div className="admin-login-page"><div className="login-orbit orbit-one"/><div className="login-orbit orbit-two"/><div className="login-grid"/><div className="admin-login-card"><div className="admin-login-brand"><div className="admin-brand-mark"><span/></div><div><strong>THERYNOX</strong><small>WEB STUDIO / CMS</small></div></div><div className="admin-login-copy"><div className="admin-eyebrow"><span/> PRIVATE WORKSPACE</div><h1>Welcome back.</h1><p>Sign in to manage your portfolio and publish new work.</p></div><form onSubmit={submit} className="admin-login-form"><label><span>Email address</span><div className="login-input"><LockKeyhole size={15}/><input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="admin@example.com" autoComplete="email" required/></div></label><label><span>Password</span><div className="login-input"><LockKeyhole size={15}/><input type={show?"text":"password"} value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="••••••••" autoComplete="current-password" required/><button type="button" onClick={()=>setShow(!show)}>{show?<EyeOff size={15}/>:<Eye size={15}/>}</button></div></label>{error&&<div className="login-error">{error}</div>}<button className="login-submit" disabled={loading}>{loading?<span className="login-spinner"/>:<ArrowRight size={16}/>} {loading?"Signing in...":"Sign in to CMS"}</button></form><div className="login-security"><ShieldCheck size={14}/><span>Protected admin session · THERYNOX</span></div></div><a className="login-home" href="/">← Back to website</a></div>;
}
