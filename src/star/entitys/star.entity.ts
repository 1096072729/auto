

import { User } from "src/users/entity/user.entity";
import { AfterInsert, BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Star{
    @PrimaryGeneratedColumn('uuid')
    starId:string;

    @Column({
        comment:'用户Id'
    })
    userId:number;

    @Column({
        comment:'商品Id'
    })
    goodsId:number;

    @Column({
        type:'datetime',
        nullable:false,
        comment:'购买时间',
        name:'buyDate'
    })
    starDate:Date;

    @Column({
        type:'float',
        comment:'购买价格'
    })
    starPrice:number;

    @BeforeInsert()
    logBeforeInsert(){
        console.log("数据准备插入");
    }

    @AfterInsert()
    logInsert(){
        console.log("数据已经插入成功");
    }
}