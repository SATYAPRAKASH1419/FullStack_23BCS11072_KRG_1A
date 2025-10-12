import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Resume {
  id: number;
  name: string;
  email: string;
  position: string;
  status: "Analyzed" | "Pending";
  uploadedAt: string;
}

const resumes: Resume[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    position: "Frontend Developer",
    status: "Analyzed",
    uploadedAt: "2025-10-11",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    position: "Backend Engineer",
    status: "Pending",
    uploadedAt: "2025-10-12",
  },
  {
    id: 3,
    name: "Amit Kumar",
    email: "amitkumar@gmail.com",
    position: "Data Scientist",
    status: "Analyzed",
    uploadedAt: "2025-10-10",
  },
  {
    id: 4,
    name: "Priya Sharma",
    email: "priya.sharma@yahoo.com",
    position: "Full Stack Developer",
    status: "Analyzed",
    uploadedAt: "2025-10-09",
  },
  {
    id: 5,
    name: "Rahul Verma",
    email: "rahulv23@gmail.com",
    position: "Machine Learning Engineer",
    status: "Pending",
    uploadedAt: "2025-10-12",
  },
  {
    id: 6,
    name: "Ananya Das",
    email: "ananya.das@gmail.com",
    position: "UI/UX Designer",
    status: "Analyzed",
    uploadedAt: "2025-10-08",
  },
  {
    id: 7,
    name: "Sourav Patnaik",
    email: "souravp@gmail.com",
    position: "DevOps Engineer",
    status: "Pending",
    uploadedAt: "2025-10-12",
  },
  {
    id: 8,
    name: "Neha Gupta",
    email: "neha.gupta@gmail.com",
    position: "Data Analyst",
    status: "Analyzed",
    uploadedAt: "2025-10-07",
  },
  {
    id: 9,
    name: "Arjun Reddy",
    email: "arjunreddy@hotmail.com",
    position: "Software Engineer",
    status: "Analyzed",
    uploadedAt: "2025-10-06",
  },
  {
    id: 10,
    name: "Simran Kaur",
    email: "simrankaur@gmail.com",
    position: "Product Manager",
    status: "Pending",
    uploadedAt: "2025-10-12",
  },
  {
    id: 11,
    name: "Karan Mehta",
    email: "karan.mehta@gmail.com",
    position: "AI Engineer",
    status: "Analyzed",
    uploadedAt: "2025-10-05",
  },
  {
    id: 12,
    name: "Meera Nair",
    email: "meera.nair@gmail.com",
    position: "QA Tester",
    status: "Pending",
    uploadedAt: "2025-10-11",
  },
];


const ResumeList: React.FC = () => {
  return (
    <Card className="mt-6">
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-3 text-center">Resume List</h2>
        <ScrollArea className="h-[300px]">
          <div className="space-y-3">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="flex items-center justify-between p-3 border rounded-xl hover:bg-muted/30 transition-all"
              >
                <div>
                  <h3 className="font-medium">{resume.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {resume.email} • {resume.position}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Uploaded: {resume.uploadedAt}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Badge
                    variant={
                      resume.status === "Analyzed" ? "default" : "secondary"
                    }
                  >
                    {resume.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ResumeList;
