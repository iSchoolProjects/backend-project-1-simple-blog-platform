import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

export class UserPhoto {
  constructor(partial: Partial<UserPhoto>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column()
  image: string;

  @ManyToOne(() => User)
  user: User;
}
