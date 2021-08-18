import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export default class User {
  @PrimaryColumn({ name: "id", nullable: false })
  id: string;

  @Column({ nullable: true })
  user_name: string;
}
