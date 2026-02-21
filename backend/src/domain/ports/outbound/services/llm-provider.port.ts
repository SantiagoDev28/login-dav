/**
 * Interface for LLM Provider
 * Defines the contract for interacting with Large Language Models
 */
export interface LLMProvider {
  /**
   * Generate a response from the LLM based on the provided prompt
   * @param prompt - The input prompt for the LLM
   * @returns A promise that resolves to the LLM response
   */
  generateResponse(prompt: string): Promise<string>;

  /**
   * Check if the LLM provider is available and configured
   * @returns A promise that resolves to a boolean indicating availability
   */
  isAvailable(): Promise<boolean>;
}
