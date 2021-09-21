export class Clientes{
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    createAt: Date;
    tipo_cliente_id: number;
    nombreCliente: string;

    constructor(pId:number, pNombre: string, pApellido:string, pCreateAt:Date, pEmail:string, pTipoClienteId:number, pNombreCliente:string,)
    {
        this.id = pId;
        this.email = pEmail;
        this.nombre =pNombre;
        this.apellido = pApellido;
        this.createAt = pCreateAt;
        this.tipo_cliente_id = pTipoClienteId;
        this.nombreCliente = pNombreCliente;
    }
}