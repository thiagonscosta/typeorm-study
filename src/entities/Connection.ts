import { PrimaryColumn, Column, CreateDateColumn, Entity, ManyToOne, JoinColumn } from "typeorm";
import { User } from './User';
import { v4 as uuid } from 'uuid'

@Entity('connection')
export class Connection {

    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }

    @PrimaryColumn()
    id: string;

    @Column()
    admin_id: string;

    @Column()
    socket_id: string;

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => User)
    user: User;

    @Column()
    user_id: string;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

}