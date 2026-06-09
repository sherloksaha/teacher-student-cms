import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post-dto';
import { UpdatePostDto } from './dto/update-post-dto';
import { PostExistPipe } from './pipes/post-exist-pipe';
import type { PostInterface } from './interfaces/post.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}



  @Get('')
  findAll(@Query('search') search?: string) {
    const data = this.postsService.findAll();
    if (search) {
      return data.filter((post) => post.title.includes(search));
    }
    return data;
  }



    @Post('')
    @HttpCode(200)
    @UsePipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      // transform: true,
    }))
    create(
      @Body() createPostData: CreatePostDto
    ) {
       return "Created"
      // Implementation for creating a new post
    }



    @Put(':id')
    update(@Param('id') id: string, @Body() updatePostData: UpdatePostDto) {
      // return this.postsService.update(id, updatePostData);
    }


    @Get(':id')
    findOne(@Param('id', ParseIntPipe, PostExistPipe) id: number): PostInterface {
      return {
        id: id,
        title: "Title",
        content: "Content",
        authorName: "Author Name",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }

}
