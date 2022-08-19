import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

// update profile DTO
export class updateProfile {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  firstName: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  lastName: string;

  @IsEmail()
  @IsOptional()
  @MaxLength(50)
  email: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  password: string;
}
