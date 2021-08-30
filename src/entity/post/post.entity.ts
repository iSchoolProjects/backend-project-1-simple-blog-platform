import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { User } from '../user/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class BlogPost {
  constructor(partial: Partial<BlogPost>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn({ name: 'post_id', type: 'int', unsigned: true })
  postId: number;

  @Column({ type: 'varchar', length: '100' })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: '255' })
  slug: string;

  @Column({ name: 'is_deleted', type: 'tinyint', default: '0' })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Category)
  category: Category;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
