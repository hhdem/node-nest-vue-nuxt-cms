import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('article-categories')
export class ArticleCategories {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  route: string;

  @Column('mediumtext', { nullable: true })
  description: string;

  @Column()
  status: boolean;

  @Column({
    select: false,
  })
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
