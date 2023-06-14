import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostDTO {
  @IsNumber()
  @IsNotEmpty()
  start: number;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;
}
