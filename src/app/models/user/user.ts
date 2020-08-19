import { Role } from '../role/role';

export class User {
    /**
     *
     */
    constructor(public id: number,
        public name: string,
        public username: string,
        public password: string,
        public authorities: Array<Role>,) {}
}
