import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import ProjectForm from "../components/ProjectForm";
import api from "../../services/api";
import { Loader2 } from "lucide-react";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { let active=true; (async()=>{ try { const r=await api.get(`/projects/admin/${id}`); if(active)setProject(r.data?.data || null); } catch(err){ if(active)setError(err.response?.data?.message || "Unable to load project."); } finally { if(active)setLoading(false); }})(); return()=>{active=false}; },[id]);
  const submit = async payload => { try { setSaving(true); const r=await api.put(`/projects/admin/${id}`,payload); setProject(r.data?.data || payload); } catch(err){ window.alert(err.response?.data?.message || err.message || "Unable to save project."); } finally { setSaving(false); } };

  return <AdminLayout title="Edit project"><div className="admin-page"><section className="admin-page-heading compact"><div><div className="admin-eyebrow"><span /> PORTFOLIO / EDIT</div><h1>{project?.title || "Edit project"}</h1><p>Update content, media and publishing settings.</p></div></section>{loading?<div className="admin-table-loading"><Loader2 size={18} className="spin"/> Loading project...</div>:error?<div className="admin-alert error">{error}<button onClick={()=>navigate("/admin/projects")}>Back to projects</button></div>:project?<ProjectForm initialData={project} onSubmit={submit} loading={saving} mode="edit"/>:null}</div></AdminLayout>;
}
