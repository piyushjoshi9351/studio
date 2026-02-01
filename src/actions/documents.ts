"use server";

import {
  generateAudienceSpecificSummary,
  GenerateAudienceSpecificSummaryInput,
} from "@/ai/flows/generate-audience-specific-summary";
import {
  chatWithDocument,
  ChatWithDocumentInput,
} from "@/ai/flows/chat-with-document";
import mammoth from "mammoth";
import pdf from "pdf-parse";

export async function extractTextFromFile({
  fileBuffer,
  fileType,
}: {
  fileBuffer: ArrayBuffer;
  fileType: string;
}): Promise<string> {
  const buffer = Buffer.from(fileBuffer);

  try {
    if (fileType === "application/pdf") {
      const data = await pdf(buffer);
      return data.text;
    } else if (
      fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const { value } = await mammoth.extractRawText({ buffer });
      return value;
    } else {
      throw new Error("Unsupported file type");
    }
  } catch (error) {
    console.error("Error extracting text:", error);
    throw new Error("Failed to extract text from file.");
  }
}

export async function generateSummaryAction(
  input: GenerateAudienceSpecificSummaryInput
) {
  try {
    const result = await generateAudienceSpecificSummary(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error generating summary:", error);
    return { success: false, error: "Failed to generate summary." };
  }
}

export async function chatAction(input: ChatWithDocumentInput) {
  try {
    const result = await chatWithDocument(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in chat action:", error);
    return { success: false, error: "Failed to get chat response." };
  }
}
