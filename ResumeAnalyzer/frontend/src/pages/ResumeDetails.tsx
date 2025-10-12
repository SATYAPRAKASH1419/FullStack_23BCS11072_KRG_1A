import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { useStore } from "../store/useStore";
import { fetchResumeById } from "../api/mock";
import SkillMatrix from "../components/SkillMatrix";

export default function ResumeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState<any | null>(null);
  useEffect(() => {
    (async () => {
      if (!id) return;
      const r = await fetchResumeById(Number(id));
      setResume(r);
    })();
  }, [id]);

  if (!resume) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">{resume.name}</h1>
          <p className="text-sm text-muted-foreground">{resume.position} • {resume.location}</p>
          <p className="text-sm text-muted-foreground">{resume.email} • {resume.phone}</p>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <Badge>{resume.status}</Badge>
          <div className="text-sm text-muted-foreground">Uploaded: {resume.uploadedAt}</div>
        </div>
      </div>

      <Card className="mb-4">
        <CardContent>
          <h3 className="font-semibold mb-2">Skills</h3>
          <SkillMatrix skills={resume.skills ?? []} />
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent>
          <h3 className="font-semibold mb-2">Experience</h3>
          {resume.experience?.length ? (
            resume.experience.map((e: any, idx: number) => (
              <div key={idx} className="mb-3">
                <div className="font-medium">{e.role} — {e.company}</div>
                <div className="text-sm text-muted-foreground">{e.duration}</div>
                <p className="text-sm mt-1">{e.summary}</p>
              </div>
            ))
          ) : (
            <div className="text-muted-foreground">No experience parsed.</div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button onClick={() => { /* download JSON */ 
          const blob = new Blob([JSON.stringify(resume, null, 2)], { type: "application/json" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url; a.download = `${resume.name || "resume"}.json`; a.click();
          URL.revokeObjectURL(url);
        }}>Download JSON</Button>

        <Button variant="outline" onClick={() => window.location.reload()}>Re-parse Resume</Button>
        <Button variant="ghost" onClick={() => navigate(-1)}>Back</Button>
      </div>
    </div>
  );
}
