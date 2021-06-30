import { PrimaryColumn, Column, CreateDateColumn, Entity, ManyToOne, JoinColumn } from "typeorm";
import { User } from './User';
import { v4 as uuid } from 'uuid'

@Entity('messages')
export class Message {

    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }

    @PrimaryColumn()
    id: string;

    @Column()
    admin_id: string;

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => User)
    user: User;

    @Column()
    user_id: string;

    @Column()
    text: string;

    @CreateDateColumn()
    created_at: Date;

}