export interface CuentaGeneral {
	key?: string;
    id_cliente: string;
    id_comercio: string;
    nombre: string;
    total_deuda: number;
    fecha_ultimo_pago:string;
    fecha_ultimo_pago_number: number;
    fecha_alta: string;
    fecha_alta_number:number;

}