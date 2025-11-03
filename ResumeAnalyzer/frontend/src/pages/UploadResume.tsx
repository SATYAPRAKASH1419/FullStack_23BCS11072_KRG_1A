import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import client from "../api/client";

export default function UploadResume() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [responseText, setResponseText] = useState("");

  // 🧠 Handle file selection
  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      e.target.value = ""; // reset invalid selection
      return;
    }

    setFile(selectedFile);
  }

  // 📤 Upload file to backend (as FormData)
  async function handleUpload() {
    if (!file) {
      alert("Please select a PDF first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("hrUserId", "2"); // Example

    setUploading(true);
    setProgress(0);
    setResponseText("");

    // 🔁 Simulated slow progress (takes ~20s to reach 90%)
    const totalDuration = 20000; // 20 seconds
    const stepTime = 200; // every 0.2s
    const steps = totalDuration / stepTime;
    const increment = 90 / steps;

    const fakeProgress = setInterval(() => {
      setProgress((prev) => {
        if (prev < 90) return Math.min(prev + increment, 90);
        return prev;
      });
    }, stepTime);

    try {
      const response = await client.post(
        "http://localhost:8080/api/upload/resume",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // ✅ Stop fake progress and complete bar smoothly
      clearInterval(fakeProgress);
      setProgress(100);

      console.log("✅ Backend response:", response.data);
      setResponseText(JSON.stringify(response.data, null, 2));

      // 🧹 Reset input and progress after success
      setTimeout(() => {
        setFile(null);
        const input = document.querySelector<HTMLInputElement>(
          'input[type="file"]'
        );
        if (input) input.value = ""; // remove file name from input
        setProgress(0);
        setResponseText("");
      }, 2500);
    } catch (error) {
      clearInterval(fakeProgress);
      console.error("❌ Upload failed:", error);
      alert("Failed to upload file.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="space-y-5 bg-white p-6 rounded-2xl shadow-md relative overflow-hidden">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">
          Upload Resume PDF
        </h2>

        {/* File Input */}
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          disabled={uploading}
          className="w-full p-3 border border-indigo-300 rounded cursor-pointer hover:border-indigo-500"
        />

        {/* Progress Bar */}
        {uploading && (
          <div className="mt-4">
            <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-400 to-indigo-600 transition-all duration-300 ease-linear"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Uploading... {Math.round(progress)}%
            </p>
          </div>
        )}

        {/* Upload Button */}
        <Button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="w-full bg-indigo-600 hover:bg-indigo-700"
        >
          {uploading ? "Uploading..." : "Upload & Parse"}
        </Button>
      </div>
    </div>
  );
}
