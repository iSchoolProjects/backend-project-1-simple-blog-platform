import { Brackets, EntityRepository, Repository } from 'typeorm';
import { BlogPost } from '../../entity/post/post.entity';
import { CreatePaginationDto } from '../../common/dto/create-pagination.dto';
import { User } from '../../entity/user/user.entity';
import { CreateFilterDto } from '../../common/dto/create-filter.dto';

@EntityRepository(BlogPost)
export class PostRepository extends Repository<BlogPost> {
  async getSomePosts(
    pagination: CreatePaginationDto,
    filter: CreateFilterDto,
    user: User,
  ): Promise<BlogPost[]> {
    let post = this.createQueryBuilder('blog_post')
      .leftJoinAndSelect('blog_post.user', 'user')
      // .where('blog_post.user = :id', { id: user.id })
      // .orWhere('blog_post.user IS NULL')
      .where('blog_post.isDeleted = :isDeleted', {
        isDeleted: filter.isDeleted,
      });
    if (filter.title) {
      post = post.andWhere('blog_post.title= :title', { title: filter.title });
    }

    post = post.andWhere(
      new Brackets((post) => {
        post
          .where('blog_post.user = :id', { id: user.id })
          .orWhere('blog_post.user IS NULL');
      }),
    );
    console.log(filter.title);

    const posts = post.take(pagination.limit).skip(pagination.skip).getMany();

    return posts;
  }
}
