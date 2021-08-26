import { Injectable } from '@nestjs/common';
import { User } from '../../entity/user/user.entity';
import * as bcrypt from 'bcrypt';
import { BlogPost } from '../../entity/post/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from '../../repository/post/post.repository';

@Injectable()
export class CommonService {
  constructor(
    @InjectRepository(BlogPost)
    private postRepository: PostRepository,
  ) {}
  async hashUserPassword(user: User) {
    const salt = await bcrypt.genSalt();
    user.salt = salt;
    user.password = await bcrypt.hash(user.password, salt);
    return user;
  }

  async slugGenerator(post: BlogPost) {
    post.slug = post.title.trim().toLowerCase().replace(/ /g, '-');

    // const titleWords = post.title.split(' ');
    // const lastWord = parseInt(titleWords[titleWords.length - 1]);

    const posts = await this.postRepository.find({
      title: post.title,
    });
    if (posts.length) {
      const lastRecord = posts[posts.length - 1];
      let counter = parseInt(lastRecord.slug.replace(/(([a-z1-9])*\-)*/g, ''));
      if (!counter) {
        counter = 1;
        // } else if (lastWord) {
        //   counter = 1;
      } else {
        counter++;
      }
      post.slug = post.slug + '-' + counter;
    }

    return post;
  }
}
