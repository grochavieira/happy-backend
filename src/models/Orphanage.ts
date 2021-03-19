import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import Image from "./Image";

@Entity("orphanages")
export default class Orphanage {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: string;

  @Column()
  instructions: string;

  @Column()
  opening_hours: string;

  @Column()
  open_on_weekends: boolean;

  @Column()
  is_accepted: boolean;

  @Column()
  whatsapp: string;

  @OneToMany(() => Image, (image) => image.orphanage, { cascade: true }) // tipo de retorno, qual o campo do objeto que retorna o relacionamento inverso, e o cadastro automático das images
  @JoinColumn({ name: "orphanage_id" }) // nome da coluna que armazena o relacionamento
  images: Image[];
}
