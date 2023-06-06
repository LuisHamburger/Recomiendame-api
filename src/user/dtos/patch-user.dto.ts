import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class PatchUserDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsIn(['beginner', 'intermediate', 'expert'])
  @IsNotEmpty()
  level: 'beginner' | 'intermediate' | 'expert';
}
