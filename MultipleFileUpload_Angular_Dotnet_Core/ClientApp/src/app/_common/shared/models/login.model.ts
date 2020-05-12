import { UserType } from '../enums/enum';

export interface ILoginRequest {
    email: string;
    password: string;
}


export interface ILoginResponse {
    empid: string;
    email: string;
    fullname: string;
    mobileno: string;
    branchname: string;
    teamname: string;
    regionname: string;
    zone: string;
    territory: string;
    token: string;
    roleName:string;
    isactive:string;
    id:number;
}

