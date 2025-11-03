import { useEffect } from "react";
import { useStore } from "@/store/useStore";

export const Hero = () => {
  const { totalResumes, analyzedResumes, pendingResumes, fetchResumes, loading } = useStore();

  useEffect(() => {
    fetchResumes();
  }, []);

  const cards = [
    { title: "Total Resumes", value: String(totalResumes ?? 0), icon: "📄" },
    { title: "Analyzed Resumes", value: String(analyzedResumes ?? 0), icon: "✅" },
    { title: "Pending Resumes", value: String(pendingResumes ?? 0), icon: "⏳" },
  ];

  return (
    <div className="w-full">
      <div>
        <h2 className="text-4xl font-bold text-indigo-500">CV Analyzer Dashboard</h2>
        <p className="text-slate-700 mt-3">
          Manage and analyze candidate resumes with <span className="text-indigo-500 font-semibold">AI-powered</span> extraction
        </p>
      </div>

      <div className="flex gap-4 mt-12 w-full items-center">
        {loading ? (
          <div className="text-sm text-muted-foreground">Loading counts...</div>
        ) : (
          cards.map((card, idx) => (
            <div
              key={idx}
              className="flex bg-white h-28 w-76 rounded-lg p-4  justify-between items-center border-l-6 border-indigo-400 shadow-md"
            >
              <div className="flex flex-col items-start gap-3 text-slate-950 ">
                <div className="font-bold text-xl">{card.title}</div>
                <div className="text-xl ">{card.value}</div>
              </div>
              <div className="text-3xl text-shadow-md">{card.icon}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
