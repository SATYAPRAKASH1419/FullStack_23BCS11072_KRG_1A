import { Outlet, NavLink } from "react-router-dom";
import { Briefcase, Upload, LayoutDashboard, FileText } from "lucide-react";

export const Layout = () => {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "flex items-center gap-2 text-indigo-600 font-medium bg-indigo-50 border-l-4 border-indigo-600 px-3 py-2 rounded"
      : "flex items-center gap-2 text-gray-700 hover:text-indigo-600 px-3 py-2 rounded transition-colors";

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5 flex flex-col">
        <h2 className="text-2xl font-bold text-indigo-600 mb-8 text-center">
          CV Analyzer
        </h2>

        <nav className="flex flex-col gap-3">
          <NavLink to="/" className={linkClasses}>
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </NavLink>

          <NavLink to="/uploadresume" className={linkClasses}>
            <Upload className="w-5 h-5" />
            Upload Resume
          </NavLink>

          <NavLink to="/jobs" className={linkClasses}>
            <Briefcase className="w-5 h-5" />
            Job Repository
          </NavLink>

          <NavLink to="/job-upload" className={linkClasses}>
            <FileText className="w-5 h-5" />
            Upload Job
          </NavLink>
        </nav>

        <div className="mt-auto text-sm text-gray-400 text-center">
          © 2025 Satya CV Analyzer
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-zinc-100 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};
