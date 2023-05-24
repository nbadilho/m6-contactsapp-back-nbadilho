import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn
  } from "typeorm";
import { User } from "./user.entity";
import { ManyToOne } from "typeorm";
 

  @Entity("contacts")
  export class Contact {
    @PrimaryGeneratedColumn("increment")
    id: number;
  
    @Column({ length: 45 })
    name: string;
  
    @Column({ length: 45, unique: true })
    email: string;
  
    @Column({ length: 13,unique:true})
    phone: string;
  
    @ManyToOne(() => User)
    user: User
  
    @CreateDateColumn({ type: "date" })
    createdAt: string;

   
  }
  