import { ChatGroq } from '@langchain/groq';
import { LLMProvider } from '../../../../domain/ports/outbound/services/llm-provider.port';

/**
 * Groq LLM Provider Implementation
 * Uses Groq API through LangChain to provide LLM capabilities
 */
export class GroqLLMProvider implements LLMProvider {
  private client: ChatGroq;

  /**
   * Initialize the Groq LLM Provider
   * @param apiKey - Groq API key (defaults to GROQ_API_KEY environment variable)
   * @param model - Model name (defaults to 'mixtral-8x7b-32768')
   */
  constructor(apiKey?: string, model: string = 'groq/compound') {
    const key = apiKey || process.env.GROQ_API_KEY;

    if (!key) {
      throw new Error('Groq API key is required. Provide it as a parameter or set GROQ_API_KEY environment variable.');
    }

    this.client = new ChatGroq({
      apiKey: key,
      model: model,
      temperature: 0.7,
      maxTokens: 500,
    });
  }

  /**
   * Generate a response from the Groq LLM based on the provided prompt
   * @param prompt - The input prompt for the LLM
   * @returns A promise that resolves to the LLM response
   */
  async generateResponse(prompt: string): Promise<string> {
    try {
      const message = await this.client.invoke([
        {
            role: 'system',
            content: "Eres David, un asistente del banco davivienda, responde informacion a cerca de esta. Se lo mas breve posible."
        },
        {
          role: 'user',
          content: prompt,
        },
      ]);

      return message.content.toString();
    } catch (error) {
      throw new Error(`Failed to generate response from Groq: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Check if the Groq LLM provider is available
   * @returns A promise that resolves to true if the provider is available
   */
  async isAvailable(): Promise<boolean> {
    try {
      // Test with a simple prompt
      await this.client.invoke([
        {
          role: 'user',
          content: 'ping',
        },
      ]);
      return true;
    } catch {
      return false;
    }
  }
}
