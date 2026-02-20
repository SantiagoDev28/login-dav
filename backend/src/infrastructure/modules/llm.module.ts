import { Module } from '@nestjs/common';
import { LLMController } from '../controllers/llm';
import { GroqLLMProvider } from '../repositories/groq-llm.provider';
import { DI_TOKENS } from '../tokens/di.tokens';

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
