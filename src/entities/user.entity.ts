import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn
  } from "typeorm";
import { Contact } from "./contact.entity";
 import { OneToMany } from "typeorm";



  @Entity("users")
  export class User {
    @PrimaryGeneratedColumn("increment")
    id: number;
  
    @Column({ length: 45 })
    name: string;
  
    @Column({ length: 45, unique: true })
    email: string;
  
    @Column({ length: 13})
    phone: string;
  
    @Column({ length: 120 })
    password: string;

    @OneToMany(() => Contact, contact=> contact.user)
    contacts: Contact[]
  
    @CreateDateColumn({ type: "date" })
    createdAt: string;

   
  }
  