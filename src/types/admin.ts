export interface Personal extends Record<string, unknown> {
    PersonalID: number;
    NombreCompleto: string;
    Telefono: string;
    Direccion: string;
    FechaContratacion: string;
    Email: string;
    CargoID: number;
    ProfesionID: number;
}

export interface Cliente extends Record<string, unknown> {
    ClienteID: number;
    NombreCompleto: string;
    Telefono: string;
    Direccion: string;
    Email: string;
}

export interface Mascota extends Record<string, unknown> {
    MascotaID: number;
    Nombre: string;
    Sexo: string;
    FechaNacimiento: string;
    Observaciones: string;
    ClienteID: number;
    RazaID?: number;
}

export interface Bitacora extends Record<string, unknown> {
    BitacoraID: number;
    UsuarioID: number;
    TipoAccionBitacoraID: number;
    FechaHora: string;
    IPDir: string;
}

export interface AdminCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
}

export type PersonalForm = {
    NombreCompleto: string;
    Telefono: string;
    Direccion: string;
    Email: string;
    FechaContratacion: string;
    CargoID: number;
    ProfesionID: number;
};

export type ClienteForm = {
    NombreCompleto: string;
    Telefono: string;
    Direccion: string;
    Email: string;
};

export type MascotaForm = {
    Nombre: string;
    Sexo: string;
    FechaDeNacimiento: string;
    Observaciones: string;
    ClienteID: number;
    RazaID: number;
};

export type FormTypes = PersonalForm | ClienteForm | MascotaForm;
