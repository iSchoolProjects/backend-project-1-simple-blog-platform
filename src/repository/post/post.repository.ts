import { EntityRepository, Repository } from 'typeorm';
import { BlogPost } from '../../entity/post/post.entity';

@EntityRepository(BlogPost)
export class PostRepository extends Repository<BlogPost> {}
