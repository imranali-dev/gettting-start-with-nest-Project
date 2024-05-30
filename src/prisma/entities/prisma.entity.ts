import { Exclude } from 'class-transformer';
import { IsOptional } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('convertitintoprisma')
export class Prisma {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: String, unique: true, nullable: true })
  email: string | null;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  hash: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: String, nullable: true })
  @Index()
  @Exclude({ toPlainOnly: true })
  pasword: string | null;

  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ type: String, nullable: true })
  @IsOptional()
  hashedRT: string | null;
}
