import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check, ChevronDown, ExternalLink, ImagePlus, Plus, Save, Trash2, X } from "lucide-react";
import { Link } from "react-router-dom";
import ImageUploader from "./ImageUploader";
import { getMediaUrl } from "../../utils/media";

const EMPTY = { title:"", slug:"", category:"", type:"", client:"", year:new Date().getFullYear(), shortDescription:"", description:"", challenge:"", solution:"", result:"", coverImage:"", video:"", technologies:[], services:[], images:[], liveUrl:"", featured:false, status:"draft" };
const TECHS = ["React","Next.js","Laravel","PHP","MySQL","MongoDB","Node.js","Tailwind CSS","JavaScript","TypeScript","WordPress","GSAP","Framer Motion"];
const SERVICES = ["UI/UX Design","Web Development","E-commerce","Branding","SEO","Web Application","Custom Software","Maintenance"];
const slugify = v => String(v || "").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
const normalizeImages = v => Array.isArray(v) ? v.map((x,i) => typeof x === "string" ? ({url:x,caption:"",order:i}) : ({url:x?.url || "",caption:x?.caption || "",order:i})).filter(x=>x.url) : [];

export default function ProjectForm({ initialData, onSubmit, loading=false, mode="create" }) {
  const [form, setForm] = useState(EMPTY);
  const [slugEdited, setSlugEdited] = useState(false);
  const [techInput, setTechInput] = useState("");
  const [serviceInput, setServiceInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!initialData) { setForm({...EMPTY, year:new Date().getFullYear()}); setSlugEdited(false); return; }
    setForm({...EMPTY, ...initialData, technologies:Array.isArray(initialData.technologies)?initialData.technologies:[], services:Array.isArray(initialData.services)?initialData.services:[], images:normalizeImages(initialData.images)});
    setSlugEdited(true);
  }, [initialData]);

  const categories = useMemo(() => ["Business","Creative","E-commerce","Luxury","Salon","Healthcare","Education","Technology","Other"], []);
  const setField = (name,value) => setForm(f => ({...f,[name]:value}));
  const handleTitle = value => setForm(f => ({...f,title:value,slug:slugEdited ? f.slug : slugify(value)}));
  const addTag = (field, value, clear) => { const v=value.trim(); if(!v) return; setForm(f => ({...f,[field]:Array.from(new Set([...f[field],v]))})); clear(""); };
  const removeTag = (field, value) => setForm(f => ({...f,[field]:f[field].filter(x=>x!==value)}));
  const removeImage = index => setForm(f => ({...f,images:f.images.filter((_,i)=>i!==index)}));
  const updateCaption = (index,value) => setForm(f => ({...f,images:f.images.map((x,i)=>i===index?{...x,caption:value}:x)}));

  const submit = e => {
    e.preventDefault(); setError("");
    if (!form.title.trim()) return setError("Project title is required.");
    if (!form.slug.trim()) return setError("Project slug is required.");
    if (!form.category.trim()) return setError("Category is required.");
    const payload = {...form,title:form.title.trim(),slug:slugify(form.slug),category:form.category.trim(),year:Number(form.year),shortDescription:form.shortDescription.trim(),description:form.description.trim(),challenge:form.challenge.trim(),solution:form.solution.trim(),result:form.result.trim(),coverImage:form.coverImage?.startsWith("blob:")?"":form.coverImage,images:normalizeImages(form.images).map((x,i)=>({...x,order:i})),technologies:form.technologies.map(x=>x.trim()).filter(Boolean),services:form.services.map(x=>x.trim()).filter(Boolean),liveUrl:form.liveUrl.trim(),video:form.video.trim()};
    onSubmit(payload);
  };

  return <form className="project-editor" onSubmit={submit}>
    <div className="editor-toolbar"><Link to="/admin/projects" className="editor-back"><ArrowLeft size={15}/> Back to projects</Link><div className="editor-toolbar-actions"><span className={`editor-save-state ${loading?"saving":""}`}>{loading?"Saving changes":"All changes ready"}</span><button type="submit" className="admin-primary-button" disabled={loading}>{loading?<span className="button-spinner"/>:<Save size={15}/>} {mode === "edit" ? "Save changes" : "Create project"}</button></div></div>
    {error && <div className="admin-alert error">{error}</div>}

    <div className="editor-grid">
      <div className="editor-main">
        <Section title="Basic information" description="The core information used across project cards and detail pages.">
          <div className="editor-fields two"><Field label="Project title" required value={form.title} onChange={e=>handleTitle(e.target.value)} placeholder="e.g. Harniz Hardware"/><Field label="Slug" required value={form.slug} onChange={e=>{setSlugEdited(true);setField("slug",slugify(e.target.value));}} placeholder="project-slug"/></div>
          <div className="editor-fields three"><Field label="Category" required select value={form.category} onChange={e=>setField("category",e.target.value)} options={categories}/><Field label="Project type" value={form.type} onChange={e=>setField("type",e.target.value)} placeholder="E-commerce"/><Field label="Year" type="number" value={form.year} onChange={e=>setField("year",e.target.value)}/></div>
          <Field label="Client" value={form.client} onChange={e=>setField("client",e.target.value)} placeholder="Client or brand name"/><Field label="Short description" value={form.shortDescription} onChange={e=>setField("shortDescription",e.target.value)} placeholder="A concise description shown in project listings."/>
        </Section>

        <Section title="Case study" description="Tell the story behind the project. These fields power the detail page.">
          <Field label="Description" textarea value={form.description} onChange={e=>setField("description",e.target.value)} placeholder="Detailed project description..."/><div className="editor-fields two"><Field label="Challenge" textarea value={form.challenge} onChange={e=>setField("challenge",e.target.value)} placeholder="What challenge did the client have?"/><Field label="Solution" textarea value={form.solution} onChange={e=>setField("solution",e.target.value)} placeholder="How did you solve it?"/></div><Field label="Result" textarea value={form.result} onChange={e=>setField("result",e.target.value)} placeholder="What was the outcome?"/>
        </Section>

        <Section title="Project media" description="Upload a strong cover image and the supporting gallery.">
          <ImageUploader label="Cover image" value={form.coverImage} onChange={value=>setField("coverImage",value)}/>
          <div className="editor-divider"/>
          <ImageUploader label="Project gallery" multiple value={form.images} onChange={value=>setField("images",value)}/>
          {form.images.length>0 && <div className="gallery-editor">{form.images.map((image,index)=><div className="gallery-editor-row" key={`${image.url}-${index}`}><div className="gallery-thumb"><img src={getMediaUrl(image.url)} alt=""/></div><input value={image.caption} onChange={e=>updateCaption(index,e.target.value)} placeholder={`Image ${index+1} caption`}/><button type="button" onClick={()=>removeImage(index)} aria-label="Remove image"><Trash2 size={14}/></button></div>)}</div>}
        </Section>
      </div>

      <aside className="editor-side">
        <Section title="Publishing" description="Control whether this project is private, coming soon, or fully published.">
          <label className="editor-field"><span>Project visibility</span><select value={form.status} onChange={e=>setField("status",e.target.value)}><option value="draft">Draft — private</option><option value="in-progress">In Process — show Coming Soon</option><option value="published">Published — show case study</option></select></label>
          <label className="toggle-card"><div><strong>Featured project</strong><span>Highlight this work in featured sections.</span></div><input type="checkbox" checked={form.featured} onChange={e=>setField("featured",e.target.checked)}/><span className="toggle-ui"/></label>
        </Section>
        <Section title="Technologies"><div className="tag-picker">{form.technologies.map(t=><button type="button" key={t} className="tag-chip" onClick={()=>removeTag("technologies",t)}>{t}<X size={11}/></button>)}</div><div className="tag-add"><input value={techInput} onChange={e=>setTechInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();addTag("technologies",techInput,setTechInput)}}} placeholder="Add technology"/><button type="button" onClick={()=>addTag("technologies",techInput,setTechInput)}><Plus size={14}/></button></div><div className="quick-tags">{TECHS.filter(t=>!form.technologies.includes(t)).slice(0,8).map(t=><button type="button" key={t} onClick={()=>addTag("technologies",t,()=>{})}>+ {t}</button>)}</div></Section>
        <Section title="Services"><div className="tag-picker">{form.services.map(t=><button type="button" key={t} className="tag-chip" onClick={()=>removeTag("services",t)}>{t}<X size={11}/></button>)}</div><div className="tag-add"><input value={serviceInput} onChange={e=>setServiceInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();addTag("services",serviceInput,setServiceInput)}}} placeholder="Add service"/><button type="button" onClick={()=>addTag("services",serviceInput,setServiceInput)}><Plus size={14}/></button></div><div className="quick-tags">{SERVICES.filter(t=>!form.services.includes(t)).slice(0,6).map(t=><button type="button" key={t} onClick={()=>addTag("services",t,()=>{})}>+ {t}</button>)}</div></Section>
        <Section title="Links"><Field label="Live website URL" value={form.liveUrl} onChange={e=>setField("liveUrl",e.target.value)} placeholder="https://example.com"/><Field label="Video URL" value={form.video} onChange={e=>setField("video",e.target.value)} placeholder="Optional video URL"/>{form.liveUrl && <a className="editor-preview-link" href={form.liveUrl} target="_blank" rel="noreferrer">Open live project <ExternalLink size={13}/></a>}</Section>
        <div className="editor-tip"><Check size={15}/><div><strong>Publishing tip</strong><p>Use a descriptive title, a clean slug and at least one strong cover image before publishing.</p></div></div>
      </aside>
    </div>
  </form>;
}

function Section({title,description,children}) { return <section className="editor-section"><div className="editor-section-heading"><h2>{title}</h2>{description && <p>{description}</p>}</div>{children}</section>; }
function Field({label,required,value,onChange,placeholder,textarea,select,options,type="text"}) { return <label className="editor-field"><span>{label}{required&&<em>*</em>}</span>{select?<select value={value} onChange={onChange}><option value="">Select...</option>{options.map(o=><option key={o} value={o}>{o}</option>)}</select>:textarea?<textarea rows={5} value={value} onChange={onChange} placeholder={placeholder}/>:<input type={type} value={value} onChange={onChange} placeholder={placeholder}/>}</label>; }