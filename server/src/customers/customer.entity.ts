import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  showname: string;

  @Column({ nullable: true })
  mobile: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  wx: string;

  @Column({ nullable: true })
  qq: string;

  @Column('mediumtext', { nullable: true })
  note: string;

  @Column('mediumtext', { nullable: true })
  content: string;

  @Column()
  status: boolean;

  @Column({
    select: false,
  })
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
