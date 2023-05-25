import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { ManyToOne } from "typeorm";

@Entity("contacts")
export class Contact {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 45 })
  name: string;

  @Column({ length: 45 })
  email: string;

  @Column({ length: 13 })
  phone: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  user: User;

  @CreateDateColumn({ type: "date" })
  createdAt: string;
}
