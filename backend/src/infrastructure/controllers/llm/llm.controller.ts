import { GroqLLMProvider } from './../../repositories/groq-llm.provider';
import { Controller, Post, Body, Inject } from '@nestjs/common';
import type { LLMProvider } from '../../../domain/repositories/llm-provider';
import { LLMRequestDTO, LLMResponseDTO } from '../../dto/llm';
import { DI_TOKENS } from '../../tokens/di.tokens';

/**
 * LLM Controller
 * Handles requests related to LLM operations
 * @testing - This controller is for testing purposes
 */
@Controller('llm')
export class LLMController {
  constructor(
    @Inject(DI_TOKENS.LLMProvider )
    private llmProvider: LLMProvider,
  ) {}

  /**
   * POST endpoint to generate LLM response
   * @param request - LLM request with the message to process
   * @returns Promise with the LLM response
   */
  @Post('generate')
  async generate(@Body() request: LLMRequestDTO): Promise<LLMResponseDTO> {

    // TODO: Add use case
    const response = await this.llmProvider.generateResponse(request.message);

    return {
      message: request.message,
      response,
      timestamp: new Date(),
    };
  }

  /**
   * POST endpoint to check LLM provider status
   * @returns Promise with the availability status
   */
  @Post('status')
  async status() {
    const available = await this.llmProvider.isAvailable();
    return {
      available,
      timestamp: new Date(),
    };
  }
}
