
import { IsOptional } from "class-validator";
import { BuyRecords } from "src/buy-records/entity/buy-records.entity";
import { AfterInsert, BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Goods{
    @PrimaryGeneratedColumn()
    goodsId:number;

    @Column({
        comment:'商品标题'
    })
    goodsTitle:string;

    @Column({
        comment:'商品图片'
    })
    goodsPic:string;

    @Column({
        comment:'商品描述'
    })
    goodsDes:string;

    @Column({
        comment:'商品备注'
    })
    comment:string;

    @Column({
        comment:'加密链接'
    })
    encryptedLink:string;

    @Column({
        comment:'链接跳转码'
    })
    skipLinkSecret:string;

    @Column({
        comment:'商品分类'
    })
    category:string;

    @Column({
        type:'int',
        default:0,
        comment:'仓库数量'
    })
    residue:number;

    @Column({
        type:'float',
        precision:12,
        scale:2,
        default:0.0,
        comment:'原价'
    })
    originalPrice:number;

    @Column({
        type:'float',
        precision:12,
        scale:2,
        default:0,
        comment:'当前价格'
    })
    currentPrice:number;

    @Column({
        type:'int',
        default:0,
        comment:'销售量'
    })
    salesNumber:number;

    @CreateDateColumn({
        type:"datetime",
        nullable:false,
        name:"create_time",
        comment:"创建时间"
    })
    @IsOptional()
    createTime:Date;

    @UpdateDateColumn({
        type:"datetime",
        nullable:false,
        comment:"更新时间"
    })
    @IsOptional()
    modifyDate:Date;

    @Column({default:false}) 
    isDelete:boolean;

    @Column({
        comment:'商家账号',
        nullable:false
    }) 
    userAccount:string;

    @BeforeInsert()
    logbeforeInsert(){
        console.log("数据正在插入");
    }

    @AfterInsert()
    logInsert(){
        console.log("数据已经插入成功");
    }
    
}