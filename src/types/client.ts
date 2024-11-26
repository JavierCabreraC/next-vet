export type ViewStateCliente = 
    // Mascotas
    | 'list-mascotas'
    // Reservaciones
    | 'create-reservacion'
    | 'list-reservaciones'
    // Servicios
    | 'history-reservaciones'
    | 'history-servicios';

export interface MascotaCli {
    ID: number;
    Nombre: string;
    Sexo: string;
    Fecha_De_Nacimiento: string;
    Años: string;
    Meses: string;
    Especie: string;
    Raza: string;
}

export interface Reservation {
    ReservacionID: number;
    Motivo: string;
    FechaHoraReservada: string;
    Estado: 'Pendiente' | 'Cancelada' | 'Realizada';
    UsuarioID: number;
}

export interface ReservationRequest {
    Motivo: string;
    FechaHoraReservada: string;
}

export interface TimeSlot {
    id: number;
    start: string;
    end: string;
    periodo: 'AM' | 'PM';
}

export interface ReservedTimeSlot {
    Fecha_Hora: string;
    Estado: 'Pendiente' | 'Cancelada' | 'Realizada';
}

export interface User {
    UsuarioID: number;
    Rol: 'Administrador' | 'Veterinario' | 'Cliente';
    Estado: 'Activo' | 'Inactivo';
}

export interface PendingReservation {
    ReservacionID: number;
    Motivo: string;
    Fecha_Hora: string;
    Estado: 'Pendiente';
}

export interface CancelReservationRequest {
    ReservacionID: number;
}

export interface HistorialReceta {
    "Mascota": string;
    "Tipo Servicio": string;
    "Tipo Registro": "Receta" | "Análisis";
    "Medicamento": string;
    "Dosis": string;
    "Indicaciones": string | null;
    "Fecha Emisión": string;
}
