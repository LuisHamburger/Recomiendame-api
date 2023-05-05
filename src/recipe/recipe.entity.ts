import { Post } from '../post/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'instructions', type: 'text', array: true })
  instructions: string[];

  @OneToMany(() => Post, (post) => post.recipe)
  posts: Post[];
}
