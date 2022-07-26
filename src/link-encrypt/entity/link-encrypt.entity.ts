
import { AfterInsert, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class LinkEncrypt{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    account:string;

    @Column()
    secretKey:string;

    @BeforeInsert()
    logBeforeInsert(){
        console.log("数据准备插入");
    }

    @AfterInsert()
    logInsert(){
        console.log("数据已经插入成功");
    }
}