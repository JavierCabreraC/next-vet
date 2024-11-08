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

export interface VacunacionFormProps {
    onSuccess: () => void;
}

export interface ReservacionV {
    ReservacionID: number;
    Estado: string;
    Hora: string;
    Cliente: string;
    ClienteID: number;
}

export interface MascotaV {
    MascotaID: number;
    Nombre: string;
}

export interface NuevaPeluqueria {
    TipoCorte: string;
    Lavado: boolean;
    ReservacionID: number;
    MascotaID: number;
}

export interface ReservacionesPendientesProps {
    onReservacionSelect: (reservacion: ReservacionV) => void;
}

export interface PeluqueriaFormProps {
    reservacion: ReservacionV;
    onSuccess: () => void;
    onCancel: () => void;
}

export interface ServicioActivo {
    ServicioID: number;
    Estado: string;
    Servicio: string;
    "Hora de inicio": string;
    "Nombre de Mascota": string;
}

export interface ServicioResponse {
    Respuesta: string;
    ServicioID: number;
}

export interface ServicioCompletado {
    ServicioID: number;
    Servicio: string;
    Estado: string;
    "Hora de finalización": string;
    "Nombre de Mascota": string;
}
