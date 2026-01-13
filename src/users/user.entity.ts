import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({
  type: 'enum',
  enum: ['ADMIN', 'USER'],
  default: 'USER',
})
role: string;

  @CreateDateColumn()
  createdAt: Date;
}
