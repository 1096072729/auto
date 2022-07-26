
import { IsOptional } from "class-validator";
import { AfterInsert, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class SeniorManagement {
    @PrimaryGeneratedColumn()
    adminId:number;

    @Column({
        comment:'账号'
    })
    account:string;

    @Column({
        comment:'密码'
    })
    password:string;

    @Column({
        comment:'权限',
        default:'admin'
    })
    roles:string;

    @Column({
        comment:'禁用',
        default:false
    })
    forbidden:boolean;

    @CreateDateColumn({
        type:'datetime',
        comment:'注册时间',
    })
    registerDate:Date;

    @UpdateDateColumn({
        type:'datetime',
        comment:'登录时间'
    })
    loginDate:Date;

    @BeforeInsert()
    logbeforeInsert(){
        console.log("数据正在插入");
    }

    @AfterInsert()
    logInsert(){
        console.log("数据已经插入成功");
    }
    
}