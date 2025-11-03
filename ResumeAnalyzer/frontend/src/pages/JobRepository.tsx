import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";

export default function JobRepository() {
  const { jobs, fetchJobs } = useStore();
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const filtered = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(q.toLowerCase()) ||
      j.skills.join(" ").toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-3xl font-bold text-indigo-500">Job Repository</h2>
        <input
          placeholder="Search title or skills"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="border p-2 rounded border-indigo-300 w-2xl"
        />
      </div>

      <div className="grid gap-4">
        {filtered.map((job) => (
          <div
            key={job.id}
            className="p-4 border rounded-2xl flex justify-between items-center bg-white"
          >
            <div>
              <div className="font-medium">{job.title}</div>
              <div className="text-sm text-muted-foreground">
                {job.skills.join(", ")}
              </div>
              <div className="text-xs text-muted-foreground">
                Posted on: {job.postedOn}
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="btn"
                onClick={() => navigate(`/job/${job.id}/matches`)}
              >
                View Matches
              </button>
              <button className="btn bg-pink-300 text-black font-bold p-2 rounded-xl">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
