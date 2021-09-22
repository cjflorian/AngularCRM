export class TipoClientes{
  tipo_cliente_id: number;
  nombre: string;
  descripcion: string;
  createAt: Date;

  constructor(pId:number, pNombre: string, pDescripcion:string, pCreateAt:Date, )
  {
      this.tipo_cliente_id = pId;
      this.nombre =pNombre;
      this.descripcion = pDescripcion;
      this.createAt = pCreateAt;
  }
}