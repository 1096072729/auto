
import { BuyRecords } from "src/buy-records/entity/buy-records.entity";
import { AfterInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export type GradeOption = "普通会员" | "青铜会员" | "白银会员" | "黄金会员" | "钻石会员";
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    userId:number;

    @Column({
        comment:'头像',
        nullable:true
    })
    avatarUrl:string;

    @Column({
        comment:'姓名',
        nullable:true
    })
    name:string;

    @Column({
        comment:'性别',
        nullable:true
    })
    sex:string;

    @Column({
        comment:'账号',
        nullable:false
    })
    account:string;

    @Column({
        comment:'密码',
        nullable:false
    })
    password:string;

    @Column({
        comment:'角色',
        length:10,
        nullable:false
    })
    roles:string;

    @Column({
        type:'boolean',
        default:false,
        comment:'是否禁用'
    })
    forbidden:boolean;

    @Column({
        comment:'电话号码',
        length:11,
        nullable:true
    })
    telephone:string;

    @Column({
        type:'enum',
        enum:['普通会员','青铜会员','白银会员','黄金会员','钻石会员'],
        default:'普通会员',
        comment:'等级',
        nullable:false,
    })
    grade:GradeOption;

    @Column({
        type:'int',
        default:100,
        comment:'信用分'
        
    })
    creditScore:number;

    @CreateDateColumn({
        type:'datetime',
        comment:'注册时间'
    })
    registerDate:Date;

    @UpdateDateColumn({
        type:'datetime',
        comment:'登录时间'
    })
    loginDate:Date;

    @Column({
        comment:'备注',
        nullable:true
    })
    comment:string;


    @AfterInsert()
    logInsert(){
        console.log("数据已经插入成功");
    }
}