import client from "./client";
import type { Job } from "@/types";

async function mapRemoteToJob(raw: any): Promise<Job> {
  return {
    id: String(raw.id ?? raw._id ?? raw.jobId ?? raw.job_id ?? ""),
    title: raw.jobTitle ?? raw.title ?? raw.name ?? "",
    description: raw.jobDescription ?? raw.description ?? "",
    skills: typeof raw.skills === "string"
      ? raw.skills.split(",").map((s: string) => s.trim()).filter(Boolean)
      : Array.isArray(raw.skills)
        ? raw.skills
        : [],
    postedOn: raw.postedOn ?? raw.createdAt ?? raw.posted_on ?? new Date().toISOString().slice(0,10),
  };
}

export async function fetchJobs(): Promise<Job[]> {
  try {
    // call the HR jobs endpoint for hrUserId = 2
    const resp = await client.get("/jobs/hr/2");
    const data = resp.data;
    if (!data) return [];
    if (Array.isArray(data)) {
      return Promise.all(data.map(mapRemoteToJob));
    }
    const arr = data.jobs ?? data.data ?? [];
    if (Array.isArray(arr)) return Promise.all(arr.map(mapRemoteToJob));
    return [];
  } catch (err) {
    console.error("fetchJobs error:", err);
    return [];
  }
}

export async function saveJob(payload: any) {
  try {
    const resp = await client.post("/jobs/create", payload);
    return resp.data;
  } catch (err) {
    console.error("saveJob error:", err);
    throw err;
  }
}

export default { fetchJobs, saveJob };
