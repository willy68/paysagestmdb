import {Role} from './role.enum';

export interface User {
    id?: number;
    entreprise_id?: number;
    email?: string;
    username?: string;
    password?: string;
    role?: Role;
    created_at?: string;
    updated_at?: string;
    token?: string;
}
