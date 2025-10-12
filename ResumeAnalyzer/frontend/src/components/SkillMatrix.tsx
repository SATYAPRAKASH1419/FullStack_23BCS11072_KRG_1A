export default function SkillMatrix({ skills }: { skills: {name:string;category?:string;level?:string}[] }) {
  if (!skills || skills.length === 0) return <div className="text-muted-foreground">No skills parsed.</div>;

  // group by category
  const grouped = skills.reduce<Record<string, typeof skills>>((acc, s) => {
    const key = s.category || "General";
    (acc[key] ||= []).push(s);
    return acc;
  }, {});

  return (
    <div className="grid gap-4">
      {Object.entries(grouped).map(([cat, list]) => (
        <div key={cat}>
          <div className="font-medium mb-2">{cat}</div>
          <div className="flex flex-wrap gap-2">
            {list.map((sk, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm">
                {sk.name}{sk.level ? ` • ${sk.level}` : ""}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
