import { User } from '../user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'start' })
  start: number;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @Column({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @Column({ name: 'posted_by_id' })
  postedById: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'posted_by_id', referencedColumnName: 'id' })
  postedBy: User;
}
