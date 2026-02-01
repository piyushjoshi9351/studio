"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { Loader2, File, UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    multiple: false,
  });

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);

    // In a real application, this is where you would use a server action
    // to upload the file to Firebase Storage and create a Firestore document.
    // For this example, we will simulate the process.
    
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay

    // Mock response
    const mockDocId = "mock-doc-" + Date.now();
    console.log(`Simulating upload for file: ${file.name}, mock ID: ${mockDocId}`);

    toast({
      title: "Upload Successful",
      description: `${file.name} has been uploaded.`,
    });

    router.push(`/dashboard/document/${mockDocId}`);
  };

  const removeFile = () => {
    setFile(null);
  }

  return (
    <div className="w-full">
      {!file ? (
        <div
          {...getRootProps()}
          className={`relative flex w-full h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed
          ${isDragActive ? "border-primary bg-primary/10" : "border-border"}
          transition-colors cursor-pointer`}
        >
          <input {...getInputProps()} />
          <UploadCloud className="h-16 w-16 text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">
            {isDragActive
              ? "Drop the file here..."
              : "Drag & drop a file here, or click to select"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">PDF or DOCX</p>
        </div>
      ) : (
        <div className="relative flex w-full h-64 flex-col items-center justify-center rounded-lg border-2 border-primary bg-primary/5">
            <File className="h-16 w-16 text-primary" />
            <p className="mt-4 font-medium text-foreground">{file.name}</p>
            <p className="text-xs text-muted-foreground">{Math.round(file.size / 1024)} KB</p>
            <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={removeFile}>
                <X className="h-5 w-5" />
            </Button>
        </div>
      )}

      <Button
        onClick={handleUpload}
        disabled={!file || loading}
        className="w-full mt-6"
        size="lg"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          "Upload & Analyze"
        )}
      </Button>
    </div>
  );
}
