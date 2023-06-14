import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async createPost(userId: string, post: Partial<Post>) {
    post.createdAt = new Date();
    post.postedById = userId;

    return await this.postRepository.save(post);
  }

  async getAllPost(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return await this.postRepository.find({
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });
  }
}
