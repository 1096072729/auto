import { AfterInsert, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Capital{
    @PrimaryGeneratedColumn('uuid')
    cid:string;

    @Column({
        comment:'账号'
    })
    account:string;

    @Column({
        type:'float',
        precision:12,
        scale:2,
        comment:'余额'
    })
    balance:number;

    @Column({
        comment:'支付宝账号'
    })
    alipay:string;

    @Column({
        type:'float',
        precision:12,
        scale:2,
        comment:'充值'
    })
    recharge:number;

    @Column({
        type:'float',
        precision:12,
        scale:2,
        comment:'收入'
    })
    income:number;

    @Column({
        type:'float',
        precision:12,
        scale:2,
        comment:'缴费'
    })
    pay:number;

    @Column({
        type:'float',
        precision:12,
        scale:2,
        comment:'已提现'
    })
    withdrawal:number;

    @Column({
        type:'float',
        precision:12,
        scale:2,
        comment:'消费金额'
    })
    consumptionAmount:number;

    @Column({
        type:'float',
        precision:12,
        scale:2,
        comment:'冻结资金'
    })
    freezingOfFunds:number;

    @Column({
        type:'int',
        comment:'安全等级',
        default:100
    })
    funSecurityLevel:number;

    @BeforeInsert()
    logbeforeInsert(){
        console.log("数据正在插入");
    }

    @AfterInsert()
    logInsert(){
        console.log("数据已经插入成功");
    }
    
}