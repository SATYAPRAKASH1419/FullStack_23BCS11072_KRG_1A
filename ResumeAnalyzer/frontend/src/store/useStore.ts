import { create } from "zustand";
import * as mock from "../api/mock";
import * as jobsApi from "../api/jobs";
import * as resumesApi from "../api/resumes";
import type { Job, Resume } from "@/types";

type State = {
  resumes: Resume[];
  jobs: Job[];
  loading: boolean;
  totalResumes: number;
  analyzedResumes: number;
  pendingResumes: number;
  fetchResumes: () => Promise<void>;
  fetchJobs: () => Promise<void>;
};

export const useStore = create<State>((set) => ({
  resumes: [],
  jobs: [],
  loading: false,
  totalResumes: 0,
  analyzedResumes: 0,
  pendingResumes: 0,
  fetchResumes: async () => {
    set({ loading: true });
    // prefer backend resumes; fallback to mock
    let r = await resumesApi.fetchResumes();
    if (!r || r.length === 0) {
      r = await mock.fetchResumes();
    }
  const analyzed = r.filter(x => (x.status ?? "").toLowerCase() === "analyzed").length;
  const pending = r.filter(x => (x.status ?? "").toLowerCase() === "pending").length;
  // total should count only resumes that are either analyzed or pending
  const total = analyzed + pending;
  set({ resumes: r, totalResumes: total, analyzedResumes: analyzed, pendingResumes: pending, loading: false });
  },
  fetchJobs: async () => {
    set({ loading: true });
    let j = await jobsApi.fetchJobs();
    if (!j || j.length === 0) {
      j = await mock.fetchJobs();
    }
    set({ jobs: j, loading: false });
  },
}));
