import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RealEstate } from "./realEstate.entity";

@Entity("categorys")
class Category{
    @PrimaryGeneratedColumn()
    id:number

    @Column({length:45, unique:true})
    name: string

    @OneToMany(()=> RealEstate,(estate)=> estate.category)
    realEstate: Array<RealEstate>
}

export {
    Category
}