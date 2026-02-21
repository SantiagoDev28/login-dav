import { Module } from '@nestjs/common';
import { LLMController } from '../driving/http/controllers/llm';
import { GroqLLMProvider } from '../driven/external-services/groq';
import { DI_TOKENS } from '../config/di.tokens';

/**
 * LLM Module
 * @testing - This module is for testing purposes
 */
@Module({
  controllers: [LLMController],
  providers: [
    {
      provide: DI_TOKENS.LLMProvider,
      useClass: GroqLLMProvider,
    },
  ],
  exports: [DI_TOKENS.LLMProvider],
})
export class LLMModule {}
