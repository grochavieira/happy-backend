import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Orphanage from "./Orphanage";

@Entity("images")
export default class Image {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  public_id: string;

  @Column()
  url: string;

  @ManyToOne((type) => Orphanage, (orphanage) => orphanage.images, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "orphanage_id" })
  orphanage: Orphanage;
}
