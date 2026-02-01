import { config } from 'dotenv';
config();

import '@/ai/flows/chat-with-document.ts';
import '@/ai/flows/generate-audience-specific-summary.ts';
import '@/ai/flows/save-summary-history.ts';