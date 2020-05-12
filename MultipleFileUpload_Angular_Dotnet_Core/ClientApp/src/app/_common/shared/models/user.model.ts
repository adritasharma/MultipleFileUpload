export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    password: string;
    confirmPassword:string;
    userFunctionalProfile?:any[]
}

export class User implements IUser {
    constructor(
        public id: string = '',
        public password: string = '',
        public firstName: string = '',
        public fullName: string = '',
        public lastName: string = '',
        public confirmPassword: string = '',
        public userFunctionalProfile: any[] = []
    ) { }
}