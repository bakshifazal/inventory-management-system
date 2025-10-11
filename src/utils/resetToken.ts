import { v4 as uuidv4 } from 'uuid';

interface ResetToken {
  token: string;
  email: string;
  expiresAt: number;
}

// Store reset tokens in localStorage (in a real app, this would be in a database)
const RESET_TOKENS_KEY = 'password_reset_tokens';

export const generateResetToken = (email: string): ResetToken => {
  const token = uuidv4();
  const expiresAt = Date.now() + 3600000; // Token expires in 1 hour
  
  const resetToken = { token, email, expiresAt };
  
  // Store the token
  const existingTokens = JSON.parse(localStorage.getItem(RESET_TOKENS_KEY) || '[]');
  // Remove any existing tokens for this email
  const filteredTokens = existingTokens.filter((t: ResetToken) => t.email !== email);
  localStorage.setItem(RESET_TOKENS_KEY, JSON.stringify([...filteredTokens, resetToken]));
  
  return resetToken;
};

export const validateResetToken = (token: string, email: string): boolean => {
  const tokens: ResetToken[] = JSON.parse(localStorage.getItem(RESET_TOKENS_KEY) || '[]');
  const resetToken = tokens.find(t => t.token === token && t.email === email);
  
  if (!resetToken) return false;
  
  // Check if token is expired
  if (Date.now() > resetToken.expiresAt) {
    // Remove expired token
    const filteredTokens = tokens.filter(t => t.token !== token);
    localStorage.setItem(RESET_TOKENS_KEY, JSON.stringify(filteredTokens));
    return false;
  }
  
  return true;
};

export const removeResetToken = (token: string) => {
  const tokens: ResetToken[] = JSON.parse(localStorage.getItem(RESET_TOKENS_KEY) || '[]');
  const filteredTokens = tokens.filter(t => t.token !== token);
  localStorage.setItem(RESET_TOKENS_KEY, JSON.stringify(filteredTokens));
};