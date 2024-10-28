export interface Vacuna {
    ID: number;
    Vacuna: string;
    Descripcion: string;
    Laboratorio: string;
    Tipo: string;
    EdadMinima: number;
}

export interface VacunacionRegistro {
    MascotaID: number;
    Nombre: string;
    Raza: string;
    Vacuna: string;
    Fecha_De_Vacunacion: string;
    Proxima_Fecha: string;
}

export interface NuevaVacunacion {
    FechaVacunacion: string;
    ProximaFecha: string;
    VacunaID: number;
    MascotaID: number;
}

export interface VacunacionResponse {
    Respuesta: string;
    RegvacID: number;
    MascotaID: number;
}
