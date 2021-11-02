export class Users{
    id: number;
    username: string;
    password: string;
    token: string;

    constructor(pId:number, pUsername: string, pPassword:string, pToken:string)
    {
        this.id = pId;
        this.username = pUsername;
        this.password =pPassword;
        this.token = pToken;
    }
}