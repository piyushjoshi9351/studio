"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { Loader2, File, UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  useUser,
  useFirestore,
  addDocumentNonBlocking,
} from "@/firebase";
import { collection } from "firebase/firestore";
import { extractTextFromFile } from "@/actions/documents";

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
        ".docx",
      ],
    },
    multiple: false,
  });

  const handleUpload = async () => {
    if (!file || !user) {
      toast({
        title: "Error",
        description: "Please select a file and ensure you are logged in.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const fileBuffer = await file.arrayBuffer();

      toast({
        title: "Processing...",
        description: "Extracting text from your document. Please wait.",
      });

      const text = await extractTextFromFile({
        fileBuffer,
        fileType: file.type,
      });

      const docsRef = collection(firestore, "users", user.uid, "documents");
      const docRef = await addDocumentNonBlocking(docsRef, {
        userId: user.uid,
        fileName: file.name,
        uploadDate: new Date().toISOString(),
        fileType: file.type,
        fileSize: file.size,
        text: text,
      });

      toast({
        title: "Upload Successful",
        description: `${file.name} has been processed.`,
      });

      router.push(`/dashboard/document/${docRef.id}`);
    } catch (error: any) {
      console.error("Upload failed:", error);
      toast({
        title: "Upload Failed",
        description:
          error.message || "An unexpected error occurred during upload.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <div className="w-full">
      {!file ? (
        <div
          {...getRootProps()}
          className={`relative flex w-full h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed
          ${
            isDragActive ? "border-primary bg-primary/10" : "border-border"
          }
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
          <p className="text-xs text-muted-foreground">
            {Math.round(file.size / 1024)} KB
          </p>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={removeFile}
          >
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
            Uploading & Processing...
          </>
        ) : (
          "Upload & Analyze"
        )}
      </Button>
    </div>
  );
}
