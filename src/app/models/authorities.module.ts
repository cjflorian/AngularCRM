export class Authorities{
    username: string;
    authority: string;

    constructor(pId:number, pUsername: string, pAuthority:string)
    {
        this.username = pUsername;
        this.authority =pAuthority;
    }
}