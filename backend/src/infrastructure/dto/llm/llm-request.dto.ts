import { IsString, IsNotEmpty } from 'class-validator';

/**
 * DTO for LLM generation request
 */
export class LLMRequestDTO {
  @IsString()
  @IsNotEmpty()
  message: string;
}
