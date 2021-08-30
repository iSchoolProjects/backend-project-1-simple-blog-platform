import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserRoleEnum } from '../../enum/user-role.enum';
import { BlogPost } from '../post/post.entity';

@Entity()
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn({ name: 'user_id', type: 'int', unsigned: true })
  id: number;

  @Column({ name: 'first_name', type: 'varchar', length: '50' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: '50' })
  lastName: string;

  @Column({ name: 'user_name', type: 'varchar', length: '50', unique: true })
  username: string;

  @Column({ name: 'password_hash', type: 'varchar', length: '128' })
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  salt: string;

  @Column({ default: `${UserRoleEnum.USER}` })
  role: UserRoleEnum;

  @Column({ name: 'email', type: 'varchar', length: '50', unique: true })
  email: string;

  @OneToMany(() => BlogPost, (blogPost) => blogPost.user)
  posts: BlogPost;

  // toJSON() {
  //   delete this.password;
  //   delete this.salt;
  //   return this;
  // }
}
