import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { useStore } from "../store/useStore";
import { saveJob } from "../api/mock";

export default function JobUpload() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [saving, setSaving] = useState(false);

  async function onSave() {
    setSaving(true);
    const job = {
      id: uuidv4(),
      title,
      description: desc,
      skills: skillsInput.split(",").map(s => s.trim()).filter(Boolean),
      postedOn: new Date().toISOString().slice(0,10),
    };
    await saveJob(job);
    setSaving(false);
    setTitle(""); setDesc(""); setSkillsInput("");
    alert("Job saved");
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      
      <div className="space-y-4 bg-white p-6  rounded-2xl">
        <h2 className="text-3xl font-bold mb-4 text-center text-indigo-500 mb-6">Upload Job Description</h2>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Job Title" className="w-full p-3 border border-indigo-300 rounded" />
        <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Job description" className="w-full p-3 border border-indigo-300  rounded h-40" />
        <input value={skillsInput} onChange={e=>setSkillsInput(e.target.value)} placeholder="Skills (comma separated)" className="w-full p-3 border border-indigo-300 rounded" />
        <Button onClick={onSave} disabled={saving}>{saving ? "Saving..." : "Save Job"}</Button>
      </div>
    </div>
  );
}
