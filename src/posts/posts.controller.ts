import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PostEntity } from '../entities/post.entity';
import { ManagePostDto } from './dto/manage-post.dto';
import { PostsService } from './posts.service';

@ApiTags('글')
@Controller('posts')
export class PostsController {
  constructor(private service: PostsService) {}

  @ApiOperation({
    summary: '글 목록',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: '페이지 번호 default 1',
    example: '1',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: '페이지 글 갯수 default 10',
    example: '10',
  })
  @Get()
  async list(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    const { items, ...other } = await this.service.findAll({
      page,
      limit,
    });
    return {
      items,
      ...other,
    };
  }

  @ApiOperation({ summary: '글 상세정보' })
  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @ApiOperation({ summary: '글 생성/수정' })
  @Post('')
  async save(@Body() post: ManagePostDto) {
    const entity = PostEntity.create({ ...post });
    const { id } = await this.service.manage(entity);

    return {
      id,
    };
  }

  @ApiOperation({ summary: '글 삭제' })
  @Delete()
  async delete(@Query('id', ParseIntPipe) id: number) {
    await this.service.delete(id);

    return {
      id,
    };
  }
}
