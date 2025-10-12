import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../store/useStore";
import FeedbackModal from "../components/FeedbackModal";

export default function MatchesView() {
  const { id } = useParams();
  const { jobs, resumes, fetchResumes, fetchJobs } = useStore();
  const [job, setJob] = useState<any | null>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  useEffect(()=>{ fetchResumes(); fetchJobs(); }, []);

  useEffect(()=>{
    setJob(jobs.find(j=>j.id === id));
  }, [jobs, id]);

  if (!job) return <div className="p-6">Loading job...</div>;

  // crude matching: % of required skills present
  const scores = resumes.map(r => {
    const matched = (job.skills || []).filter((s:string) => (r.skills || []).some((rs:any) => rs.name.toLowerCase() === s.toLowerCase()));
    const ratio = (job.skills.length === 0) ? 0 : Math.round((matched.length / job.skills.length) * 100);
    return { resume: r, score: ratio };
  }).sort((a,b)=>b.score-a.score);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{job.title} — Matches</h2>
      <div className="grid gap-3">
        {scores.map(s => (
          <div key={s.resume.id} className="p-4 border rounded flex justify-between items-center">
            <div>
              <div className="font-medium">{s.resume.name}</div>
              <div className="text-sm text-muted-foreground">{s.resume.position}</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-40">
                <div className="text-sm mb-1">Match: {s.score}%</div>
                <div className="h-2 bg-gray-200 rounded overflow-hidden">
                  <div style={{width:`${s.score}%`}} className="h-full bg-indigo-500"></div>
                </div>
              </div>
              <button className="btn" onClick={()=>{ setSelected(s.resume); setOpen(true); }}>Add Feedback</button>
            </div>
          </div>
        ))}
      </div>

      <FeedbackModal open={open} onClose={()=>setOpen(false)} candidate={selected} />
    </div>
  );
}
