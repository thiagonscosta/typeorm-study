import { 
    Entity, 
    Column,
    CreateDateColumn, 
    UpdateDateColumn, 
    PrimaryColumn 
} from 'typeorm'

import { v4 as uuid } from 'uuid'

@Entity('settings')
export class Setting {

    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }
    
    @PrimaryColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    chat: boolean;

    @UpdateDateColumn()
    updated_at: Date;

    @CreateDateColumn()
    created_at: Date;
}
