import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import ProjectForm from "../components/ProjectForm";
import api from "../../services/api";

export default function CreateProject() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const submit = async payload => {
    try { setSaving(true); const r = await api.post("/projects/admin", payload); const id = r.data?.data?._id; navigate(id ? `/admin/projects/${id}/edit` : "/admin/projects", { replace: true }); }
    catch (err) { window.alert(err.response?.data?.message || err.message || "Unable to create project."); }
    finally { setSaving(false); }
  };
  return <AdminLayout title="New project"><div className="admin-page"><section className="admin-page-heading compact"><div><div className="admin-eyebrow"><span /> PORTFOLIO / CREATE</div><h1>Create project</h1><p>Add a new case study to the THERYNOX portfolio.</p></div></section><ProjectForm onSubmit={submit} loading={saving} mode="create" /></div></AdminLayout>;
}
