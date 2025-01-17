import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User{
    @PrimaryGeneratedColumn({ name:'id', type:'integer' })
    public id: number;

    @Column()
    public firstName: string;

    @Column()
    public lastName: string;

    @Column()
    public age: number;

    @Column()
    public password: string;

}