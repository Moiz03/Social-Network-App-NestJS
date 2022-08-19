import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

// feed DTO
export class feedQuery {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  sort: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  page: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  limit: string;
}
