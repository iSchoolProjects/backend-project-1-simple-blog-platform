import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Category {
  constructor(partial: Partial<Category>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn({ name: 'category_id', type: 'int', unsigned: true })
  id: number;

  @Column({ name: 'title', type: 'varchar', unique: true })
  title: string;

  @ManyToOne(() => Category)
  parentId: Category;

  @ManyToOne(() => User)
  userId: User;
}
