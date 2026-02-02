"use server";

import {
  generateAudienceSpecificSummary,
  GenerateAudienceSpecificSummaryInput,
} from "@/ai/flows/generate-audience-specific-summary";
import {
  chatWithDocument,
  ChatWithDocumentInput,
} from "@/ai/flows/chat-with-document";
import {
  generateMindMap,
  GenerateMindMapInput,
} from "@/ai/flows/generate-mind-map";
import {
  analyzeDocumentTone,
  AnalyzeDocumentToneInput,
} from "@/ai/flows/analyze-document-tone";
import {
  generateAudioSummary,
  GenerateAudioSummaryInput,
} from "@/ai/flows/generate-audio-summary";
import {
  generateSuggestedQuestions,
  GenerateSuggestedQuestionsInput,
} from "@/ai/flows/generate-suggested-questions";
import {
  compareDocuments,
  CompareDocumentsInput,
} from "@/ai/flows/compare-documents";
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

export async function generateMindMapAction(input: GenerateMindMapInput) {
  try {
    const result = await generateMindMap(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error generating mind map:", error);
    return { success: false, error: "Failed to generate mind map." };
  }
}

export async function analyzeDocumentToneAction(
  input: AnalyzeDocumentToneInput
) {
  try {
    const result = await analyzeDocumentTone(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error analyzing document tone:", error);
    return { success: false, error: "Failed to analyze document." };
  }
}

export async function generateAudioSummaryAction(
  input: GenerateAudioSummaryInput
) {
  try {
    const result = await generateAudioSummary(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error generating audio summary:", error);
    return { success: false, error: "Failed to generate audio summary." };
  }
}

export async function generateSuggestedQuestionsAction(
  input: GenerateSuggestedQuestionsInput
) {
  try {
    const result = await generateSuggestedQuestions(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error generating suggested questions:", error);
    return {
      success: false,
      error: "Failed to generate suggested questions.",
    };
  }
}

export async function compareDocumentsAction(input: CompareDocumentsInput) {
  try {
    const result = await compareDocuments(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error comparing documents:", error);
    return { success: false, error: "Failed to compare documents." };
  }
}
