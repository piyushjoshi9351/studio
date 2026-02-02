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
import { cn } from "@/lib/utils";

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
        title: "Processing Document...",
        description: "Extracting text can take a moment, especially for large files. Please wait.",
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
          "The server took too long to respond. This can happen with large files. Please try again with a smaller document.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <div className="w-full space-y-6">
      <div
        {...getRootProps()}
        className={cn(
          "relative flex w-full h-64 flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all duration-300 ease-in-out cursor-pointer group",
          isDragActive
            ? "border-primary bg-primary/10"
            : "border-border hover:border-primary/50 hover:bg-muted/50"
        )}
      >
        <input {...getInputProps()} />
        
        <div className={cn(
          "flex flex-col items-center justify-center text-center transition-opacity duration-300",
          file ? "opacity-0" : "opacity-100"
        )}>
          <UploadCloud className={cn(
            "h-16 w-16 text-muted-foreground transition-transform duration-300",
            isDragActive && "scale-110 -translate-y-2 text-primary"
          )} />
          <p className="mt-4 text-lg font-medium text-foreground">
            {isDragActive
              ? "Drop it like it's hot!"
              : "Drag & drop a file here"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
             or click to select a file (PDF or DOCX)
          </p>
        </div>

        {file && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
             <div className="relative w-full max-w-sm rounded-lg border bg-background p-4 shadow-sm">
                <div className="flex items-start gap-4">
                    <File className="h-10 w-10 text-primary flex-shrink-0" />
                    <div className="flex-grow overflow-hidden">
                        <p className="font-semibold text-foreground truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                            {Math.round(file.size / 1024)} KB &bull; {file.type}
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 flex-shrink-0 -mt-1 -mr-1"
                        onClick={(e) => {
                            e.stopPropagation();
                            removeFile();
                        }}
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>
            </div>
          </div>
        )}
      </div>

      <Button
        onClick={handleUpload}
        disabled={!file || loading}
        className="w-full"
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
