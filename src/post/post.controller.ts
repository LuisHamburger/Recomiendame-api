import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from '../auth/auth-strategies/jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { CreatePostDTO } from './dtos/create-post.dto';

@UseGuards(JwtAuthGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(@GetUser('id') userId: string, @Body() post: CreatePostDTO) {
    return await this.postService.createPost(userId, post);
  }

  @Get()
  async GetAllPost(@Query('page') page = 1, @Query('limit') limit = 1) {
    return await this.postService.getAllPost(page, limit);
  }
}
