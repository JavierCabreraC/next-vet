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
    Servicio: string;
    ServicioEspecificoID: number;  // Agregamos este campo
    Estado: string;
    HoraInicio: string;            // Actualizado para coincidir con la respuesta
    Mascota: string;               // Actualizado para coincidir con la respuesta
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

export interface NuevaConsulta {
    Peso: number;
    Temperatura: number;
    Diagnostico: string;
    Tratamiento?: string;
    ReservacionID: number;
    MascotaID: number;
}

export interface ConsultaFormProps {
    reservacion: ReservacionV;
    onSuccess: () => void;
    onCancel: () => void;
}

export type AnalisisResultado = 'Normal' | 'Bajo' | 'Elevado' | 'Bueno' | 'Estable' | 'Critico';

export interface NuevaReceta {
    Medicamento: string;
    Dosis: string;
    Indicaciones: string;
    ConsultaID: number | null;
    InternacionID: number | null;
}

export interface NuevoAnalisis {
    TipoAnalisis: string;
    FechaAnalisis: string;
    Resultado: AnalisisResultado;
    ConsultaID: number | null;
    InternacionID: number | null;
}

export interface CompletarServicioModalProps {
    servicioId: number;
    servicioEspecificoId: number;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export interface Receta {
    ID: number;
    Medicamento: string;
    Dosis: string;
    Indicaciones: string;
    TipoServicio: string;
    ServicioID: number;
    Fecha: string;
    Mascota: string;
    Raza: string;
}

export interface Analisis {
    ID: number;
    TipoAnalisis: string;
    Fecha: string;
    Resultado: AnalisisResultado;
    Servicio: string;
    ServicioID: number;
    Mascota: string;
    Raza: string;
}

export type MainView = 'nuevo' | 'activos' | 'historial' | 'completados' | 'recetas' | 'analisis';

export type ServiceType = 'consulta' | 'peluqueria' | 'internacion' | 'analisis' | 'cirugia';

export interface ConsultaCompletada {
    ServicioID: number;
    "Hora terminada": string;
    MascotaID: number;
    Mascota: string;
    Peso: string;
    Temperatura: string;
}

export interface NuevaInternacion {
    PesoEntrada: number;
    TemperaturaEntrada: number;
    Notas: string;
    MascotaID: number;
    CirugiaID: number | null;
}

export interface InternacionResponse {
    Message: string;
    ServicioID: number;
    InternacionID: number;
}
