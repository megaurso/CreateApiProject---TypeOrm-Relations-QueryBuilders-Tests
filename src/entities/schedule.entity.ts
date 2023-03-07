import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { RealEstate } from "./realEstate.entity";
import { User } from "./user.entity";

@Entity("schedules")
class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "time" })
  hour: Date;

  @ManyToOne(() => RealEstate, (realEstate) => realEstate.schedule)
  realEstate: RealEstate;

  @ManyToOne(() => User)
  user: User;
}

export { Schedule };
