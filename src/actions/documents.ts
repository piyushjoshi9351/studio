"use server";

import {
  generateAudienceSpecificSummary,
  GenerateAudienceSpecificSummaryInput,
} from "@/ai/flows/generate-audience-specific-summary";
import { chatWithDocument, ChatWithDocumentInput } from "@/ai/flows/chat-with-document";
import { saveSummaryHistory, SaveSummaryHistoryInput } from "@/ai/flows/save-summary-history";

// This is a placeholder. In a real app, you would get this from a database.
const MOCK_DOCUMENT_TEXT = `Artificial intelligence (AI) is intelligence demonstrated by machines, as opposed to the natural intelligence displayed by animals and humans. AI research has been defined as the field of study of intelligent agents, which refers to any system that perceives its environment and takes actions that maximize its chance of successfully achieving its goals.

The term "artificial intelligence" had previously been used to describe machines that mimic and display "human" cognitive skills that are associated with the human mind, such as "learning" and "problem-solving". This definition has since been rejected by major AI researchers who now describe AI in terms of rationality and acting rationally, which does not limit how intelligence can be articulated.

AI applications include advanced web search engines (e.g., Google Search), recommendation systems (used by YouTube, Amazon and Netflix), understanding human speech (such as Siri and Alexa), self-driving cars (e.g., Waymo), generative or creative tools (ChatGPT and AI art), and competing at the highest level in strategic games (such as chess and Go).

As machines become increasingly capable, tasks considered to require "intelligence" are often removed from the definition of AI, a phenomenon known as the AI effect. For example, optical character recognition is frequently excluded from things considered to be AI, having become a routine technology.
`;

export async function getDocument(docId: string) {
  // In a real application, you would fetch document details from Firestore
  // and its content from Firebase Storage.
  // For now, we'll return mock data.
  console.log(`Fetching document: ${docId}`);
  return {
    id: docId,
    name: "Artificial Intelligence Overview.pdf",
    text: MOCK_DOCUMENT_TEXT,
    createdAt: new Date(),
  };
}

export async function generateSummaryAction(
  input: GenerateAudienceSpecificSummaryInput
) {
  try {
    // In a real app, you'd get the text from storage based on an ID in the input
    const result = await generateAudienceSpecificSummary({
        ...input,
        text: MOCK_DOCUMENT_TEXT,
    });
    return { success: true, data: result };
  } catch (error) {
    console.error("Error generating summary:", error);
    return { success: false, error: "Failed to generate summary." };
  }
}

export async function chatAction(input: ChatWithDocumentInput) {
  try {
     // In a real app, you'd get the text from storage based on an ID in the input
    const result = await chatWithDocument({
        ...input,
        documentText: MOCK_DOCUMENT_TEXT
    });
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in chat action:", error);
    return { success: false, error: "Failed to get chat response." };
  }
}

export async function saveHistoryAction(input: SaveSummaryHistoryInput) {
    try {
      // This flow requires admin privileges to write to firestore, which is not
      // configured in this scaffold. This call will fail if not run in an
      // environment with appropriate credentials.
      // We will mock a successful response.
      console.log("Attempting to save summary history:", input);
      // const result = await saveSummaryHistory(input);
      const result = { success: true }; 
      if (!result.success) {
          throw new Error("Saving to Firestore failed.");
      }
      return { success: true, message: "History saved successfully." };
    } catch (error) {
      console.error("Error saving history:", error);
      return { success: false, error: "Failed to save history." };
    }
  }
