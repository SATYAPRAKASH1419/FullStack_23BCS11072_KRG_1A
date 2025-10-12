import { create } from "zustand";
import * as mock from "../api/mock";
import type { Job, Resume } from "@/types";

type State = {
  resumes: Resume[];
  jobs: Job[];
  loading: boolean;
  fetchResumes: () => Promise<void>;
  fetchJobs: () => Promise<void>;
};

export const useStore = create<State>((set) => ({
  resumes: [],
  jobs: [],
  loading: false,
  fetchResumes: async () => {
    set({ loading: true });
    const r = await mock.fetchResumes();
    set({ resumes: r, loading: false });
  },
  fetchJobs: async () => {
    set({ loading: true });
    const j = await mock.fetchJobs();
    set({ jobs: j, loading: false });
  },
}));
