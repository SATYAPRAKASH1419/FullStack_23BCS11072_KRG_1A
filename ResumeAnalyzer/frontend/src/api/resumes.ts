import client from "./client";
import type { Resume } from "@/types";

async function mapRemote(raw: any): Promise<Resume> {
  return {
    id: Number(raw.id ?? raw._id ?? raw.resumeId ?? 0),
    name: raw.name ?? raw.fileName ?? raw.filename ?? "",
    email: raw.email ?? "",
    phone: raw.phone ?? undefined,
    location: raw.location ?? undefined,
    position: raw.position ?? undefined,
    status: (raw.status as any) ?? "Pending",
    uploadedAt: raw.uploadedAt ?? raw.uploaded_at ?? raw.createdAt ?? new Date().toISOString(),
    skills: raw.skills ?? undefined,
    education: raw.education ?? undefined,
    experience: raw.experience ?? undefined,
    projects: raw.projects ?? undefined,
  } as Resume;
}

export async function fetchResumes(): Promise<Resume[]> {
  try {
    const resp = await client.get("/upload/hr/2");
    const data = resp.data;
    let arr: any[] = [];
    if (Array.isArray(data)) arr = data;
    else if (Array.isArray(data.data)) arr = data.data;
    else if (Array.isArray(data.resumes)) arr = data.resumes;
    else if (Array.isArray(data.files)) arr = data.files;

    return Promise.all(arr.map(mapRemote));
  } catch (err) {
    console.error("fetchResumes error:", err);
    return [];
  }
}

export default { fetchResumes };
