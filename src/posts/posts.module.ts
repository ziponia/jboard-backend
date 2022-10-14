import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { loadEntity } from '../entities/loadEntity';
import { PostEntity } from '../entities/post.entity';

@Module({
  imports: [loadEntity([PostEntity])],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}