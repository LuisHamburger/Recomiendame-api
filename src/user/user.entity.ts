import { Post } from '../post/post.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Recipe } from '../recipe/recipe.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'level', enum: ['beginner', 'intermediate', 'expert'] })
  level: 'beginner' | 'intermediate' | 'expert';

  @OneToMany(() => Post, (post) => post.postedBy)
  posts: Post[];

  @ManyToMany(() => Recipe)
  @JoinTable()
  favoriteRecipes: Recipe[];
}
