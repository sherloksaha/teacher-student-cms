import { Controller, Get, Post, Query } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('posts')
  findAll(@Query('search') search?: string) {
    const data = this.postsService.findAll();
    if (search) {
      return data.filter((post) => post.title.includes(search));
    }
    return data;
  }

  //   @Post('posts')
  //   @HttpCode
  //   create() {
  //     // Implementation for creating a new post
  //   }
}
