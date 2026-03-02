/**
 * Shared constants, types, and helpers used by multiple intelligence RPCs.
 */

declare const process: { env: Record<string, string | undefined> };

// ========================================================================
// Constants
// ========================================================================

export const UPSTREAM_TIMEOUT_MS = 30_000;

// MiniMax as primary (for coding plan)
export const PRIMARY_API_URL = 'https://api.minimax.io/v1';
export const PRIMARY_MODEL = 'MiniMax-M2.5';

// Groq as fallback
export const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
export const GROQ_MODEL = 'llama-3.1-8b-instant';

// ========================================================================
// LLM Config Helper
// ========================================================================

export interface LlmConfig {
    apiUrl: string;
    model: string;
    apiKey: string;
    provider: string;
}

export function getLlmConfig(): LlmConfig | null {
    // Try MiniMax first
    const minimaxKey = process.env.MINIMAX_API_KEY;
    if (minimaxKey) {
        const baseUrl = process.env.LLM_API_URL || PRIMARY_API_URL;
        return {
            apiUrl: new URL('/v1/chat/completions', baseUrl).toString(),
            model: process.env.LLM_MODEL || PRIMARY_MODEL,
            apiKey: minimaxKey,
            provider: 'minimax',
        };
    }

    // Fallback to Groq
    const groqKey = process.env.LLM_API_KEY || process.env.GROQ_API_KEY;
    if (groqKey) {
        const baseUrl = process.env.LLM_API_URL || GROQ_API_URL;
        return {
            apiUrl: new URL('/v1/chat/completions', baseUrl).toString(),
            model: process.env.LLM_MODEL || GROQ_MODEL,
            apiKey: groqKey,
            provider: 'groq',
        };
    }

    return null;
}

// ========================================================================
// Tier-1 country definitions (used by risk-scores + country-intel-brief)
// ========================================================================

export const TIER1_COUNTRIES: Record<string, string> = {
  US: 'United States', RU: 'Russia', CN: 'China', UA: 'Ukraine', IR: 'Iran',
  IL: 'Israel', TW: 'Taiwan', KP: 'North Korea', SA: 'Saudi Arabia', TR: 'Turkey',
  PL: 'Poland', DE: 'Germany', FR: 'France', GB: 'United Kingdom', IN: 'India',
  PK: 'Pakistan', SY: 'Syria', YE: 'Yemen', MM: 'Myanmar', VE: 'Venezuela',
};

// ========================================================================
// Helpers
// ========================================================================

export { hashString } from '../../../_shared/hash';
