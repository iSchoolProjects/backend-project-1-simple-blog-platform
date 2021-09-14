import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserRoleEnum } from '../../enum/user-role.enum';
import { BlogPost } from '../post/post.entity';
import { UserPhoto } from '../user-photo/user-photo.entity';

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

  @Column({ default: null })
  @Exclude()
  passwordLastChangeAt: Date;

  @Column({ default: 0 })
  @Exclude()
  passwordChangeCounter: number;

  @Column()
  @Exclude()
  salt: string;

  @Column({ default: `${UserRoleEnum.USER}` })
  role: UserRoleEnum;

  @Column({ name: 'email', type: 'varchar', length: '50', unique: true })
  email: string;

  @OneToMany(() => BlogPost, (blogPost) => blogPost.user)
  posts: BlogPost;

  @OneToOne(() => UserPhoto)
  @JoinColumn()
  profilePhoto: UserPhoto;
}
