import { IsNotEmpty, IsString, Min } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  @Min(3, { message: 'Title must be at least 3 characters long' })
  title: string;

  @IsNotEmpty({ message: 'Content is required' })
  @IsString({ message: 'Content must be a string' })
  @Min(5, { message: 'Content must be at least 5 characters long' })
  content: string;

  @IsNotEmpty({ message: 'Author is required' })
  @IsString({ message: 'Author must be a string' })
  @Min(2, { message: 'Author must be at least 2 characters long' })
  authorName: string;
}
