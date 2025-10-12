import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function UploadResume() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log("Uploaded file:", acceptedFiles[0])
    // TODO: send file to backend for parsing
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"]
    },
    maxSize: 5 * 1024 * 1024, // 5MB
  })

  return (
    <div className="flex flex-col items-center justify-center h-full ">
      <div className="max-w-2xl w-full bg-gray-50 p-4 shadow-sm rounded-2xl border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-2">Upload Resume</h1>
        <p className="text-gray-600 text-center ">
          Upload a candidate's resume to extract and analyze their information
        </p>
        <p className="text-center mb-6 text-gray-500">(Upload a PDF or DOCX file (max 5MB))</p>

        <Card className="border-dashed border-2 border-gray-300 bg-gray-50 hover:bg-gray-100 transition">
          <CardContent
            {...getRootProps()}
            className="flex flex-col items-center justify-center py-16 cursor-pointer"
          >
            <input {...getInputProps()} />
            <Upload className="w-10 h-10 text-gray-400 mb-3" />
            {isDragActive ? (
              <p className="text-gray-600 font-medium">Drop the resume here...</p>
            ) : (
              <>
                <p className="text-gray-700 font-medium">Drop your resume here</p>
                <p className="text-gray-400 text-sm mt-1">or click to browse</p>
              </>
            )}
          </CardContent>
        </Card>

        <Button
          variant="default"
          className="w-full mt-6 bg-indigo-400 hover:bg-indigo-500 text-white text-md font-semibold py-6"
        >
          <Upload className="mr-2 h-5 w-5" /> Parse Resume
        </Button>
      </div>
    </div>
  )
}
