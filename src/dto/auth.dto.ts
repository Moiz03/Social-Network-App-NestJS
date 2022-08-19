import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

// auth DTO

export class loginProfile {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  public password: string;
}

export class registerUser {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  public firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  public lastName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  public userName: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  public password: string;
}

export class registerModerator {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  public firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  public lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  public password: string;
}
