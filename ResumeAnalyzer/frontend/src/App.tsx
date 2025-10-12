import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";
import ResumeDetails from "./pages/ResumeDetails";
import JobUpload from "./pages/JobUpload";
import JobRepository from "./pages/JobRepository";
import MatchesView from "./pages/MatchesView";



export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="uploadresume" element={<UploadResume />} />
        <Route path="/resume/:id" element={<ResumeDetails />} />
        <Route path="/job-upload" element={<JobUpload />} />
        <Route path="/jobs" element={<JobRepository />} />
        <Route path="/job/:id/matches" element={<MatchesView />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
