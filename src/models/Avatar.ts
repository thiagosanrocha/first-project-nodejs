import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("avatars")
class Avatar {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  path: string;

  @Column()
  filename: string;

  @Column("uuid")
  user_id: string;
}

export default Avatar;
