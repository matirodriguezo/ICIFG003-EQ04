export interface Incidente {
    id: number;
    alumnoId: number;
    protocoloId: number;
    fecha: string;
    descripcionEvento: string;
    responsable: string;
    estado?: string;             // Nuevo
    motivoModificacion?: string; // Nuevo
}